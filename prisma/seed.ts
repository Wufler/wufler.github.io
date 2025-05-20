import { PrismaClient } from "./client"
const prisma = new PrismaClient()

async function main() {
    await prisma.projects.createMany({
        data: [
            {
                title: 'ZeroNetwork',
                subtitle: 'Minecraft Server',
                description: 'Minecraft Server',
                images: ['https://wolfey.s-ul.eu/oTDF5P9b', 'https://wolfey.s-ul.eu/oTDF5P9b'],
                href: 'https://zeronetwork.wolfey.me',
                category: '2025',
                visible: true,
                status: ['new'],
                tags: ['Next.js', 'Tailwind CSS', 'TypeScript']
            },
            {
                title: 'ZeroNetwork',
                subtitle: 'Minecraft Server',
                description: 'Long text here to test because this is a long text',
                images: ['https://wolfey.s-ul.eu/oTDF5P9b'],
                href: 'https://zeronetwork.wolfey.me',
                category: '2025',
                visible: true,
                status: [],
                tags: ['Next.js']
            },
            {
                title: 'Free Games',
                subtitle: 'Free Epic Games',
                description: 'Free Epic Games',
                images: ['https://wolfey.s-ul.eu/MdoL9N34'],
                href: 'https://egfreegames.vercel.app/',
                category: '2024',
                visible: true,
                status: ['outdated', 'updated'],
                tags: ['Next.js', 'Tailwind CSS', 'TypeScript']
            }
        ]
    })

    await prisma.builds.createMany({
        data: [
            {
                title: 'Portfolio',
                description: 'Revamp',
                img: 'https://wolfey.s-ul.eu/oTDF5P9b',
                status: ['completed'],
                tags: ['Next.js', 'Tailwind'],
                visible: true
            },
            {
                title: 'ZeroNetwork',
                description: 'Minecraft Server',
                img: 'https://wolfey.s-ul.eu/oTDF5P9b',
                status: ['wip'],
                tags: ['Next.js', 'Tailwind'],
                visible: true
            },
        ]
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })