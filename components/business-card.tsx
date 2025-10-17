"use client"

import { useRef, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

type BusinessCardProps = {
  companyName: string
  companyEmail: string | null
  companyPhone: string | null
  companyAddress: string | null
  companyLogo: string | null
  submitUrl: string
  userName?: string
}

export function BusinessCard({
  companyName,
  companyEmail,
  companyPhone,
  companyAddress,
  companyLogo,
  submitUrl,
  userName = "Team Member",
}: BusinessCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadCard = async () => {
    if (!cardRef.current) return

    try {
      setIsDownloading(true)
      // Dynamically import html2canvas only when needed
      const html2canvas = (await import("html2canvas")).default

      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      })

      const link = document.createElement("a")
      link.download = `${companyName}-business-card.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("[v0] Error downloading business card:", error)
      alert("Failed to download business card. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card
        ref={cardRef}
        style={{
          width: "3.5in",
          height: "2in",
          padding: "1.5rem",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          border: "2px solid #e5e7eb",
          borderRadius: "0.75rem",
        }}
      >
        <div style={{ display: "flex", height: "100%", gap: "1rem" }}>
          {/* Left side - Company info */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* Logo */}
            {companyLogo ? (
              <div style={{ position: "relative", width: "96px", height: "48px" }}>
                <Image src={companyLogo || "/placeholder.svg"} alt={companyName} fill className="object-contain" />
              </div>
            ) : (
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#0A1F44" }}>{companyName}</div>
            )}

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <div style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0A1F44" }}>{userName}</div>
              <div style={{ fontSize: "0.75rem", fontStyle: "italic", color: "#4b5563" }}>{companyName}</div>

              {companyEmail && <div style={{ fontSize: "0.75rem", color: "#374151" }}>{companyEmail}</div>}

              {companyPhone && <div style={{ fontSize: "0.75rem", color: "#374151" }}>{companyPhone}</div>}

              {companyAddress && (
                <div style={{ fontSize: "0.75rem", fontStyle: "italic", color: "#4b5563", marginTop: "0.5rem" }}>
                  {companyAddress}
                </div>
              )}
            </div>
          </div>

          {/* Right side - QR code */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <QRCodeSVG value={submitUrl} size={120} level="H" includeMargin={false} />
            <div style={{ fontSize: "8px", textAlign: "center", color: "#6b7280", fontStyle: "italic" }}>
              Scan to leave a review
            </div>
          </div>
        </div>
      </Card>

      <Button
        onClick={downloadCard}
        disabled={isDownloading}
        className="w-full bg-gradient-to-r from-[#56B4E9] to-[#0A1F44] hover:opacity-90"
      >
        <Download className="mr-2 h-4 w-4" />
        {isDownloading ? "Downloading..." : "Download Business Card"}
      </Button>
    </div>
  )
}
