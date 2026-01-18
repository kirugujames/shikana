"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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

                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">Terms and Conditions</h1>

                <div className="prose prose-slate max-w-none space-y-8 text-foreground/80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                        <p>
                            Welcome to the official website of the Shikana Frontliners for Unity Party (SFUP). By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">2. Membership and Participation</h2>
                        <p>
                            Membership in the Shikana Frontliners for Unity Party is subject to the party's constitution and applicable Kenyan laws. By registering as a member or participant, you affirm that:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>You are a Kenyan citizen of sound mind.</li>
                            <li>You are above the age of 18 years (for full membership).</li>
                            <li>You are not a member of another political party.</li>
                            <li>You subscribe to the vision, mission, and values of SFUP.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Information</h2>
                        <p>
                            All content provided on this website is for informational purposes related to the party's activities, policies, and candidates. Unauthorized use of the party's logo, branding, or copyrighted material is strictly prohibited.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">4. User Conduct</h2>
                        <p>
                            When interacting with our platform, you agree not to:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Post or transmit any unlawful, threatening, abusive, or defamatory content.</li>
                            <li>Attempt to gain unauthorized access to our systems or user accounts.</li>
                            <li>Engage in any activity that disrupts the website's functionality.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">5. Disclaimer</h2>
                        <p>
                            SFUP makes every effort to ensure the accuracy of the information on this website but does not guarantee it. The party is not liable for any direct or indirect damages arising from the use of this website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">6. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms and Conditions at any time. Your continued use of the website following such changes constitutes your acceptance of the new terms.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-border">
                        <p className="text-sm">
                            Last Updated: January 13, 2026
                        </p>
                        <p className="text-sm mt-2">
                            For any questions regarding these terms, please contact us at <a href="mailto:info@shikana.co.ke" className="text-secondary font-semibold">info@shikana.co.ke</a>.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    )
}
