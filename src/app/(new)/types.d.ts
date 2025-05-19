type Project = {
    id: number
    title: string
    description: string
    href: string
    img: string
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
    description: string
    img?: string
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