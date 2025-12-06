import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Database } from '@/lib/database.types'

type Item = Database['public']['Tables']['items']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

interface ProductCardProps {
  item: Item & { seller: Profile }
}

export function ProductCard({ item }: ProductCardProps) {
  const isHabis = item.status === 'SOLD'

  return (
    <Link href={`/items/${item.id}`}>
      <div className="card-brutal overflow-hidden hover:shadow-brutal-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer h-full">
        {/* Image Container */}
        <div className="relative aspect-square bg-stone-100">
          {item.images && item.images.length > 0 && item.images[0] ? (
            <Image
              src={item.images[0]}
              alt={item.title}
              fill
              className="object-cover"
            />
          ) : (
            /* Placeholder when no image */
            <div className="w-full h-full flex items-center justify-center bg-stone-200 border-2 border-dashed border-pasar-navy/30">
              <span className="text-6xl">📷</span>
            </div>
          )}
          
          {/* Habis Overlay */}
          {isHabis && (
            <>
              {/* Semi-transparent gray overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
              
              {/* Habis Stamp */}
              <div className="habis-stamp">
                HABIS!
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-pasar-navy line-clamp-2 mb-2 min-h-[3rem] text-lg">
            {item.title}
          </h3>

          {/* Price */}
          <div className="mb-3">
            <p className="text-2xl font-black text-pasar-navy">
              {formatPrice(item.price)}
            </p>
            <p className="text-xs font-semibold text-pasar-navy/60 uppercase tracking-wide">
              Fixed Price
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-3 border-t-2 border-pasar-navy/10">
            {/* University Badge */}
            <div className="px-3 py-1 bg-pasar-yellow rounded-lg border-2 border-pasar-navy">
              <span className="text-sm font-bold text-pasar-navy">
                {item.university_location}
              </span>
            </div>

            {/* Condition */}
            <div className="flex items-center gap-1 text-xs font-semibold text-pasar-navy/70">
              <span>{item.condition}</span>
            </div>
          </div>

          {/* Seller Info */}
          <div className="mt-3 pt-3 border-t-2 border-pasar-navy/10 flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-pasar-navy flex items-center justify-center border-2 border-pasar-navy">
              <span className="text-white text-xs font-bold">
                {item.seller.username[0].toUpperCase()}
              </span>
            </div>
            <p className="text-sm font-semibold text-pasar-navy/80 truncate">
              {item.seller.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

