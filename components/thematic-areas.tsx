'use client'

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, TrendingUp, Briefcase, Building2 } from "lucide-react"
import { motion } from "motion/react"
import { themes } from "@/lib/themes-data"

const iconMap: Record<string, any> = {
    Users: Users,
    Briefcase: Briefcase,
    Building2: Building2,
}

export function ThematicAreas() {
    return (
        <section className="py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-foreground mb-4"
                    >
                        Thematic Areas
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Our strategic focus areas for transforming Kenya into a prosperous, inclusive, and well-governed nation.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {themes.map((theme, index) => {
                        const Icon = iconMap[theme.icon] || Users

                        return (
                            <motion.div
                                key={theme.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full p-8 hover:shadow-lg transition-shadow border-none shadow-md bg-muted/10 flex flex-col">
                                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-2 text-secondary">
                                        <Icon size={32} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-foreground mb-2">{theme.title}</h3>
                                    <p className="text-muted-foreground mb-2 flex-grow">{theme.description}</p>

                                    <Link href={`/shared-ui/themes/${theme.slug}`}>
                                        <Button variant="outline" className="group text-secondary border-secondary hover:bg-secondary hover:text-white">
                                            Read More
                                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
