import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // 1. 这是一个帮助函数，用来刷新 Supabase 的 Session
  // 我们稍后会在 utils 里创建它
  return await updateSession(request)
}

export const config = {
  // 2. 这里设定哪些路由需要经过这个“保安”
  // 我们虽然全局匹配，但在 updateSession 里会判断
  matcher: [
    /*
     * 匹配所有路径，除了:
     * - _next/static (静态文件)
     * - _next/image (图片优化)
     * - favicon.ico (图标)
     * - images (你的本地图片文件夹)
     * - login (登录页面本身当然不需要保安)
     * - / (首页任何人都能看)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|login|auth|$).*)',
  ],
}