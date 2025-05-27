import { PrismaClient } from '@/lib/generated/prisma'

export async function PUT(req: Request) {
  const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

  try {
    const body = await req.json()
    const { id, content, completed } = body

    // Validação do ID
    if (!id) {
      return new Response(JSON.stringify({ 
        message: 'ID do item é obrigatório.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Validação dos campos obrigatórios
    if (content === undefined && completed === undefined) {
      return new Response(JSON.stringify({ 
        message: 'Pelo menos um campo (content ou completed) deve ser fornecido.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Atualiza o item da to-do list
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: {
        ...(content !== undefined && { content }),
        ...(completed !== undefined && { completed }),
      },
      select: {
        id: true,
        content: true,
        completed: true,
        userId: true
      }
    })

    return new Response(JSON.stringify(updatedTodo), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Erro ao atualizar item da to-do list:', error)
    return new Response(JSON.stringify({ 
      message: 'Erro ao atualizar o item. Verifique se o ID está correto.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    await prisma.$disconnect()
  }
}
