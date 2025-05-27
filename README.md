## 🚀 Como Iniciar

Siga os passos abaixo para clonar e executar o projeto localmente:

```bash
# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm run dev
```

---

## 🧩 Tecnologias Utilizadas

Este projeto utiliza uma combinação de ferramentas, frameworks e bibliotecas modernas, cada uma com seu propósito específico:

### 🔧 Frameworks e Ferramentas Principais

- **Next.js**  
  Framework baseado em React que permite renderização híbrida (SSR e SSG), além de possuir API Routes para backend. Usado como base principal do projeto.

- **TypeScript**  
  Superset do JavaScript que adiciona tipagem estática opcional, ajudando a evitar bugs e a melhorar a legibilidade do código.

- **Tailwind CSS**  
  Framework utilitário de CSS para estilização rápida, responsiva e customizável, direto nas classes do HTML.

- **Prisma ORM**  
  ORM (Object-Relational Mapper) moderno e eficiente que permite mapear o banco de dados em objetos TypeScript.

- **Supabase**  
  Plataforma de backend como serviço (BaaS) que oferece banco de dados PostgreSQL, autenticação, armazenamento e APIs em tempo real. Integra-se facilmente com o Prisma.

- **Nodemailer**  
  Biblioteca Node.js para envio de e-mails via protocolo SMTP. Usada neste projeto para enviar os dados do formulário para um e-mail de destino.

---

## 💻 Estrutura do Projeto

```
/
├── pages/              # Rotas do Next.js
│   ├── api/            # Rotas de API (ex: envio de e-mail)
│   └── index.tsx       # Página principal com o formulário
├── components/         # Componentes reutilizáveis
├── styles/             # Estilos globais e configuração do Tailwind
├── prisma/             # Schemas e migrações do banco de dados
├── utils/              # Funções auxiliares (ex: validação de dados)
├── .env.local          # Variáveis de ambiente
└── README.md
```


---

## 📦 Requisitos

- Node.js 22+
- PNPM (você pode instalar com `npm i -g pnpm`)
- Conta no Supabase
- Conta de e-mail com SMTP habilitado (ex: Gmail, Outlook, etc.)

---

## 📬 Funcionalidades

- Validação de campos do formulário
- Envio de mensagens via e-mail
- Integração com banco de dados PostgreSQL (via Supabase)
- Estilização moderna com Tailwind CSS
- Código modular e tipado com TypeScript
