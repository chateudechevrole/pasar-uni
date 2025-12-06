'use client'

import { useState } from 'react'
import { Upload, CheckCircle, X } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

interface BuyNowModalProps {
  isOpen: boolean
  onClose: () => void
  itemPrice: number
  sellerQrCode: string | null // Now contains bank account details
  sellerName: string
}

export function BuyNowModal({ 
  isOpen, 
  onClose, 
  itemPrice, 
  sellerQrCode,
  sellerName 
}: BuyNowModalProps) {
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!paymentProof) {
      alert('Sila muat naik bukti pembayaran')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handleClose = () => {
    setPaymentProof(null)
    setIsSuccess(false)
    onClose()
  }

  if (!isOpen) return null

  // Check if seller has bank account
  if (!sellerQrCode) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
        <div className="relative card-brutal max-w-md w-full p-8 bg-white">
          <button onClick={handleClose} className="absolute top-4 right-4">
            <X size={24} className="text-pasar-navy" strokeWidth={2.5} />
          </button>
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-black text-pasar-navy mb-3">
              Seller Hasn't Set Up Payment
            </h3>
            <p className="text-pasar-navy/70 font-semibold">
              The seller needs to add their bank account details first.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Success Screen
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
        <div className="relative card-brutal max-w-md w-full p-8 bg-white">
          <div className="text-center">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={64} strokeWidth={2.5} />
            <h3 className="text-2xl font-black text-pasar-navy mb-3">
              Pembayaran Dihantar! ✅
            </h3>
            <p className="text-pasar-navy/70 font-semibold mb-6">
              Penjual telah dimaklumkan. Barang ini kini <strong>RESERVED</strong> untuk anda. Tunggu pengesahan dari {sellerName}.
            </p>
            <button onClick={handleClose} className="btn-brutal bg-pasar-navy text-pasar-yellow w-full">
              Selesai
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Payment Screen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative card-brutal max-w-2xl w-full p-8 bg-white my-8">
        <button onClick={handleClose} className="absolute top-4 right-4">
          <X size={24} className="text-pasar-navy" strokeWidth={2.5} />
        </button>

        <h2 className="text-3xl font-black text-pasar-navy mb-6">Pay Now</h2>

        <div className="space-y-6">
          {/* Instructions */}
          <div className="p-5 bg-pasar-yellow/20 border-2 border-pasar-navy rounded-xl">
            <h4 className="font-black text-pasar-navy mb-3">Payment Instructions:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm font-semibold text-pasar-navy/80">
              <li>Transfer exactly <span className="font-black text-pasar-navy">{formatPrice(itemPrice)}</span> to the bank account below</li>
              <li>Take a screenshot of your payment confirmation</li>
              <li>Upload the screenshot below</li>
              <li>Wait for seller confirmation</li>
            </ol>
          </div>

          {/* Bank Account Display */}
          <div className="flex justify-center">
            <div className="card-brutal p-6 bg-white w-full">
              <div className="text-center mb-4">
                <p className="text-sm font-semibold text-pasar-navy/70 mb-2">Transfer to:</p>
                <p className="font-black text-pasar-navy text-lg mb-1">{sellerName}</p>
              </div>
              
              <div className="bg-pasar-yellow/20 p-4 rounded-xl border-2 border-pasar-navy/20 mb-4">
                <p className="text-sm font-bold text-pasar-navy/60 mb-1">Bank Account Details</p>
                <p className="text-lg font-black text-pasar-navy break-words">
                  {sellerQrCode}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm font-semibold text-pasar-navy/70 mb-1">Amount to pay:</p>
                <p className="text-3xl font-black text-pasar-navy">
                  {formatPrice(itemPrice)}
                </p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div>
            <label className="block font-black text-pasar-navy mb-3">
              Upload Payment Proof *
            </label>
            <div className="border-2 border-dashed border-pasar-navy rounded-xl p-8 text-center bg-pasar-cream hover:bg-pasar-yellow/10 transition-colors">
              <input
                type="file"
                id="payment-proof"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="payment-proof" className="cursor-pointer">
                {paymentProof ? (
                  <div className="space-y-2">
                    <CheckCircle className="mx-auto text-green-600" size={48} strokeWidth={2.5} />
                    <p className="font-bold text-pasar-navy">
                      {paymentProof.name}
                    </p>
                    <p className="text-xs font-semibold text-pasar-navy/60">Click to change</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto text-pasar-navy/60" size={48} strokeWidth={2.5} />
                    <p className="font-bold text-pasar-navy">
                      Click to upload
                    </p>
                    <p className="text-xs font-semibold text-pasar-navy/60">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 btn-brutal bg-white text-pasar-navy"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!paymentProof || isSubmitting}
              className="flex-1 btn-brutal bg-pasar-navy text-pasar-yellow disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'I\'ve Paid'}
            </button>
          </div>

          {/* Warning */}
          <p className="text-xs text-center font-semibold text-pasar-navy/60">
            ⚠️ Only submit after making payment. Fraud may result in account suspension.
          </p>
        </div>
      </div>
    </div>
  )
}
