import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - VoluChat",
  description:
    "Read VoluChat's terms of service, user agreement, and conditions for using our Instagram automation platform.",
  openGraph: {
    title: "Terms of Service - VoluChat",
    description: "Read VoluChat's terms of service and user agreement.",
  },
};

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600">Last updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg mb-8">
            <p className="text-slate-700 font-medium mb-0">
              Please read these Terms of Service carefully before using
              VoluChat. By accessing or using our service, you agree to be bound
              by these terms.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-700">
              By creating an account, accessing, or using VoluChat ("Service"),
              you agree to be bound by these Terms of Service ("Terms"). If you
              do not agree to these Terms, you may not use our Service. These
              Terms apply to all users, including free trial users and paid
              subscribers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Description of Service
            </h2>
            <p className="text-slate-700 mb-4">
              VoluChat provides Instagram DM automation and WhatsApp Business
              integration services for Indian sellers and D2C brands. Our
              Service includes:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Automated Instagram direct message responses</li>
              <li>Lead qualification and management</li>
              <li>WhatsApp Business integration</li>
              <li>Multi-language support (Hindi and regional languages)</li>
              <li>Analytics and reporting tools</li>
              <li>Customer support</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Eligibility
            </h2>
            <p className="text-slate-700 mb-4">To use VoluChat, you must:</p>
            <ul className="space-y-2 text-slate-700">
              <li>Be at least 18 years old</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>
                Own or have authorization to manage the Instagram and WhatsApp
                Business accounts you connect
              </li>
              <li>Comply with Instagram's and WhatsApp's Terms of Service</li>
              <li>Provide accurate and complete registration information</li>
              <li>
                Not be prohibited from using the Service under applicable laws
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Account Registration and Security
            </h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              4.1 Account Creation
            </h3>
            <p className="text-slate-700">
              You must create an account to use VoluChat. You agree to provide
              accurate, current, and complete information during registration
              and to update such information to keep it accurate and current.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              4.2 Account Security
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials
              </li>
              <li>
                You are responsible for all activities that occur under your
                account
              </li>
              <li>
                You must notify us immediately of any unauthorized access or
                security breach
              </li>
              <li>
                We are not liable for any loss or damage from your failure to
                protect your account
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              4.3 Account Termination
            </h3>
            <p className="text-slate-700">
              We reserve the right to suspend or terminate your account if you
              violate these Terms or engage in fraudulent, abusive, or illegal
              activities.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Acceptable Use Policy
            </h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              5.1 Permitted Use
            </h3>
            <p className="text-slate-700 mb-4">
              You may use VoluChat only for lawful business purposes, including:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Automating customer support on Instagram</li>
              <li>Managing sales inquiries and lead generation</li>
              <li>Providing product information to customers</li>
              <li>Facilitating legitimate business communications</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              5.2 Prohibited Activities
            </h3>
            <p className="text-slate-700 mb-4">You agree NOT to:</p>
            <ul className="space-y-2 text-slate-700">
              <li>
                Send spam, unsolicited messages, or engage in mass messaging
              </li>
              <li>
                Violate Instagram's or WhatsApp's Terms of Service or Community
                Guidelines
              </li>
              <li>
                Use the Service for illegal, fraudulent, or deceptive purposes
              </li>
              <li>Harass, abuse, or harm other users or their customers</li>
              <li>Impersonate any person or entity</li>
              <li>Collect or harvest user data without consent</li>
              <li>
                Attempt to hack, reverse engineer, or compromise our systems
              </li>
              <li>Resell or redistribute our Service without authorization</li>
              <li>Use the Service to send malicious content or malware</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Pricing and Payment
            </h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              6.1 Subscription Plans
            </h3>
            <p className="text-slate-700">
              VoluChat offers various subscription plans with different features
              and pricing. Current pricing is available on our website. We
              reserve the right to change our pricing with 30 days' notice to
              existing subscribers.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              6.2 Free Trial
            </h3>
            <p className="text-slate-700">
              We may offer a free trial period. You will not be charged during
              the trial period. After the trial ends, you will be automatically
              charged unless you cancel before the trial expires.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              6.3 Billing
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>
                Subscription fees are billed in advance on a monthly or annual
                basis
              </li>
              <li>
                All fees are in Indian Rupees (INR) unless otherwise stated
              </li>
              <li>
                Payments are processed through secure third-party payment
                processors
              </li>
              <li>You authorize us to charge your payment method on file</li>
              <li>Failed payments may result in service suspension</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              6.4 Refunds
            </h3>
            <p className="text-slate-700">
              All subscription fees are non-refundable except as required by law
              or as explicitly stated in our refund policy. We may offer refunds
              on a case-by-case basis at our sole discretion.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              6.5 Cancellation
            </h3>
            <p className="text-slate-700">
              You may cancel your subscription at any time. Cancellation will
              take effect at the end of your current billing period. You will
              retain access to the Service until the end of the paid period.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Intellectual Property
            </h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              7.1 Our Rights
            </h3>
            <p className="text-slate-700">
              VoluChat and all related content, features, and functionality are
              owned by us and are protected by copyright, trademark, and other
              intellectual property laws. You may not copy, modify, distribute,
              or create derivative works without our written permission.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              7.2 Your Content
            </h3>
            <p className="text-slate-700">
              You retain ownership of all content you create or upload to
              VoluChat. By using our Service, you grant us a limited license to
              use, store, and process your content solely to provide the
              Service.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              7.3 Feedback
            </h3>
            <p className="text-slate-700">
              If you provide feedback, suggestions, or ideas about VoluChat, we
              may use them without any obligation to you.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Third-Party Services
            </h2>
            <p className="text-slate-700 mb-4">
              VoluChat integrates with third-party services including Instagram
              and WhatsApp. Your use of these integrations is subject to their
              respective terms of service:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Instagram Terms of Service and Community Guidelines</li>
              <li>WhatsApp Business Terms of Service</li>
              <li>Meta Platform Terms</li>
            </ul>
            <p className="text-slate-700 mt-4">
              We are not responsible for any changes, interruptions, or issues
              with third-party services. You are responsible for complying with
              all third-party terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Disclaimers and Limitations of Liability
            </h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              9.1 Service Availability
            </h3>
            <p className="text-slate-700">
              VoluChat is provided "as is" and "as available." We do not
              guarantee uninterrupted, error-free, or secure service. We may
              modify, suspend, or discontinue the Service at any time.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              9.2 No Warranties
            </h3>
            <p className="text-slate-700">
              We make no warranties, express or implied, regarding the Service,
              including warranties of merchantability, fitness for a particular
              purpose, or non-infringement.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              9.3 Limitation of Liability
            </h3>
            <p className="text-slate-700">
              To the maximum extent permitted by law, VoluChat shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including loss of profits, data, or business
              opportunities, arising from your use of the Service.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              9.4 Maximum Liability
            </h3>
            <p className="text-slate-700">
              Our total liability to you for any claims arising from these Terms
              or your use of the Service shall not exceed the amount you paid us
              in the 12 months preceding the claim.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Indemnification
            </h2>
            <p className="text-slate-700">
              You agree to indemnify, defend, and hold harmless VoluChat, its
              officers, directors, employees, and agents from any claims,
              liabilities, damages, losses, or expenses arising from:
            </p>
            <ul className="space-y-2 text-slate-700 mt-4">
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your use or misuse of the Service</li>
              <li>Your content or business activities</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Data Protection and Privacy
            </h2>
            <p className="text-slate-700">
              Your use of VoluChat is subject to our Privacy Policy, which is
              incorporated into these Terms by reference. Please review our
              Privacy Policy to understand how we collect, use, and protect your
              data.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              12. Modifications to Terms
            </h2>
            <p className="text-slate-700">
              We reserve the right to modify these Terms at any time. We will
              notify you of material changes via email or through the Service.
              Your continued use of VoluChat after changes constitutes
              acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              13. Governing Law and Dispute Resolution
            </h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              13.1 Governing Law
            </h3>
            <p className="text-slate-700">
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              13.2 Dispute Resolution
            </h3>
            <p className="text-slate-700">
              Any disputes arising from these Terms or your use of VoluChat
              shall be resolved through binding arbitration in accordance with
              Indian arbitration laws. The arbitration shall be conducted in
              English in India.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              13.3 Jurisdiction
            </h3>
            <p className="text-slate-700">
              You agree to submit to the exclusive jurisdiction of the courts
              located in India for any disputes that cannot be resolved through
              arbitration.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              14. Miscellaneous
            </h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              14.1 Entire Agreement
            </h3>
            <p className="text-slate-700">
              These Terms, together with our Privacy Policy, constitute the
              entire agreement between you and VoluChat regarding the Service.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              14.2 Severability
            </h3>
            <p className="text-slate-700">
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions shall remain in full force
              and effect.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              14.3 Waiver
            </h3>
            <p className="text-slate-700">
              Our failure to enforce any right or provision of these Terms shall
              not constitute a waiver of such right or provision.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
              14.4 Assignment
            </h3>
            <p className="text-slate-700">
              You may not assign or transfer these Terms without our written
              consent. We may assign these Terms without restriction.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              15. Contact Information
            </h2>
            <p className="text-slate-700 mb-4">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:legal@voluchat.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  legal@voluchat.com
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
              <strong>Acknowledgment:</strong> By using VoluChat, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
