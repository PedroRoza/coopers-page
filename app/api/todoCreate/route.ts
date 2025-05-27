import { PrismaClient } from '@/lib/generated/prisma'

export async function POST(req: Request) {
  const prisma = new PrismaClient()

  try {
    const body = await req.json()
    const { content, completed, userId } = body

    // Validação dos campos obrigatórios
    if (!content || userId === undefined) {
      return new Response(JSON.stringify({ 
        message: 'Conteúdo e ID do usuário são obrigatórios.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Cria o novo item da to-do list
    const newTodo = await prisma.todo.create({
      data: {
        content,
        completed: completed ?? false, // Default para false se não fornecido
        userId
      },
      select: {
        id: true,
        content: true,
        completed: true,
        userId: true
      }
    })

    return new Response(JSON.stringify(newTodo), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Erro ao criar item da to-do list:', error)
    return new Response(JSON.stringify({ 
      message: 'Erro ao criar o item. Verifique se o usuário existe.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    await prisma.$disconnect()
  }
}