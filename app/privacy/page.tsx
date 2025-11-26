import { Shield, Eye, Database, Lock, Globe } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <Shield size={28} className="text-[#9CFFBB]" />
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      </div>
      <p className="text-gray-400 mb-8">Last updated: January 2025</p>

      <div className="glass-card rounded-2xl p-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Eye size={20} className="text-[#9CFFBB]" />
            Information We Collect
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            shark.fun is designed with privacy in mind. We collect minimal information:
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#9CFFBB] mt-2 shrink-0" />
              <span>
                <strong>Wallet Address:</strong> Your public Cardano wallet address when you connect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#9CFFBB] mt-2 shrink-0" />
              <span>
                <strong>Transaction Data:</strong> All transactions are public on the Cardano blockchain.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#9CFFBB] mt-2 shrink-0" />
              <span>
                <strong>Usage Analytics:</strong> Anonymous usage data to improve the platform.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Database size={20} className="text-[#9CFFBB]" />
            How We Use Your Data
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#9CFFBB] mt-2 shrink-0" />
              <span>To facilitate token trading and creation on the platform.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#9CFFBB] mt-2 shrink-0" />
              <span>To display your portfolio and transaction history.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#9CFFBB] mt-2 shrink-0" />
              <span>To improve platform performance and user experience.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#9CFFBB] mt-2 shrink-0" />
              <span>To detect and prevent fraudulent activity.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Lock size={20} className="text-[#9CFFBB]" />
            Data Security
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We implement industry-standard security measures to protect your data. However, no method of transmission
            over the Internet is 100% secure. Your wallet security is your responsibility - we never have access to your
            private keys.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Globe size={20} className="text-[#9CFFBB]" />
            Blockchain Data
          </h2>
          <p className="text-gray-300 leading-relaxed">
            All transactions on shark.fun are recorded on the Cardano blockchain. This data is public, permanent, and
            cannot be deleted. By using our platform, you acknowledge that your wallet address and transaction history
            are publicly visible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Your Rights</h2>
          <p className="text-gray-300 leading-relaxed mb-4">You have the right to:</p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#9CFFBB] mt-2 shrink-0" />
              <span>Access the personal data we hold about you.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#9CFFBB] mt-2 shrink-0" />
              <span>Request deletion of off-chain data we store.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#9CFFBB] mt-2 shrink-0" />
              <span>Opt out of analytics tracking.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
          <p className="text-gray-300">
            For privacy inquiries, contact us at{" "}
            <a href="mailto:privacy@shark.fun" className="text-[#9CFFBB] hover:underline">
              privacy@shark.fun
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
