'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// 创建 Supabase 客户端的辅助函数
function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

// --- 注册功能 ---
export async function signup(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const icNumber = formData.get('icNumber') as string
  const studentId = formData.get('studentId') as string
  const university = formData.get('university') as string

  // 1. 注册账号
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        university: university,
        // IC 和 学号 我们稍后存入 profiles 表，不在 metadata 里暴露
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // 2. 将敏感信息存入 profiles 表
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: data.user.id,
        username: fullName, // 暂时用全名当用户名
        full_name: fullName,
        ic_number: icNumber,
        student_id: studentId,
        university: university,
        email: email,
      })

    if (profileError) {
      console.error('Profile Error:', profileError)
      return { error: 'Account created but profile update failed.' }
    }
  }

  return { success: true }
}

// --- 登录功能 ---
export async function login(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/')
}

// --- 登出功能 ---
export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}