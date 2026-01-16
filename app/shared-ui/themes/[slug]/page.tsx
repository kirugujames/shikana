import { use } from "react"
import { notFound } from "next/navigation"
import { themes } from "@/lib/themes-data"
import { ThemeDetail } from "@/components/theme-detail"

type Props = {
    params: Promise<{ slug: string }>
}

export default function ThemePage({ params }: Props) {
    const { slug } = use(params)
    const theme = themes.find((t) => t.slug === slug)

    if (!theme) {
        notFound()
    }

    return <ThemeDetail theme={theme} />
}
