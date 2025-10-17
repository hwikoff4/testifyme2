"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, Code2 } from "lucide-react"

interface EmbedCodeGeneratorProps {
  companyId: string
  companyName: string
}

export function EmbedCodeGenerator({ companyId, companyName }: EmbedCodeGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [limit, setLimit] = useState("")
  const [width, setWidth] = useState("100%")
  const [height, setHeight] = useState("600")

  // Build the embed URL with query parameters
  const buildEmbedUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const url = new URL(`${baseUrl}/embed/${companyId}`)

    if (featuredOnly) {
      url.searchParams.set("featured", "true")
    }
    if (limit) {
      url.searchParams.set("limit", limit)
    }

    return url.toString()
  }

  // Generate the iframe embed code
  const generateEmbedCode = () => {
    const embedUrl = buildEmbedUrl()
    return `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" style="border: none; border-radius: 8px;"></iframe>`
  }

  const embedCode = generateEmbedCode()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code2 className="w-5 h-5" />
          Embed Code Generator
        </CardTitle>
        <CardDescription>Generate an embed code to display {companyName} reviews on any website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="featured-only">Featured Reviews Only</Label>
              <p className="text-sm text-muted-foreground">Show only reviews marked as featured</p>
            </div>
            <Switch id="featured-only" checked={featuredOnly} onCheckedChange={setFeaturedOnly} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit">Limit Number of Reviews</Label>
            <Input
              id="limit"
              type="number"
              placeholder="Leave empty for all reviews"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              min="1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input id="width" placeholder="100%" value={width} onChange={(e) => setWidth(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (px)</Label>
              <Input
                id="height"
                type="number"
                placeholder="600"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Preview URL */}
        <div className="space-y-2">
          <Label>Preview URL</Label>
          <div className="flex gap-2">
            <Input value={buildEmbedUrl()} readOnly className="font-mono text-sm" />
            <Button type="button" variant="outline" size="icon" onClick={() => window.open(buildEmbedUrl(), "_blank")}>
              <Code2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Embed Code */}
        <div className="space-y-2">
          <Label>Embed Code</Label>
          <div className="relative">
            <Textarea value={embedCode} readOnly className="font-mono text-sm pr-12" rows={4} />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="absolute top-2 right-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Copy this code and paste it into your website's HTML where you want the reviews to appear.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
