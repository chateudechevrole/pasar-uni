'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createBrowserClient } from '@supabase/ssr'
import { Settings, Share2, Package, Star, Bookmark, Loader2, Save, LogOut, Camera, User, School, CreditCard } from 'lucide-react'

// 定义数据类型
type Profile = {
  id: string // 加上 ID
  username: string
  university: string
  bio: string
  avatar_url: string | null
  is_verified_student: boolean
  bank_account: string | null
}

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  
  // 统计数据
  const [stats, setStats] = useState({ items: 0, followers: 0, following: 0 })
  
  // 商品数据
  const [myItems, setMyItems] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'stalls' | 'saved'>('stalls')

  // 编辑模式状态
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ bio: '', username: '', bank_account: '' })
  
  // 头像上传状态
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchProfileData()
  }, [])

  async function fetchProfileData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // 1. 获取个人资料
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
        setEditForm({ 
          bio: profileData.bio || '', 
          username: profileData.username || '',
          bank_account: profileData.bank_account || ''
        })
      }

      // 2. 获取我发布的商品 (STALLS)
      const { data: myItemsData, count } = await supabase
        .from('items')
        .select('*', { count: 'exact' })
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })

      setMyItems(myItemsData || [])
      
      setStats({
        items: count || 0,
        followers: 0, 
        following: 0  
      })

    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  // 保存文字资料 (Bio/Username/Bank Account)
  async function handleSaveProfile() {
    if (!profile) return
    
    const { error } = await supabase
      .from('profiles')
      .update({ 
        bio: editForm.bio, 
        username: editForm.username,
        bank_account: editForm.bank_account 
      })
      .eq('id', profile.id)

    if (!error) {
      setProfile({ 
        ...profile, 
        bio: editForm.bio, 
        username: editForm.username,
        bank_account: editForm.bank_account
      })
      setIsEditing(false)
      alert('Profile updated successfully! ✅')
    } else {
      alert('Failed to update profile')
    }
  }

  // 登出功能
  async function handleLogout() {
    await supabase.auth.signOut()
    router.refresh() // 刷新当前路由
    router.push('/login') // 跳转回登录页
  }

  // 上传头像功能
  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0 || !profile) return

    const file = e.target.files[0]
    setIsUploadingAvatar(true)

    try {
      // 1. 上传图片到 'item-images' 桶 (为了方便，直接用现有的公开桶)
      // 文件名: avatar-USERID-TIMESTAMP
      const fileExt = file.name.split('.').pop()
      const fileName = `avatar-${profile.id}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('item-images') 
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      // 2. 获取公开链接
      const { data: { publicUrl } } = supabase.storage
        .from('item-images')
        .getPublicUrl(fileName)

      // 3. 更新 Profile 表
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id)

      if (updateError) throw updateError

      // 4. 更新本地状态
      setProfile({ ...profile, avatar_url: publicUrl })
      alert('Profile picture updated! 😎')

    } catch (error: any) {
      console.error('Error uploading avatar:', error)
      alert('Failed to upload avatar')
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-pasar-primary w-10 h-10" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. PROFILE HEADER */}
      <div className="bg-white pb-6 rounded-b-[2rem] shadow-sm mb-6">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            
            {/* 头像区域 (支持上传) */}
            <div className="relative group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-pasar-primary p-1 relative">
                <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden relative flex items-center justify-center border border-slate-100">
                   {/* 显示加载圈 或 头像 */}
                   {isUploadingAvatar ? (
                     <Loader2 className="animate-spin text-pasar-dark" />
                   ) : profile?.avatar_url ? (
                     <Image src={profile.avatar_url} alt="Profile" fill className="object-cover" />
                   ) : (
                     <User size={40} className="text-slate-300" />
                   )}
                </div>

                {/* 编辑模式下的相机遮罩 */}
                {isEditing && (
                  <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer transition-opacity hover:bg-black/50 z-10">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleAvatarUpload}
                      disabled={isUploadingAvatar}
                    />
                    <Camera className="text-white w-8 h-8" />
                  </label>
                )}
              </div>

              {/* 认证徽章 */}
              {profile?.is_verified_student && (
                <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white z-20">
                  <Star size={12} fill="currentColor" />
                </div>
              )}
            </div>

            {/* 信息区域 */}
            <div className="flex-1 text-center md:text-left w-full">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                
                {/* 用户名 */}
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editForm.username}
                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                    className="text-2xl font-black text-pasar-dark border-b-2 border-pasar-primary focus:outline-none bg-transparent text-center md:text-left w-full md:w-auto"
                  />
                ) : (
                  <h1 className="text-2xl font-black text-pasar-dark">
                    {profile?.username || 'Student'}
                  </h1>
                )}

                {/* 按钮组 (Save/Edit/Share/Logout) */}
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <button 
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pasar-dark text-white font-bold text-xs hover:bg-black transition-all"
                    >
                      <Save size={14} /> Save
                    </button>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-1.5 rounded-full bg-slate-100 font-bold text-xs border border-slate-200 hover:border-pasar-dark transition-all"
                    >
                      Edit Profile
                    </button>
                  )}
                  
                  {/* Share Button */}
                  <button className="p-2 rounded-full bg-slate-100 border border-slate-200 hover:border-pasar-dark transition-colors text-slate-600">
                    <Share2 size={16} />
                  </button>

                  {/* 🆕 Logout Button (红色) */}
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-full bg-red-50 border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>

              {/* 统计 */}
              <div className="flex justify-center md:justify-start gap-8 mb-4">
                <div className="text-center md:text-left">
                  <span className="font-black text-base block">{stats.items}</span>
                  <span className="text-xs text-slate-500">Items</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="font-black text-base block">{stats.followers}</span>
                  <span className="text-xs text-slate-500">Followers</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="font-black text-base block">{stats.following}</span>
                  <span className="text-xs text-slate-500">Following</span>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2 text-sm text-left max-w-md mx-auto md:mx-0">
                <p className="font-bold text-pasar-dark text-xs bg-pasar-secondary inline-flex items-center gap-1 px-2 py-1 rounded-md">
                  <School size={12} /> {profile?.university}
                </p>
                {isEditing ? (
                  <textarea 
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:border-pasar-primary focus:outline-none bg-slate-50"
                    rows={3}
                    placeholder="Write something about yourself..."
                  />
                ) : (
                  <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                    {profile?.bio || "No bio yet."}
                  </p>
                )}

                {/* Bank Account Field */}
                <div className="pt-2">
                  <label className="font-bold text-pasar-dark text-xs uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <CreditCard size={14} /> Bank Account (for receiving payments)
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.bank_account}
                      onChange={(e) => setEditForm({...editForm, bank_account: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:border-pasar-primary focus:outline-none bg-slate-50"
                      placeholder="e.g., Maybank 1234567890 (John Doe)"
                    />
                  ) : (
                    <p className="text-slate-600 text-sm bg-slate-50 rounded-lg p-2 border border-slate-100">
                      {profile?.bank_account || "⚠️ Not set - You need this to sell items!"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TABS & GRID */}
      <div className="max-w-4xl mx-auto px-2 md:px-4">
        {/* Tabs */}
        <div className="flex justify-center gap-12 mb-6">
          <button 
            onClick={() => setActiveTab('stalls')}
            className={`flex items-center gap-2 pb-2 border-b-2 text-sm font-bold transition-all ${
              activeTab === 'stalls' ? 'border-pasar-dark text-pasar-dark' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Package size={16} />
            My Stalls
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 pb-2 border-b-2 text-sm font-bold transition-all ${
              activeTab === 'saved' ? 'border-pasar-dark text-pasar-dark' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Bookmark size={16} />
            Saved
          </button>
        </div>

        {/* Grid Content */}
        <div className="min-h-[200px]">
          {activeTab === 'stalls' ? (
            myItems.length > 0 ? (
              <div className="columns-2 md:columns-3 gap-4 space-y-4">
                {myItems.map((item) => (
                  <div key={item.id} className="break-inside-avoid group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    
                    {/* Image */}
                    <div className="relative aspect-[4/5] bg-gray-100">
                      <Image 
                        src={item.images[0]} 
                        alt={item.title} 
                        fill 
                        className="object-cover"
                      />
                      {item.status === 'SOLD' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold border-2 border-white px-3 py-1 rounded-full -rotate-12">SOLD OUT</span>
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="p-3">
                      <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-pasar-dark">RM {item.price}</span>
                        <Bookmark size={16} className="text-gray-400 group-hover:text-pasar-dark" />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              // Empty State Stalls
              <div className="text-center py-12 bg-white rounded-2xl border-dashed border-2 border-gray-200">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-gray-300" size={32} />
                </div>
                <h3 className="font-bold text-gray-900">No items yet</h3>
                <p className="text-sm text-slate-500 mb-4">You haven't listed anything.</p>
                <button onClick={() => router.push('/sell')} className="text-xs font-bold bg-pasar-dark text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-black transition-all">
                  + Sell Item
                </button>
              </div>
            )
          ) : (
            // Empty State Saved
            <div className="text-center py-12 bg-white rounded-2xl border-dashed border-2 border-gray-200">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="text-gray-300" size={32} />
              </div>
              <h3 className="font-bold text-gray-900">No saved items</h3>
              <p className="text-sm text-slate-500">Items you bookmark will appear here.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}