import { AlertTriangle, TrendingDown, Scale, AlertCircle } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle size={28} className="text-yellow-400" />
        <h1 className="text-3xl font-bold text-white">Risk Disclaimer</h1>
      </div>
      <p className="text-gray-400 mb-8">Please read this carefully before using shark.fun</p>

      <div className="glass-card rounded-2xl p-8 space-y-8">
        {/* Warning Banner */}
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30">
          <div className="flex items-start gap-4">
            <AlertCircle size={32} className="text-red-400 shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">High Risk Investment Warning</h2>
              <p className="text-gray-300">
                Meme tokens are extremely high-risk, speculative investments. You could lose 100% of your investment.
                Only invest money you can afford to lose completely.
              </p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingDown size={20} className="text-red-400" />
            Investment Risks
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
              <span>
                <strong>Extreme Volatility:</strong> Meme token prices can drop 90%+ in minutes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
              <span>
                <strong>No Intrinsic Value:</strong> Most meme tokens have no underlying utility or value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
              <span>
                <strong>Liquidity Risk:</strong> You may not be able to sell your tokens at desired prices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
              <span>
                <strong>Smart Contract Risk:</strong> Code bugs could result in loss of funds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
              <span>
                <strong>Rug Pulls:</strong> Token creators may abandon projects after taking funds.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Scale size={20} className="text-[#9CFFBB]" />
            Not Financial Advice
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Nothing on shark.fun constitutes financial, investment, legal, or tax advice. We do not recommend any
            specific tokens or trading strategies. Always do your own research (DYOR) and consult with qualified
            professionals before making investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Regulatory Notice</h2>
          <p className="text-gray-300 leading-relaxed">
            Cryptocurrency regulations vary by jurisdiction. It is your responsibility to ensure that using shark.fun
            and trading meme tokens is legal in your country. shark.fun does not guarantee compliance with any
            regulatory requirements in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Acknowledgment</h2>
          <div className="p-4 rounded-xl bg-[#9CFFBB]/10 border border-[#9CFFBB]/30">
            <p className="text-gray-300">
              By using shark.fun, you acknowledge that you have read, understood, and accepted this risk disclaimer. You
              confirm that you are trading at your own risk and that shark.fun bears no responsibility for any losses
              you may incur.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
