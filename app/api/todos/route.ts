// app/api/todos/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma'; // caminho para o seu client do prisma
export async function GET(req: Request) {
  try {
    const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
    // Exemplo: buscar todos os todos, você pode filtrar por usuário depois
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: { id: true, username: true, email: true },
        },
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error('[GET_TODOS_ERROR]', error);
    return NextResponse.json({ error: 'Erro ao buscar tarefas' }, { status: 500 });
  }
}
