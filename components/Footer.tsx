import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t-4 border-pasar-navy bg-white mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-black text-pasar-navy mb-2">
              PasarUni
            </h2>
            <p className="text-sm font-bold text-pasar-navy/60 mb-4">
              Pasar Kita, Harga Siswa
            </p>
            <p className="text-sm text-pasar-navy/70 font-medium">
              Platform jual beli untuk pelajar Malaysia. Harga tetap, tiada tawar-menawar!
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-black text-pasar-navy mb-4">Pautan Pantas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-pasar-navy/80 hover:text-pasar-navy font-semibold transition-colors">
                  Tapak Pasar
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-pasar-navy/80 hover:text-pasar-navy font-semibold transition-colors">
                  Jual Barang
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-pasar-navy/80 hover:text-pasar-navy font-semibold transition-colors">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-black text-pasar-navy mb-4">Hubungi</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-pasar-navy/70 font-medium">
                📧 hello@pasaruni.my
              </li>
              <li className="text-pasar-navy/70 font-medium">
                📱 WhatsApp: 011-xxxx xxxx
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-pasar-navy/20 mt-8 pt-8 text-center">
          <p className="text-pasar-navy/70 font-semibold text-sm">
            &copy; 2024 PasarUni. Made with love for Malaysian students
          </p>
        </div>
      </div>
    </footer>
  )
}
