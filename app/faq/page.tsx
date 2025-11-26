import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is shark.fun?",
    answer:
      "shark.fun is a decentralized meme token platform built on the Cardano blockchain. It allows anyone to create, buy, and sell meme tokens using bonding curve pricing, without the need for traditional liquidity pools.",
  },
  {
    question: "How do bonding curves work?",
    answer:
      "Bonding curves are mathematical formulas that automatically determine token prices based on supply. When you buy tokens, the price increases. When you sell, the price decreases. This creates a fair and transparent pricing mechanism without requiring centralized market makers.",
  },
  {
    question: "What fees does shark.fun charge?",
    answer:
      "shark.fun charges a small platform fee of 1% on all trades. Additionally, token creators can set their own creator fee (3-10%) which they earn on every trade of their token.",
  },
  {
    question: "How do I create a token?",
    answer:
      "To create a token, connect your Cardano wallet, click 'Create Token', fill in your token details (name, symbol, image), choose your bonding curve type, set your creator fee, and deploy. You'll need some ADA for the initial liquidity.",
  },
  {
    question: "What is the Battle Arena?",
    answer:
      "Battle Arena is a gamified competition where tokens compete for prizes based on trading volume, new holders, and engagement. Tokens with the highest scores win a share of the prize pool.",
  },
  {
    question: "How do I withdraw my creator earnings?",
    answer:
      "Visit Creator Studio to view your accumulated earnings. Click 'Withdraw' to transfer your earnings to your connected wallet. Withdrawals are processed instantly on the Cardano blockchain.",
  },
  {
    question: "Which wallets are supported?",
    answer:
      "shark.fun supports all CIP-30 compatible Cardano wallets including Eternl, Nami, Flint, Lace, and others. Simply connect your preferred wallet to start trading.",
  },
  {
    question: "Is shark.fun audited?",
    answer:
      "Yes, our smart contracts have been audited by leading blockchain security firms. You can view the full audit reports in our documentation.",
  },
]

export default function FAQPage() {
  return (
    <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <HelpCircle size={28} className="text-[#9CFFBB]" />
        <h1 className="text-3xl font-bold text-white">FAQ</h1>
      </div>
      <p className="text-gray-400 mb-8">Frequently asked questions about shark.fun</p>

      <div className="glass-card rounded-2xl p-6">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#9CFFBB]/10 last:border-0">
              <AccordionTrigger className="text-white hover:text-[#9CFFBB] text-left py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
