"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, QrCode } from "lucide-react"

interface QRCodeDisplayProps {
  companyId: string
  companyName: string
}

export function QRCodeDisplay({ companyId, companyName }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")

  useEffect(() => {
    // Generate QR code using a public API
    const reviewUrl = `${window.location.origin}/submit/${companyId}`
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(reviewUrl)}`
    setQrCodeUrl(qrApiUrl)
  }, [companyId])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `${companyName.replace(/\s+/g, "-")}-review-qr-code.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Review Submission QR Code
        </CardTitle>
        <CardDescription>
          Share this QR code with customers to easily collect reviews. They can scan it with their phone camera to
          submit a review instantly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          {qrCodeUrl && (
            <div className="p-4 bg-white rounded-lg shadow-md">
              <img src={qrCodeUrl || "/placeholder.svg"} alt="Review QR Code" className="w-64 h-64" />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={handleDownload} className="flex-1 gradient-blue">
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const reviewUrl = `${window.location.origin}/submit/${companyId}`
              navigator.clipboard.writeText(reviewUrl)
            }}
          >
            Copy Link
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Service reps can save this QR code and display it at checkout, in emails, or on receipts
        </p>
      </CardContent>
    </Card>
  )
}
