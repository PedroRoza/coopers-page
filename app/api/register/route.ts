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
    const { email, username, password } = body

    if (!email || !username || !password) {
      return new Response(
        JSON.stringify({ message: 'Todos os campos são obrigatórios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Verificar se já existe usuário com mesmo email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'E-mail já cadastrado.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    })

    return new Response(
      JSON.stringify({ message: 'Usuário criado com sucesso', userId: user.id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  } finally {
    await prisma.$disconnect()
  }
}
