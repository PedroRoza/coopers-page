import { PrismaClient } from '@/lib/generated/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

  try {
    const body = await req.json()
    const { username, password } = body

    if (!username || !password) {
      return new Response(JSON.stringify({ message: 'Username e senha são obrigatórios.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const user = await prisma.user.findUnique({ where: { username } })

    if (!user || !user.password) {
      return new Response(JSON.stringify({ message: 'Usuário ou senha inválidos.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return new Response(JSON.stringify({ message: 'Usuário ou senha inválidos.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Remove senha antes de retornar
    const { password: _, ...userWithoutPassword } = user

    return new Response(JSON.stringify(userWithoutPassword), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Erro no login:', error)
    return new Response(JSON.stringify({ message: 'Erro interno no servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    await prisma.$disconnect()
  }
}
