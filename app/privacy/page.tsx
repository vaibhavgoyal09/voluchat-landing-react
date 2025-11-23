import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - VoluChat",
  description:
    "Learn how VoluChat collects, uses, and protects your data. Our commitment to privacy and data security for Indian Instagram sellers.",
  openGraph: {
    title: "Privacy Policy - VoluChat",
    description: "Learn how VoluChat collects, uses, and protects your data.",
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = "November 23, 2025";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600">Last updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg mb-8">
            <p className="text-slate-700 font-medium mb-0">
              At VoluChat, we take your privacy seriously. This policy explains
              how we collect, use, and protect your personal information.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              1.1 Information You Provide
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>
                <strong>Account Information:</strong> Name, email address, phone
                number, business name
              </li>
              <li>
                <strong>Instagram Account Data:</strong> Instagram username,
                profile information, access tokens
              </li>
              <li>
                <strong>WhatsApp Business Data:</strong> WhatsApp Business
                number and related information
              </li>
              <li>
                <strong>Payment Information:</strong> Billing details (processed
                securely through our payment partners)
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              1.2 Automatically Collected Information
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>
                <strong>Usage Data:</strong> How you interact with our platform,
                features used, time spent
              </li>
              <li>
                <strong>Device Information:</strong> IP address, browser type,
                operating system, device identifiers
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies to enhance your
                experience and analyze usage patterns
              </li>
              <li>
                <strong>Instagram DM Data:</strong> Messages exchanged through
                our automation platform (to provide our service)
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-slate-700 mb-4">We use your information to:</p>
            <ul className="space-y-2 text-slate-700">
              <li>Provide and improve our Instagram automation services</li>
              <li>Process your transactions and send notifications</li>
              <li>Respond to customer inquiries and provide support</li>
              <li>Send important updates about our service</li>
              <li>Analyze usage patterns to improve our platform</li>
              <li>Detect and prevent fraud or unauthorized access</li>
              <li>Comply with legal obligations</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Data Sharing and Disclosure
            </h2>
            <p className="text-slate-700 mb-4">
              We do not sell your personal information. We may share your data
              with:
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              3.1 Service Providers
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>
                <strong>Meta/Instagram:</strong> To provide Instagram automation
                features
              </li>
              <li>
                <strong>WhatsApp Business API:</strong> To enable WhatsApp
                integration
              </li>
              <li>
                <strong>Payment Processors:</strong> To process your payments
                securely
              </li>
              <li>
                <strong>Cloud Hosting:</strong> To store and process your data
                securely
              </li>
              <li>
                <strong>Analytics Providers:</strong> To understand usage
                patterns
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              3.2 Legal Requirements
            </h3>
            <p className="text-slate-700">
              We may disclose your information if required by law, court order,
              or government request, or to protect our rights and safety.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-slate-700 mb-4">
              We implement industry-standard security measures:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>End-to-end encryption for sensitive data</li>
              <li>Secure SSL/TLS connections</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Data backup and disaster recovery</li>
              <li>Compliance with Indian data protection laws</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Data Retention
            </h2>
            <p className="text-slate-700">
              We retain your personal information for as long as necessary to
              provide our services and comply with legal obligations. When you
              delete your account, we will delete or anonymize your personal
              data within 30 days, except where we are required to retain it by
              law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-slate-700 mb-4">You have the right to:</p>
            <ul className="space-y-2 text-slate-700">
              <li>
                <strong>Access:</strong> Request a copy of your personal data
              </li>
              <li>
                <strong>Correction:</strong> Update or correct inaccurate
                information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                data
              </li>
              <li>
                <strong>Portability:</strong> Receive your data in a portable
                format
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Withdraw consent for data
                processing
              </li>
            </ul>
            <p className="text-slate-700 mt-4">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:privacy@voluchat.com"
                className="text-primary-600 hover:text-primary-700"
              >
                privacy@voluchat.com
              </a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Cookies and Tracking
            </h2>
            <p className="text-slate-700 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze site traffic and usage</li>
              <li>Improve our services</li>
            </ul>
            <p className="text-slate-700 mt-4">
              You can control cookies through your browser settings. Note that
              disabling cookies may affect functionality.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Third-Party Links
            </h2>
            <p className="text-slate-700">
              Our platform may contain links to third-party websites. We are not
              responsible for the privacy practices of these sites. We encourage
              you to read their privacy policies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Children's Privacy
            </h2>
            <p className="text-slate-700">
              VoluChat is not intended for users under 18 years of age. We do
              not knowingly collect personal information from children. If you
              believe we have collected information from a child, please contact
              us immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-slate-700">
              Your data may be transferred to and processed in countries outside
              India. We ensure appropriate safeguards are in place to protect
              your data in accordance with this privacy policy and applicable
              laws.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Changes to This Policy
            </h2>
            <p className="text-slate-700">
              We may update this privacy policy from time to time. We will
              notify you of significant changes via email or through our
              platform. Your continued use of VoluChat after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              12. Contact Us
            </h2>
            <p className="text-slate-700 mb-4">
              If you have questions about this privacy policy or our data
              practices, please contact us:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@voluchat.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  privacy@voluchat.com
                </a>
              </p>
              <p className="text-slate-700">
                <strong>Support:</strong>{" "}
                <a
                  href="mailto:support@voluchat.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  support@voluchat.com
                </a>
              </p>
              <p className="text-slate-700">
                <strong>Address:</strong> VoluChat, India
              </p>
            </div>
          </section>

          <div className="bg-slate-100 border border-slate-200 p-6 rounded-lg mt-12">
            <p className="text-sm text-slate-600 mb-0">
              <strong>Note:</strong> This privacy policy is designed to comply
              with Indian data protection laws and international best practices.
              By using VoluChat, you acknowledge that you have read and
              understood this policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
