"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { mockTokens } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Settings, Save, Upload, AlertTriangle } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function TokenSettingsPage({ params }: PageProps) {
  const { id } = use(params)
  const token = mockTokens.find((t) => t.id === id) || mockTokens[0]

  const [description, setDescription] = useState(token.description || "")
  const [creatorFee, setCreatorFee] = useState(token.creatorFee)
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    discord: "",
    website: "",
  })

  return (
    <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/studio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={18} />
        Back to Creator Studio
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#1A1A1A]">
          <Image
            src={token.image || "/placeholder.svg"}
            alt={token.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings size={24} className="text-[#9CFFBB]" />
            {token.name} Settings
          </h1>
          <p className="text-gray-400">{token.symbol}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Description */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Token Description</h2>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your token..."
              className="bg-[#1A1A1A] border-[#9CFFBB]/20 text-white min-h-[100px]"
            />
          </div>
        </div>

        {/* Creator Fee */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Creator Fee</h2>
          <div className="space-y-4">
            <Label className="text-gray-300">Current Fee: {creatorFee}%</Label>
            <input
              type="range"
              min="3"
              max="10"
              step="0.5"
              value={creatorFee}
              onChange={(e) => setCreatorFee(Number.parseFloat(e.target.value))}
              className="w-full h-2 bg-[#1A1A1A] rounded-lg appearance-none cursor-pointer accent-[#9CFFBB]"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>3%</span>
              <span>10%</span>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-2">
              <AlertTriangle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-sm text-yellow-400">Changing the fee will apply to all future trades only.</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Social Links</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-gray-300">
                Twitter / X
              </Label>
              <Input
                id="twitter"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                placeholder="https://twitter.com/..."
                className="bg-[#1A1A1A] border-[#9CFFBB]/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discord" className="text-gray-300">
                Discord
              </Label>
              <Input
                id="discord"
                value={socialLinks.discord}
                onChange={(e) => setSocialLinks({ ...socialLinks, discord: e.target.value })}
                placeholder="https://discord.gg/..."
                className="bg-[#1A1A1A] border-[#9CFFBB]/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-gray-300">
                Website
              </Label>
              <Input
                id="website"
                value={socialLinks.website}
                onChange={(e) => setSocialLinks({ ...socialLinks, website: e.target.value })}
                placeholder="https://..."
                className="bg-[#1A1A1A] border-[#9CFFBB]/20 text-white"
              />
            </div>
          </div>
        </div>

        {/* Token Image */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Token Image</h2>
          <div className="border-2 border-dashed border-[#9CFFBB]/20 rounded-xl p-8 text-center hover:border-[#9CFFBB]/40 transition-colors cursor-pointer">
            <Upload size={32} className="mx-auto text-gray-500 mb-2" />
            <p className="text-sm text-gray-400">Click to upload a new image</p>
            <p className="text-xs text-gray-600 mt-1">PNG, JPG, GIF up to 2MB</p>
          </div>
        </div>

        {/* Save Button */}
        <Button className="w-full bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] font-semibold">
          <Save size={18} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
