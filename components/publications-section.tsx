"use client"

import React from "react"
import { FileText, Download, ExternalLink, Shield, Scale, HelpCircle, Gavel } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

const partyDocuments = [
    {
        title: "Party Constitution",
        description: "The fundamental principles and established precedents according to which SFUP is governed.",
        icon: <Scale className="w-6 h-6 text-secondary" />,
        url: "/documents/constitution.pdf",
        type: "PDF"
    },
    {
        title: "Party Manifesto",
        description: "Our public declaration of policy and aims, especially one issued before an election.",
        icon: <FileText className="w-6 h-6 text-secondary" />,
        url: "/documents/SHIKANA MANIFESTO.pdf",
        type: "PDF"
    },
    {
        title: "Party Ideology",
        description: "The set of ideas and beliefs that guide our political actions and goals.",
        icon: <Shield className="w-6 h-6 text-secondary" />,
        url: "/documents/SHIKANA FRONTLINERS PARTY - IDEOLOGY.pdf", // Using the one with party name in title as it seems official
        type: "PDF"
    },
    {
        title: "Election & Nomination Rules",
        description: "Guidelines and procedures for internal party elections and candidate nominations.",
        icon: <FileText className="w-6 h-6 text-secondary" />,
        url: "/documents/ELECTION AND NOMINATION RULES.pdf",
        type: "PDF"
    }
]

const policyDocuments = [
    {
        title: "FAQ",
        description: "Frequently asked questions about our party, membership, and activities.",
        icon: <HelpCircle className="w-6 h-6 text-primary" />,
        url: "/shared-ui/faq",
        type: "Page"
    },
    {
        title: "Terms & Conditions",
        description: "The legal terms and conditions for using our services and participating in party activities.",
        icon: <FileText className="w-6 h-6 text-primary" />,
        url: "/shared-ui/terms",
        type: "Page"
    },
    {
        title: "Privacy Policy",
        description: "How we collect, use, and protect your personal information.",
        icon: <Shield className="w-6 h-6 text-primary" />,
        url: "/shared-ui/privacy",
        type: "Page"
    }
]

const parliamentBills = [
    {
        title: "Trade Development Bill 2025",
        description: "Proposed legislative changes related to taxation, government spending, and economic policy for the upcoming fiscal year.",
        icon: <Scale className="w-6 h-6 text-secondary" />,
        status: "First Reading",
        url: "/documents/Trade Development Bill 2025.pdf",
    },
    {
        title: "Equal Opportunities Bill",
        description: "A bill aimed at ensuring fair access to employment, education, and resources for all citizens regardless of background.",
        icon: <Gavel className="w-6 h-6 text-secondary" />,
        status: "Committee Stage",
        url: "#",
    },
    {
        title: "Electoral Reform Act",
        description: "Proposed amendments to strengthen the integrity, transparency, and efficiency of the national electoral process.",
        icon: <Shield className="w-6 h-6 text-secondary" />,
        status: "Second Reading",
        url: "#",
    }
]

export function PublicationsSection() {
    return (
        <section className="w-full py-8 md:py-12 bg-background">
            <div className="max-w-6xl mx-auto px-4">

                {/* Party Documents */}
                {/* <div className="mb-20">
                    <div className="flex flex-col mb-10">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Party Documents</h2>
                        <div className="h-1.5 w-20 bg-secondary rounded-full"></div>
                        <p className="text-muted-foreground mt-4 max-w-2xl">
                            Official governance documents that define our structure, values, and vision for the nation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {partyDocuments.map((doc, index) => (
                            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="bg-secondary/10 p-3 rounded-lg flex-shrink-0">
                                        {doc.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-foreground mb-2">{doc.title}</h3>
                                        <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                                            {doc.description}
                                        </p>
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
                                        >
                                            <Download size={18} />
                                            Download {doc.type}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Policy Documents */}
                <div className="mb-20">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Policy & Legal Documents
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Understand our legal framework, privacy commitments, and find answers to common questions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {policyDocuments.map((doc, index) => (
                            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col h-full">
                                    <div className="bg-primary/10 w-fit p-3 rounded-lg mb-4">
                                        {doc.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">{doc.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                        {doc.description}
                                    </p>
                                    <Link href={doc.url}>
                                        <Button variant="outline" className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                                            <ExternalLink size={16} />
                                            View {doc.type}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bills in Parliament */}
                <div>
                    <div className="text-center mb-6">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Bills in Parliament
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Stay informed about active legislative proposals and contribute to the national democratic process.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {parliamentBills.map((bill, index) => (
                            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col h-full">
                                    <div className="bg-secondary/10 w-fit p-3 rounded-lg mb-4">
                                        {bill.icon}
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-foreground">{bill.title}</h3>
                                    </div>
                                    <div className="mb-4">
                                        <span className="text-xs font-semibold px-2 py-1 bg-secondary/20 text-secondary rounded-full">
                                            {bill.status}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                        {bill.description}
                                    </p>
                                    <a href={bill.url} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full gap-2 border-secondary text-secondary hover:bg-secondary hover:text-white">
                                            <FileText size={16} />
                                            Read Full Bill
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
