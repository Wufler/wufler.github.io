export type Project = {
    id: number
    title: string
    subtitle: string | null
    href: string | null
    images: string[]
    status: string[]
    tags: string[]
    visible: boolean
    category: string
    createdAt: Date
    updatedAt: Date
}