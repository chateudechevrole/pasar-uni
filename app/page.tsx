'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ChevronDown, Loader2, Search, ArrowRight, Bookmark, Flag, Flame, Package, GraduationCap } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { MALAYSIAN_UNIVERSITIES } from '@/lib/universities'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'Textbooks', label: 'Books' },
  { id: 'Gadgets', label: 'Tech' },
  { id: 'Fashion', label: 'Style' },
  { id: 'Dorm', label: 'Living' },
  { id: 'Transport', label: 'Ride' },
  { id: 'Food', label: 'Food' },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedUni, setSelectedUni] = useState('')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchItems()
  }, [selectedUni, activeCategory])

  async function fetchItems() {
    setLoading(true)
    try {
      console.log('Fetching items...') // Debug log
      console.log('Selected Uni:', selectedUni) // Debug
      console.log('Active Category:', activeCategory) // Debug
      
      // Query items with profile information
      let query = supabase
        .from('items')
        .select(`
          *,
          profiles!seller_id (
            username,
            avatar_url,
            university
          )
        `)
        .eq('status', 'AVAILABLE')
        .order('created_at', { ascending: false })

      // Filter by university if selected
      if (selectedUni && selectedUni !== '' && selectedUni !== 'all') {
        query = query.eq('university', selectedUni)
      }
      
      // Filter by category if selected
      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory)
      }

      const { data, error } = await query

      if (error) {
        console.error('Supabase Error:', error)
        throw error
      }
      
      console.log('Data received:', data) // Check data in console
      console.log('Total items found:', data?.length || 0)
      setItems(data || [])
    } catch (error) {
      console.error('Error fetching items:', error)
      setItems([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  // 辅助函数：处理用户信息可能在 profiles 或 seller 字段的情况
  const getSellerInfo = (item: any) => {
    // 兼容 item.profiles (标准) 或 item.seller (如果Supabase别名设置过)
    const seller = item.profiles || item.seller || {}
    return {
      username: seller.username || 'Student',
      avatar_url: seller.avatar_url || null,
      university: seller.university || ''
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. HEADER */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4 mb-3">
             <div className="flex-1 relative">
               <input type="text" placeholder="Search..." className="w-full bg-gray-100 text-sm py-2.5 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-pasar-primary/50 transition-all"/>
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            <div className="relative shrink-0">
               <select value={selectedUni} onChange={(e) => setSelectedUni(e.target.value)} className="appearance-none bg-transparent font-bold text-sm text-pasar-dark pr-6 cursor-pointer focus:outline-none">
                  <option value="">All Malaysia</option>
                  {MALAYSIAN_UNIVERSITIES.map((area) => (
                    <optgroup key={area.region} label={area.region}>
                      {area.items.map((uni) => (<option key={uni} value={uni}>{uni}</option>))}
                    </optgroup>
                  ))}
               </select>
               <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-pasar-dark pointer-events-none" />
            </div>
            <div className="w-[1px] h-4 bg-gray-300 mx-1 shrink-0"></div>
            {CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${activeCategory === cat.id ? 'bg-pasar-dark text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="pt-6 px-4 max-w-6xl mx-auto">
        <div className="card-pop bg-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="z-10 flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pasar-secondary border-2 border-pasar-dark text-xs font-bold uppercase tracking-wider">
              <Flag size={14} className="text-pasar-dark" />
              Made for Malaysian Students
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-pasar-dark leading-tight tracking-tight">
              Campus trading, <br />
              <span className="text-pasar-accent">simplified.</span>
            </h1>
            <p className="text-lg font-medium text-pasar-dark/70 max-w-lg mx-auto md:mx-0">
              The safest way to buy & sell pre-loved items directly at your campus.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <Link href="/sell">
              <button className="bg-pasar-primary text-pasar-dark text-xl font-black px-10 py-6 rounded-3xl border-4 border-pasar-dark shadow-[8px_8px_0px_0px_#1E1B4B] hover:shadow-[4px_4px_0px_0px_#1E1B4B] hover:-translate-y-1 transition-all flex items-center gap-3">
                Start Selling Now 
                <ArrowRight strokeWidth={4} />
              </button>
            </Link>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-200 rounded-full filter blur-[50px] -z-10 opacity-50"></div>
          </div>
        </div>
      </section>

      {/* 3. WATERFALL GRID */}
      <section className="max-w-6xl mx-auto px-2 md:px-4 py-8">
        <h2 className="text-2xl font-black text-pasar-dark mb-6 px-2 flex items-center gap-2">
          Fresh Drops <Flame className="text-orange-500" size={24} />
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-pasar-dark w-8 h-8" /></div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-1">
            {items.map((item) => {
              const seller = getSellerInfo(item);
              return (
                <Link href={`/items/${item.id}`} key={item.id}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative aspect-[4/5] w-full bg-gray-200">
                      {/* 优先显示第一张图 */}
                      <Image 
                        src={(item.images && item.images.length > 0) ? item.images[0] : '/placeholder.png'} 
                        alt={item.title} 
                        fill 
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg shadow-sm z-10">
                        <span className="text-xs font-black text-pasar-dark">RM {item.price}</span>
                      </div>
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 flex-1">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <div className="w-5 h-5 rounded-full bg-gray-100 overflow-hidden relative shrink-0 border border-gray-100">
                             {seller.avatar_url ? (
                               <Image src={seller.avatar_url} alt="Av" fill className="object-cover" unoptimized />
                             ) : (
                               <div className="flex items-center justify-center h-full w-full bg-pasar-secondary">
                                 <GraduationCap size={12} className="text-pasar-dark" />
                               </div>
                             )}
                          </div>
                          <span className="text-[10px] text-gray-500 truncate max-w-[80px]">
                            {seller.username}
                          </span>
                        </div>
                        <Bookmark size={16} className="text-gray-400 group-hover:text-pasar-accent transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Package size={40} className="text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">No items found</h3>
            <p className="text-gray-500 text-sm mb-4">Be the first to list something!</p>
            <Link href="/sell"><button className="mt-4 bg-pasar-dark text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">+ Post Item</button></Link>
          </div>
        )}
      </section>
    </main>
  )
}