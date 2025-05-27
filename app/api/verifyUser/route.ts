import { PrismaClient } from '@/lib/generated/prisma'

export async function POST(req: Request) {
  const prisma = new PrismaClient()

  try {
    const body = await req.json()
    const { username, email } = body

    if (!username && !email) {
      return new Response(
        JSON.stringify({ message: 'É necessário fornecer username ou email.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (username) {
      const existingUser = await prisma.user.findUnique({ where: { username } })
      if (existingUser) {
        return new Response(
          JSON.stringify({ exists: true }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }

    if (email) {
      const existingEmail = await prisma.user.findUnique({ where: { email } })
      if (existingEmail) {
        return new Response(
          JSON.stringify({ exists: true }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }

    return new Response(
      JSON.stringify({ exists: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error("Erro na verificação:", error)
    return new Response(
      JSON.stringify({ message: "Erro interno do servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  } finally {
    await prisma.$disconnect()
  }
}
