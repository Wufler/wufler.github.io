type Project = {
    id: number
    title: string
    subtitle: string | null
    description: string | null
    href: string | null
    images: string[]
    status: string[]
    tags: string[]
    visible: boolean
    category: string
    createdAt: Date
    updatedAt: Date
}

type Build = {
    id: number
    title: string
    description: string | null
    img: string | null
    status: string[]
    tags: string[]
    visible: boolean
    createdAt: Date
    updatedAt: Date
}

type Container = {
    children: React.ReactNode
    showMenu: boolean
    isSecondary?: boolean
    otherMenuOpen?: boolean
    isFullscreen?: boolean
}

type Projects = {
    projects: Project[]
    handleProjectClick: () => void
    playMoveSound: () => void
    isFullscreen?: boolean
    onFullscreenChange?: (isFullscreen: boolean) => void
}

type ButtonsProps = {
    icon: React.ComponentType<{ isAnimating?: boolean }>
    onClick: () => void
    name: string
}