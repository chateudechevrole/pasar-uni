'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, Sparkles, X, AlertCircle, ChevronDown, Camera, Plus, Loader2, DollarSign } from 'lucide-react'
import { MALAYSIAN_UNIVERSITIES } from '@/lib/universities'
import { createBrowserClient } from '@supabase/ssr' // 引入 Supabase 客户端

// 简单的分类
const CATEGORIES = ['Textbooks', 'Gadgets', 'Fashion', 'Dorm', 'Transport', 'Food', 'Others']
const CONDITIONS = ['New', '9/10', '8/10', '7/10', '6/10', '5/10 or Below']

export default function SellPage() {
  const router = useRouter()
  
  // User profile state
  const [userProfile, setUserProfile] = useState<any>(null)
  const [userHasQRCode, setUserHasQRCode] = useState(false) 
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    university: '',
  })
  
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 初始化 Supabase 客户端
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Check if user has bank account on mount
  useEffect(() => {
    async function checkUserBankAccount() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('bank_account')
        .eq('id', user.id)
        .single()

      if (profile) {
        setUserProfile(profile)
        setUserHasQRCode(!!profile.bank_account)
      }
    }
    checkUserBankAccount()
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (images.length + files.length > 5) {
      alert('Maximum 5 images allowed')
      return
    }

    setImages([...images, ...files])
    
    // 生成预览图
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
  }

  const handleAIAssist = () => {
    alert('AI Assist: Coming soon! This will write the description for you.')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. 检查 Bank Account
    if (!userHasQRCode) {
      alert('Please set up your bank account in Profile settings before listing items.')
      router.push('/profile')
      return
    }

    // 2. 检查图片
    if (images.length === 0) {
      alert('Please upload at least one image')
      return
    }

    // 3. 检查必填项
    if (!formData.title || !formData.description || !formData.price || 
        !formData.category || !formData.condition || !formData.university) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // A. 获取当前登录用户
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('You must be logged in to sell items.')
        router.push('/login')
        return
      }

      // B. 上传图片到 Supabase Storage
      const imageUrls: string[] = []

      for (const file of images) {
        const fileExt = file.name.split('.').pop()
        // 文件名：userID-时间戳-随机数.jpg
        const fileName = `${user.id}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('item-images')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        // 获取公开访问链接
        const { data: { publicUrl } } = supabase.storage
          .from('item-images')
          .getPublicUrl(fileName)
        
        imageUrls.push(publicUrl)
      }

      // C. 将数据写入 Database 'items' 表
      const { error: insertError } = await supabase
        .from('items')
        .insert({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price), // 确保是数字
          category: formData.category,
          condition: formData.condition,
          university: formData.university,
          images: imageUrls, // 存入图片URL数组
          seller_id: user.id,
          status: 'AVAILABLE'
        })

      if (insertError) throw insertError

      // D. 成功！跳转回首页
      alert('Item listed successfully! 🎉')
      router.push('/')

    } catch (error: any) {
      console.error('Error uploading item:', error)
      alert('Failed to list item: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-pasar-bg py-8 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-pasar-dark mb-2 flex items-center justify-center gap-2">
            Sell Item <DollarSign size={32} className="text-green-600" />
          </h1>
          <p className="text-pasar-dark/60 font-medium">
            Turn your unused stuff into cash. No bargaining allowed.
          </p>
        </div>

        {/* Bank Account Warning (Red Card) */}
        {!userHasQRCode && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-3xl p-6 flex gap-4 items-start shadow-sm">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-red-900 mb-1">Payment Setup Required</h3>
              <p className="text-sm text-red-700 mb-3">
                You need to add your bank account number in your profile so buyers can transfer payment to you.
              </p>
              <button 
                onClick={() => router.push('/profile')}
                className="bg-white border-2 border-red-200 text-red-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-red-100 transition-colors"
              >
                Go to Settings
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. PHOTOS SECTION */}
          <div className="card-pop bg-white p-6 md:p-8">
            <h2 className="font-black text-xl text-pasar-dark mb-4 flex items-center gap-2">
              <Camera className="text-pasar-primary" /> Photos
            </h2>
            
            <div className="grid grid-cols-3 gap-3 mb-2">
              {/* Image Previews */}
              {imagePreviews.map((preview, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 group">
                  <Image src={preview} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                  >
                    <X size={14} />
                  </button>
                  {idx === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-pasar-dark/80 text-white text-[10px] font-bold text-center py-1">
                      COVER
                    </div>
                  )}
                </div>
              ))}
              
              {/* Upload Button */}
              {images.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-pasar-dark hover:bg-slate-50 transition-all group">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-white border-2 border-transparent group-hover:border-slate-200 transition-colors">
                    <Plus size={20} className="text-slate-400 group-hover:text-pasar-dark" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-pasar-dark">Add Photo</span>
                </label>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium text-center">
              Up to 5 photos. Make it aesthetic! ✨
            </p>
          </div>

          {/* 2. DETAILS SECTION */}
          <div className="card-pop bg-white p-6 md:p-8 space-y-5">
            <h2 className="font-black text-xl text-pasar-dark mb-4">Item Details</h2>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-pasar-dark uppercase mb-1 ml-1">
                Item Name
              </label>
              <input
                type="text"
                placeholder="e.g. Calculus Book (9th Edition)"
                className="input-pop"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                maxLength={60}
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1 ml-1">
                <label className="block text-xs font-bold text-pasar-dark uppercase">
                  Description
                </label>
                <button
                  type="button"
                  onClick={handleAIAssist}
                  className="text-xs font-bold text-pasar-accent flex items-center gap-1 hover:underline"
                >
                  <Sparkles size={12} /> AI Assist
                </button>
              </div>
              <textarea
                className="input-pop min-h-[120px] py-3"
                placeholder="Describe condition, reason for selling..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                maxLength={500}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-pasar-dark uppercase mb-1 ml-1">
                Price (RM) - Fixed
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pasar-dark font-black">
                  RM
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="input-pop pl-12 font-bold text-lg"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-pasar-dark uppercase mb-1 ml-1">
                Category
              </label>
              <div className="relative">
                <select
                  className="input-pop appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-bold text-pasar-dark uppercase mb-2 ml-1">
                Condition
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CONDITIONS.map(condition => (
                  <button
                    key={condition}
                    type="button"
                    onClick={() => setFormData({ ...formData, condition })}
                    className={`px-2 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                      formData.condition === condition
                        ? 'border-pasar-dark bg-pasar-dark text-white shadow-pop'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-pasar-dark'
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            {/* University Location (Updated!) */}
            <div>
              <label className="block text-xs font-bold text-pasar-dark uppercase mb-1 ml-1">
                Meet-up Location
              </label>
              <div className="relative">
                <select
                  className="input-pop appearance-none cursor-pointer pr-10"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                >
                  <option value="" disabled>Select University / Area</option>
                  
                  {/* 使用 lib/universities.ts 的数据 */}
                  {MALAYSIAN_UNIVERSITIES.map((area) => (
                    <optgroup key={area.region} label={area.region}>
                      {area.items.map((uni) => (
                        <option key={uni} value={uni}>
                          {uni}
                        </option>
                      ))}
                    </optgroup>
                  ))}

                  <option value="Other">Other Location</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              disabled={isSubmitting}
              className="flex-1 bg-white border-2 border-slate-200 text-slate-600 font-bold py-3 rounded-full hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !userHasQRCode}
              className="flex-[2] btn-primary flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Posting...
                </>
              ) : (
                <>List Item <Upload size={18} /></>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}