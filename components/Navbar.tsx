'use client'

import Link from 'next/link'
import { User, Plus, Search, LogIn, Bell, Store } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // 在客户端检查用户是否登录
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      // If user is logged in, fetch notification count
      if (user) {
        // TODO: Fetch unread notifications count
        // For now, set to 0
        setUnreadCount(0)
      }
    }

    checkUser()
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-pasar-dark/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo 部分保持不变... */}
          <Link href="/" className="flex items-center gap-3 group">
             {/* ...你的 Logo 代码... */}
             <div className="bg-pasar-primary p-2 rounded-2xl border-2 border-pasar-dark shadow-[2px_2px_0px_0px_#1E1B4B] group-hover:-rotate-6 transition-transform duration-300">
              <Store size={24} className="text-pasar-dark" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-pasar-dark tracking-tight leading-none">
                PasarUni
              </span>
              <span className="text-xs font-bold text-pasar-dark/60 tracking-wide">
                Student Marketplace
              </span>
            </div>
          </Link>

          {/* Search Bar 保持不变... */}
          <div className="hidden md:block flex-1 max-w-sm">
             {/* ...你的搜索框代码... */}
          </div>

          {/* 右侧 Actions */}
          <div className="flex items-center gap-3">
            
            {/* SELL 按钮 */}
            {/* 这里的 href 指向 /sell，如果没登录，Middleware 会自动拦截跳转 /login */}
            <Link href="/sell">
              <button className="hidden sm:flex items-center gap-2 bg-pasar-dark text-white px-6 py-2.5 rounded-full font-bold border-2 border-pasar-dark shadow-pop hover:shadow-pop-hover hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-none">
                <Plus size={20} strokeWidth={3} />
                <span>Sell Item</span>
              </button>
            </Link>

            {/* NOTIFICATION BELL (only if logged in) */}
            {user && (
              <Link href="/notifications">
                <button className="relative w-10 h-10 rounded-full border-2 border-pasar-dark bg-white hover:bg-pasar-secondary transition-colors flex items-center justify-center">
                  <Bell size={20} className="text-pasar-dark" strokeWidth={2.5} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
              </Link>
            )}

            {/* AVATAR / LOGIN 按钮 */}
            {user ? (
              // 情况 A: 如果登录了，显示头像，点击去 Profile
              <Link href="/profile">
                <button className="w-10 h-10 rounded-full border-2 border-pasar-dark bg-pasar-secondary hover:bg-pasar-primary transition-colors flex items-center justify-center overflow-hidden">
                  {/* 如果有头像显示头像，没有显示 User 图标 */}
                  <User size={20} className="text-pasar-dark" strokeWidth={2.5} />
                </button>
              </Link>
            ) : (
              // 情况 B: 如果没登录，显示 Login 按钮
              <Link href="/login">
                <button className="w-10 h-10 rounded-full border-2 border-pasar-dark bg-white hover:bg-slate-100 transition-colors flex items-center justify-center group">
                  <LogIn size={20} className="text-pasar-dark group-hover:text-pasar-accent" strokeWidth={2.5} />
                </button>
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  )
}