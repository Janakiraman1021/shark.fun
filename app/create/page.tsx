"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, ArrowRight, ArrowLeft, Upload, Check, Info, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Basic Info" },
  { id: 2, title: "Bonding Curve" },
  { id: 3, title: "Creator Fees" },
  { id: 4, title: "Preview & Deploy" },
]

const curveTypes = [
  { id: "linear", name: "Linear", description: "Price increases linearly with supply" },
  { id: "exponential", name: "Exponential", description: "Price grows faster as supply increases" },
  { id: "sigmoid", name: "Sigmoid", description: "S-curve with slower growth at extremes" },
]

export default function CreateTokenPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    image: null as File | null,
    curveType: "exponential",
    initialPrice: "0.0001",
    creatorFee: 5,
    initialLiquidity: "100",
  })

  const updateForm = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const estimatedPrice = Number.parseFloat(formData.initialPrice) || 0.0001

  return (
    <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <PlusCircle size={28} className="text-[#9CFFBB]" />
        <h1 className="text-3xl font-bold text-white">Create Token</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                  currentStep >= step.id
                    ? "bg-gradient-to-br from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A]"
                    : "bg-[#1A1A1A] text-gray-500",
                )}
              >
                {currentStep > step.id ? <Check size={18} /> : step.id}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm font-medium hidden sm:block",
                  currentStep >= step.id ? "text-white" : "text-gray-500",
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn("w-12 sm:w-24 h-0.5 mx-2", currentStep > step.id ? "bg-[#9CFFBB]" : "bg-[#1A1A1A]")} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Basic Information</h2>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Token Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., SharkMoon"
                value={formData.name}
                onChange={(e) => updateForm("name", e.target.value)}
                className="bg-[#1A1A1A] border-[#9CFFBB]/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symbol" className="text-gray-300">
                Token Symbol
              </Label>
              <Input
                id="symbol"
                placeholder="e.g., SHRK"
                value={formData.symbol}
                onChange={(e) => updateForm("symbol", e.target.value.toUpperCase())}
                maxLength={6}
                className="bg-[#1A1A1A] border-[#9CFFBB]/20 text-white uppercase"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your token..."
                value={formData.description}
                onChange={(e) => updateForm("description", e.target.value)}
                className="bg-[#1A1A1A] border-[#9CFFBB]/20 text-white min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Token Image</Label>
              <div className="border-2 border-dashed border-[#9CFFBB]/20 rounded-xl p-8 text-center hover:border-[#9CFFBB]/40 transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-500 mb-2" />
                <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-600 mt-1">PNG, JPG, GIF up to 2MB</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Bonding Curve */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Bonding Curve Setup</h2>

            <div className="space-y-4">
              <Label className="text-gray-300">Curve Type</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {curveTypes.map((curve) => (
                  <button
                    key={curve.id}
                    onClick={() => updateForm("curveType", curve.id)}
                    className={cn(
                      "p-4 rounded-xl text-left transition-all",
                      formData.curveType === curve.id
                        ? "bg-[#9CFFBB]/10 border-2 border-[#9CFFBB]"
                        : "bg-[#1A1A1A] border-2 border-transparent hover:border-[#9CFFBB]/30",
                    )}
                  >
                    <p className="font-medium text-white mb-1">{curve.name}</p>
                    <p className="text-xs text-gray-400">{curve.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialPrice" className="text-gray-300">
                Initial Price (ADA)
              </Label>
              <Input
                id="initialPrice"
                type="number"
                step="0.0001"
                value={formData.initialPrice}
                onChange={(e) => updateForm("initialPrice", e.target.value)}
                className="bg-[#1A1A1A] border-[#9CFFBB]/20 text-white"
              />
              <p className="text-xs text-gray-500">The starting price for the first token</p>
            </div>

            <div className="p-4 rounded-xl bg-[#9CFFBB]/5 border border-[#9CFFBB]/20">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-[#9CFFBB] mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium">How Bonding Curves Work</p>
                  <p className="text-xs text-gray-400 mt-1">
                    The price automatically adjusts based on supply. As more tokens are bought, the price increases.
                    When tokens are sold, the price decreases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Creator Fees */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Creator Fee Settings</h2>

            <div className="space-y-4">
              <Label className="text-gray-300">Creator Fee: {formData.creatorFee}%</Label>
              <input
                type="range"
                min="3"
                max="10"
                step="0.5"
                value={formData.creatorFee}
                onChange={(e) => updateForm("creatorFee", Number.parseFloat(e.target.value))}
                className="w-full h-2 bg-[#1A1A1A] rounded-lg appearance-none cursor-pointer accent-[#9CFFBB]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>3%</span>
                <span>10%</span>
              </div>
              <p className="text-sm text-gray-400">You earn {formData.creatorFee}% of every trade on your token</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialLiquidity" className="text-gray-300">
                Initial Liquidity (ADA)
              </Label>
              <Input
                id="initialLiquidity"
                type="number"
                min="10"
                value={formData.initialLiquidity}
                onChange={(e) => updateForm("initialLiquidity", e.target.value)}
                className="bg-[#1A1A1A] border-[#9CFFBB]/20 text-white"
              />
              <p className="text-xs text-gray-500">Minimum 10 ADA to bootstrap the bonding curve</p>
            </div>
          </div>
        )}

        {/* Step 4: Preview & Deploy */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Preview & Deploy</h2>

            <div className="p-6 rounded-xl bg-[#1A1A1A] space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#9CFFBB] to-[#5CFF71] flex items-center justify-center">
                  <Sparkles size={24} className="text-[#0A0A0A]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.name || "Token Name"}</h3>
                  <p className="text-gray-400">{formData.symbol || "SYMBOL"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#9CFFBB]/10">
                <div>
                  <p className="text-xs text-gray-400">Initial Price</p>
                  <p className="text-sm font-medium text-white">{formData.initialPrice} ADA</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Curve Type</p>
                  <p className="text-sm font-medium text-white capitalize">{formData.curveType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Creator Fee</p>
                  <p className="text-sm font-medium text-[#9CFFBB]">{formData.creatorFee}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Initial Liquidity</p>
                  <p className="text-sm font-medium text-white">{formData.initialLiquidity} ADA</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-sm text-yellow-400">
                Once deployed, you cannot change the bonding curve type or initial price. Creator fee can be adjusted
                later.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="border-[#9CFFBB]/30 text-gray-400 hover:text-white disabled:opacity-50 bg-transparent"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] font-semibold"
          >
            Next
            <ArrowRight size={18} className="ml-2" />
          </Button>
        ) : (
          <Button className="bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] font-semibold glow-mint">
            Deploy Token
            <Sparkles size={18} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
