import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      colors: {
        // PasarUni Neo-Brutalism Palette
        'pasar-primary': '#FDE047',   // Yellow-300 (更奶一点的黄)
        'pasar-secondary': '#FEF9C3', // Yellow-100 (淡黄背景)
        'pasar-accent': '#4F46E5',    // Indigo-600 (活力的蓝)
        'pasar-dark': '#1E1B4B',      // Indigo-950 (深色文字/边框)
        'pasar-bg': '#FAFAF9',        // Stone-50 (干净的背景)
        'pasar-sold': '#EF4444',      // Red-500 (Sold Out)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        '4xl': '2rem', // 超大圆角
      },

      boxShadow: {
        'pop': '4px 4px 0px 0px #1E1B4B', // 经典的立体阴影
        'pop-hover': '2px 2px 0px 0px #1E1B4B', // 点击时的阴影
      },
    },
  },
  plugins: [],
}
export default config

