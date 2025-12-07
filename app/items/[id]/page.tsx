'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { ChevronLeft, Share2, Heart, ShieldCheck, MapPin, User, MessageCircle, ShoppingCart, GraduationCap, Trash2, CheckCircle2 } from 'lucide-react'
import { BuyNowModal } from '@/components/BuyNowModal'

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  
  // Q&A state
  const [questions, setQuestions] = useState<any[]>([])
  const [newQuestion, setNewQuestion] = useState('')
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false)

  // 初始化 Supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchItem() {
      // Get current user first
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)

      // 从数据库获取商品详情 + 卖家信息
      const { data, error } = await supabase
        .from('items')
        .select(`
          *,
          seller:profiles!seller_id(username, avatar_url, university, is_verified_student, bank_account)
        `)
        .eq('id', params.id)
        .single()

      if (error) {
        console.error('Error fetching item:', error)
        console.error('Item ID:', params.id)
      } else {
        console.log('Item loaded:', data)
        setItem(data)
      }
      
      // Fetch questions for this item
      const { data: questionsData } = await supabase
        .from('questions')
        .select(`
          *,
          asker:profiles!asker_id(username, avatar_url)
        `)
        .eq('item_id', params.id)
        .eq('is_public', true)
        .order('created_at', { ascending: false })
      
      setQuestions(questionsData || [])
      setLoading(false)
    }

    if (params.id) fetchItem()
  }, [params.id, supabase])

  const handleBuyNow = () => {
    if (!currentUser) {
      alert('Please log in to buy items')
      router.push('/login')
      return
    }
    setShowBuyModal(true)
  }
  
  const handleAskQuestion = async () => {
    if (!currentUser) {
      alert('Please log in to ask questions')
      router.push('/login')
      return
    }
    
    if (!newQuestion.trim()) {
      alert('Please enter a question')
      return
    }
    
    setIsSubmittingQuestion(true)
    
    try {
      const { error } = await supabase
        .from('questions')
        .insert({
          item_id: params.id,
          asker_id: currentUser.id,
          content: newQuestion,
          is_public: true
        })
      
      if (error) throw error
      
      // Refresh questions
      const { data: questionsData } = await supabase
        .from('questions')
        .select(`
          *,
          asker:profiles!asker_id(username, avatar_url)
        `)
        .eq('item_id', params.id)
        .eq('is_public', true)
        .order('created_at', { ascending: false })
      
      setQuestions(questionsData || [])
      setNewQuestion('')
      alert('Question posted! ✅')
    } catch (error) {
      console.error('Error posting question:', error)
      alert('Failed to post question')
    } finally {
      setIsSubmittingQuestion(false)
    }
  }

  const handleDeleteItem = async () => {
    if (!currentUser || currentUser.id !== item.seller_id) {
      alert('You can only delete your own items')
      return
    }

    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', params.id)

      if (error) throw error

      alert('Item deleted successfully!')
      router.push('/profile')
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item')
    }
  }

  const handleMarkAsSold = async () => {
    if (!currentUser || currentUser.id !== item.seller_id) {
      alert('You can only mark your own items as sold')
      return
    }

    if (!confirm('Mark this item as sold?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('items')
        .update({ status: 'SOLD' })
        .eq('id', params.id)

      if (error) throw error

      // Refresh item data
      const { data: updatedItem } = await supabase
        .from('items')
        .select(`
          *,
          seller:profiles!seller_id(username, avatar_url, university, is_verified_student, bank_account)
        `)
        .eq('id', params.id)
        .single()

      setItem(updatedItem)
      alert('Item marked as sold! ✅')
    } catch (error) {
      console.error('Error marking as sold:', error)
      alert('Failed to mark as sold')
    }
  }

  // Check if current user is the seller
  const isOwner = currentUser && item && currentUser.id === item.seller_id

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  )

  if (!item) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-2xl font-black text-pasar-dark mb-2">Item not found</h1>
      <p className="text-gray-500 mb-6">This item might have been deleted or sold.</p>
      <button onClick={() => router.push('/')} className="bg-pasar-dark text-white px-6 py-2 rounded-full font-bold">
        Back to Home
      </button>
    </div>
  )

  // 格式化价格
  const formattedPrice = new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
  }).format(item.price)

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 pb-24 md:pb-10">
      
      {/* Buy Now Modal */}
      <BuyNowModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        itemPrice={item.price}
        sellerQrCode={item.seller?.bank_account}
        sellerName={item.seller?.username || 'Seller'}
      />
      
      {/* 1. MOBILE NAVBAR (手机顶部导航) */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex justify-between items-center md:hidden border-b border-gray-100">
        <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} className="text-pasar-dark" />
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Share2 size={22} className="text-pasar-dark" />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto md:py-8 flex flex-col md:flex-row gap-6 md:gap-10 px-0 md:px-4">
        
        {/* =======================
            LEFT: IMAGE GALLERY 
           ======================= */}
        <div className="w-full md:w-[55%]">
          <div className="bg-white md:rounded-[2rem] md:p-4 md:shadow-sm">
            {/* 主图 */}
            <div className="relative aspect-[4/5] md:aspect-square w-full bg-gray-100 md:rounded-2xl overflow-hidden">
              <Image 
                src={item.images && item.images.length > 0 ? item.images[activeImage] : '/placeholder.png'} 
                alt={item.title} 
                fill 
                className="object-cover"
              />
              {/* 售出遮罩 */}
              {item.status === 'SOLD' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <span className="text-white font-black border-4 border-white px-6 py-2 rounded-xl text-xl -rotate-12">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>

            {/* 缩略图 (如果有超过一张) */}
            {item.images && item.images.length > 1 && (
              <div className="flex gap-3 mt-4 px-4 md:px-0 overflow-x-auto scrollbar-hide pb-2">
                {item.images.map((img: string, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-pasar-dark ring-2 ring-pasar-dark/20' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =======================
            RIGHT: INFO & SELLER
           ======================= */}
        <div className="w-full md:w-[45%] space-y-6 px-4 md:px-0">
          
          {/* A. 卖家卡片 (User Profile) */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden relative border border-gray-200">
                {item.seller?.avatar_url ? (
                  <Image src={item.seller.avatar_url} fill className="object-cover" alt="Seller" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <GraduationCap size={24} className="text-pasar-dark" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-pasar-dark text-base leading-none mb-1">
                  {item.seller?.username || 'Student'}
                </h3>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-slate-500 font-medium">{item.seller?.university || 'Malaysia'}</p>
                  {item.seller?.is_verified_student && (
                    <ShieldCheck size={14} className="text-blue-500" />
                  )}
                </div>
              </div>
            </div>
            <button className="text-xs font-bold border-2 border-pasar-dark px-4 py-1.5 rounded-full hover:bg-pasar-dark hover:text-white transition-all">
              View Profile
            </button>
          </div>

          {/* Seller Action Buttons - Only shown to item owner */}
          {isOwner && (
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <h3 className="font-bold text-pasar-dark text-sm uppercase tracking-wider mb-3">Manage Your Item</h3>
              <div className="flex gap-3">
                {item.status !== 'SOLD' && (
                  <button
                    onClick={handleMarkAsSold}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all border-2 border-green-700 shadow-[3px_3px_0px_0px_rgba(21,128,61,1)]"
                  >
                    <CheckCircle2 size={18} />
                    <span>Mark as Sold</span>
                  </button>
                )}
                <button
                  onClick={handleDeleteItem}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all border-2 border-red-700 shadow-[3px_3px_0px_0px_rgba(153,27,27,1)]"
                >
                  <Trash2 size={18} />
                  <span>Delete Item</span>
                </button>
              </div>
            </div>
          )}

          {/* B. 商品详情 */}
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            
            {/* 标题 & 价格 */}
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-pasar-dark mb-2 leading-tight">
                {item.title}
              </h1>
              <p className="text-3xl font-black text-pasar-dark mb-4">
                {formattedPrice}
              </p>
              
              {/* 标签 */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pasar-secondary text-pasar-dark text-xs font-bold rounded-full border border-pasar-dark/10">
                  {item.condition}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100"></div>

            {/* 描述 */}
            <div>
              <h3 className="font-bold text-pasar-dark mb-2 text-sm uppercase tracking-wider">Description</h3>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                {item.description}
              </p>
            </div>

            {/* 地点 */}
            <div className="bg-gray-50 p-4 rounded-xl flex items-start gap-3 border border-gray-100">
              <MapPin className="text-pasar-dark shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-bold text-pasar-dark text-sm">Meet-up Location</h4>
                <p className="text-sm text-slate-500 mt-0.5">{item.university}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =======================
          Q&A SECTION
         ======================= */}
      <div className="max-w-5xl mx-auto px-4 md:px-4 py-8">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-black text-pasar-dark mb-6 flex items-center gap-2">
            <MessageCircle size={24} /> Questions & Answers
          </h2>

          {/* Ask Question Form */}
          <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <label className="block font-bold text-pasar-dark text-sm mb-2">
              Have a question? Ask the seller publicly
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="e.g., Is this still available?"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pasar-primary text-sm"
                disabled={!currentUser}
              />
              <button
                onClick={handleAskQuestion}
                disabled={isSubmittingQuestion || !currentUser}
                className="px-6 py-2 bg-pasar-dark text-white rounded-lg font-bold text-sm hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingQuestion ? 'Posting...' : 'Ask'}
              </button>
            </div>
            {!currentUser && (
              <p className="text-xs text-gray-500 mt-2">Please log in to ask questions</p>
            )}
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {questions.length > 0 ? (
              questions.map((q) => (
                <div key={q.id} className="border-l-4 border-pasar-primary pl-4 py-2">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden relative shrink-0 border border-gray-200">
                      {q.asker?.avatar_url ? (
                        <Image src={q.asker.avatar_url} alt="Avatar" fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-sm">👤</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-pasar-dark text-sm mb-1">
                        {q.asker?.username || 'Anonymous'}
                      </p>
                      <p className="text-gray-700 text-sm">{q.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(q.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Seller Reply */}
                  {q.reply && (
                    <div className="ml-11 mt-3 p-3 bg-pasar-secondary/30 rounded-lg border border-pasar-primary/20">
                      <p className="font-bold text-pasar-dark text-xs mb-1 flex items-center gap-1">
                        <MessageCircle size={12} /> Seller's Reply:
                      </p>
                      <p className="text-gray-700 text-sm">{q.reply}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <MessageCircle size={48} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No questions yet. Be the first to ask!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =======================
          3. STICKY ACTION BAR
         ======================= */}
      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 px-4 md:hidden flex items-center gap-3 z-50 safe-area-pb">
        <button className="p-3 rounded-full border-2 border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors">
          <Heart size={22} />
        </button>
        <button 
          onClick={handleBuyNow}
          disabled={item.status === 'SOLD'}
          className={`flex-1 h-12 rounded-full font-bold text-base shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 ${
            item.status === 'SOLD' 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-pasar-primary text-pasar-dark'
          }`}
        >
          <ShoppingCart size={20} /> {item.status === 'SOLD' ? 'Sold Out' : 'Buy Now'}
        </button>
      </div>

      {/* Desktop Floating Box (Desktop only) */}
      <div className="hidden md:flex fixed bottom-10 right-10 flex-col gap-3 items-end z-40">
        <div className="bg-white border-2 border-pasar-dark p-5 rounded-2xl shadow-[6px_6px_0px_0px_#1E1B4B] w-80">
           <div className="flex justify-between items-end mb-4">
             <span className="text-slate-500 font-bold text-sm">Total Price</span>
             <span className="text-2xl font-black text-pasar-dark">{formattedPrice}</span>
           </div>
           <button 
             onClick={handleBuyNow}
             disabled={item.status === 'SOLD'}
             className={`w-full font-black py-3.5 rounded-xl text-base transition-all flex items-center justify-center gap-2 ${
               item.status === 'SOLD'
                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                 : 'bg-pasar-primary text-pasar-dark hover:brightness-105'
             }`}
           >
             <ShoppingCart size={20} /> {item.status === 'SOLD' ? 'Sold Out' : 'Buy Now'}
           </button>
        </div>
      </div>

    </div>
  )
}