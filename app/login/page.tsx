'use client'

import { useState } from 'react'
import { login, signup } from '@/app/actions/auth'
import { MALAYSIAN_UNIVERSITIES } from '@/lib/universities' // 引入大学名单
import { Loader2, ChevronDown, Store, Flag } from 'lucide-react' // ✅ 修复：合并了图标引用

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    if (isLogin) {
      // 处理登录
      const res = await login(formData)
      if (res?.error) setMessage(res.error)
    } else {
      // 处理注册
      const res = await signup(formData)
      if (res?.error) {
        setMessage(res.error)
      } else if (res?.success) {
        setMessage('✅ Account created! Please check your email to verify.')
        // 注册成功后自动切回登录，或者保持显示成功信息
        setIsLogin(true) 
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-pasar-bg flex flex-col items-center justify-center p-4">
      
      {/* LOGO */}
      <div className="mb-8 text-center">
        <div className="inline-block bg-pasar-primary p-4 rounded-3xl border-4 border-pasar-dark shadow-[6px_6px_0px_0px_#1E1B4B] mb-4">
          <Store size={48} className="text-pasar-dark" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-black text-pasar-dark mt-4">PasarUni</h1>
        <p className="text-pasar-dark/60 font-bold flex items-center justify-center gap-2">
          For Malaysian Students Only <Flag size={16} className="text-pasar-dark" />
        </p>
      </div>

      {/* CARD */}
      <div className="card-pop bg-white w-full max-w-md p-8 relative">
        
        {/* TABS */}
        <div className="flex mb-8 bg-slate-100 p-1 rounded-full">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-full font-bold text-sm transition-all ${
              isLogin ? 'bg-white shadow-sm text-pasar-dark' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-full font-bold text-sm transition-all ${
              !isLogin ? 'bg-white shadow-sm text-pasar-dark' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Register (New Student)
          </button>
        </div>

        <form action={handleSubmit} className="space-y-4">
          
          {/* 注册才需要的字段 */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold text-pasar-dark uppercase mb-1 ml-1">Full Name (As per IC)</label>
                <input required name="fullName" type="text" placeholder="Ali bin Abu" className="input-pop" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-pasar-dark uppercase mb-1 ml-1">IC Number</label>
                  <input required name="icNumber" type="text" placeholder="020101-10-1234" className="input-pop" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-pasar-dark uppercase mb-1 ml-1">Student ID</label>
                  <input required name="studentId" type="text" placeholder="WEK190022" className="input-pop" />
                </div>
              </div>

              {/* 👇 这里更新了：使用按州属分类的大学列表 */}
              <div>
                <label className="block text-xs font-bold text-pasar-dark uppercase mb-1 ml-1">
                  University / Region
                </label>
                <div className="relative">
                  <select 
                    required 
                    name="university" 
                    defaultValue=""
                    className="input-pop appearance-none cursor-pointer pr-10 text-pasar-dark"
                  >
                    <option value="" disabled>Select your University</option>
                    
                    {/* 动态生成大学列表 */}
                    {MALAYSIAN_UNIVERSITIES.map((area) => (
                      <optgroup key={area.region} label={area.region}>
                        {area.items.map((uni) => (
                          <option key={uni} value={uni}>
                            {uni}
                          </option>
                        ))}
                      </optgroup>
                    ))}

                    <option value="Other">Other Institute / Polytechnic</option>
                  </select>

                  {/* 右侧箭头图标 */}
                  <ChevronDown 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pasar-dark/50 pointer-events-none" 
                    size={20} 
                  />
                </div>
              </div>
            </>
          )}

          {/* 共同字段 */}
          <div>
            <label className="block text-xs font-bold text-pasar-dark uppercase mb-1 ml-1">Student Email</label>
            <input required name="email" type="email" placeholder="siswa@um.edu.my" className="input-pop" />
          </div>

          <div>
            <label className="block text-xs font-bold text-pasar-dark uppercase mb-1 ml-1">Password</label>
            <input required name="password" type="password" placeholder="••••••••" className="input-pop" />
          </div>

          {/* Error Message */}
          {message && (
            <div className={`p-3 rounded-xl text-sm font-bold text-center ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}

          <button 
            disabled={isLoading}
            type="submit" 
            className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
          >
            {isLoading && <Loader2 className="animate-spin w-5 h-5" />}
            {isLogin ? 'Masuk (Login)' : 'Daftar (Register)'}
          </button>

        </form>

        <p className="text-center text-xs text-slate-400 mt-6 font-medium">
          By registering, you agree that you are a verified student. <br/>
          Fake IDs will be banned immediately.
        </p>
      </div>
    </div>
  )
}