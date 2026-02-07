"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
    return (
        <main className="w-full min-h-screen bg-background">
            <Header />

            <div className="max-w-4xl mx-auto px-4 py-20">
                <Link href="/">
                    <Button variant="ghost" className="mb-8 gap-2">
                        <ChevronLeft size={16} />
                        Back to Home
                    </Button>
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-secondary/10 p-3 rounded-xl">
                        <ShieldCheck size={32} className="text-secondary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">Privacy Policy</h1>
                </div>

                <div className="prose prose-slate max-w-none space-y-8 text-foreground/80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">1. Data Collection</h2>
                        <p className="mb-4">
                            Shikana Frontliners for Unity Party (SFUP) is committed to protecting your privacy. We collect personal information that you voluntarily provide to us when you register as a member, apply for an aspirant position, or contact us. The types of data we collect include:
                        </p>
                        <div className="space-y-4 pl-4 border-l-2 border-secondary/20">
                            <div>
                                <h3 className="font-semibold text-foreground">Personal Identification</h3>
                                <p className="text-sm text-foreground/80">First Name, Last Name, Date of Birth, Gender, National ID or Passport Number.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Contact Information</h3>
                                <p className="text-sm text-foreground/80">Email Address, Phone Number, Postal Address, Postal Code.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Demographic & Social Data</h3>
                                <p className="text-sm text-foreground/80">Religion, Ethnicity/Tribe.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Location & Voting Details</h3>
                                <p className="text-sm text-foreground/80">County, Constituency, Ward, Polling Station, Street/Village.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Membership Information</h3>
                                <p className="text-sm text-foreground/80">Membership Status, Membership Type, Payment Details (Method, Phone Number), Referral/Local Leader.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Special Categories</h3>
                                <p className="text-sm text-foreground/80">Disability Status (PWD), NCPWD Number, Special Interest Group (Youth, Women, Marginalized).</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Political Aspirant Data</h3>
                                <p className="text-sm text-foreground/80">Elective Position sought (e.g., President, Governor, MP, MCA).</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Communication Data</h3>
                                <p className="text-sm text-foreground/80">Subject and detailed message content submitted via our contact forms.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of Data</h2>
                        <p>
                            We use the collected information to:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Manage party membership and communications.</li>
                            <li>Send updates about party activities and news.</li>
                            <li>Process applications and event registrations.</li>
                            <li>Verify identity for official party purposes.</li>
                            <li>Improve our website and services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Retention</h2>
                        <p>
                            We retain your personal data for as long as you are actively involved with the party. To ensure data accuracy and protect your privacy, we implement a data deletion policy where user data is permanently deleted after 1 year if the user is no longer involved in the party or has been inactive for that period.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Protection</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or alteration. Access to personal data is restricted to authorized party officials who need the information to perform their duties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Sharing</h2>
                        <p>
                            SFUP does not sell or rent your personal information to third parties. We may share your information with service providers who assist us in our operations, or when required by law to comply with legal processes or government requests.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
                        <p>
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Access the personal information we hold about you.</li>
                            <li>Request the correction of inaccurate information.</li>
                            <li>Request the deletion of your data (subject to legal and constitutional requirements).</li>
                            <li>Opt-out of marketing communications at any time.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">7. Cookies</h2>
                        <p>
                            Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, although this may affect some website functionalities.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-border">
                        <p className="text-sm">
                            Last Updated: January 19, 2026
                        </p>
                        <p className="text-sm mt-2">
                            If you have any questions about this Privacy Policy, please reach out to our Data Protection Officer at <a href="mailto:info@shikana.co.ke" className="text-secondary font-semibold">privacy@shikana.co.ke</a>.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    )
}
