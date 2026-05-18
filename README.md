# Briefing da Agência

Sistema de briefing online multi-cliente. Cada cliente acessa um link único, preenche no ritmo dele (salva sozinho no navegador), e quando termina tu recebes tudo bonitinho por e-mail.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** pra estilo
- **Resend** pra enviar e-mails (grátis 100/dia)
- **Vercel** pra hospedar (grátis)
- **localStorage** pra salvar progresso (sem banco de dados)

## Como rodar localmente

```bash
npm install
cp .env.example .env.local
# preenche .env.local com tuas chaves
npm run dev
```

Abre `http://localhost:3000/koala` no navegador.

## Como fazer deploy (20 min)

### 1. Cria conta no Resend (5 min)

1. Vai em [resend.com](https://resend.com) e cria conta grátis
2. Em **API Keys**, clica em **Create API Key** → copia a chave (`re_...`)
3. **Importante**: enquanto não tens domínio próprio, podes enviar usando `onboarding@resend.dev` como remetente. Pra ter `briefing@suaagencia.com`, precisa verificar domínio em **Domains** (5 min com DNS).

### 2. Sobe pro GitHub (5 min)

```bash
git init
git add .
git commit -m "primeiro commit"
# cria um repo novo no github.com (privado)
git remote add origin https://github.com/SEU-USUARIO/briefing-agencia.git
git push -u origin main
```

### 3. Deploy no Vercel (5 min)

1. Vai em [vercel.com](https://vercel.com) e loga com GitHub
2. **Add New** → **Project** → seleciona o repo `briefing-agencia`
3. Em **Environment Variables**, adiciona:
   - `RESEND_API_KEY` = a chave que copiaste do Resend
   - `RESEND_FROM` = `onboarding@resend.dev` (ou teu domínio quando verificar)
   - `AGENCY_EMAIL` = o e-mail que vai receber os briefings (ex: `voce@suaagencia.com.br`)
4. Clica em **Deploy**

Pronto. Em ~1 minuto tu tens `https://briefing-agencia.vercel.app/koala`.

### 4. (Opcional) Conecta teu domínio (5 min)

1. No Vercel, dentro do projeto → **Settings** → **Domains**
2. Adiciona `briefing.suaagencia.com.br`
3. Vercel te dá um registro DNS pra adicionar no painel do teu domínio
4. Em ~10 min propaga e tu mandas `https://briefing.suaagencia.com.br/koala` pro cliente

## Como adicionar um novo cliente

É só 3 passos:

1. **Duplica** o arquivo `data/koala.ts` → renomeia pra `data/nome-do-cliente.ts`
2. **Edita** o arquivo: muda `slug`, `clientName`, `clientCity`, e adapta as perguntas
3. **Registra** em `data/index.ts`:

```ts
import { koala } from "@/data/koala";
import { novoCliente } from "@/data/novo-cliente";

export const briefings: Briefing[] = [koala, novoCliente];
```

Faz `git push` e em 1 min tá no ar em `/novo-cliente`.

## Estrutura

```
briefing-agencia/
├── app/
│   ├── [slug]/page.tsx       # página dinâmica de cada cliente
│   ├── api/submit/route.ts   # endpoint que envia o e-mail
│   ├── globals.css           # estilos globais
│   ├── layout.tsx
│   └── page.tsx              # home com lista de briefings
├── components/
│   └── BriefingForm.tsx      # componente principal
├── data/
│   ├── index.ts              # registro de clientes
│   └── koala.ts              # briefing da Koala
├── lib/
│   └── types.ts
└── package.json
```

## Como funciona o "salvamento automático"

- O cliente vai preenchendo, e cada campo é salvo no **localStorage do navegador dele** depois de 400ms sem digitar.
- Aparece um "salvo ✓" verde discreto pra ele saber.
- Se fechar o navegador e voltar **no mesmo navegador**, as respostas ainda estão lá.
- **Atenção**: se ele começar no celular e abrir no PC depois, não vê o progresso. Pra esse caso, ele clica em "Enviar" no primeiro device e tu recebes parcial — daí tu sabes que ele continuou em outro lugar.

## Como tu recebes o briefing

Quando o cliente clica em **Enviar briefing**, tu recebes um e-mail no `AGENCY_EMAIL` configurado, com:

- Nome, e-mail e WhatsApp do cliente
- Quantas respostas ele preencheu (78 de 78, ou parcial)
- Todas as respostas organizadas por seção, com bullet pra cada pergunta
- O **reply-to** é o e-mail do cliente, então se tu apertar "responder" no e-mail, vai direto pra ele

## Custos

- **Vercel**: grátis pra esse volume de uso
- **Resend**: grátis até 100 e-mails/dia (mais que suficiente)
- **Domínio**: ~R$ 40/ano se quiser próprio (ex: `briefing.suaagencia.com.br`)

Total: **R$ 0/mês** se usar `*.vercel.app`, ou ~R$ 40/ano com domínio próprio.

## Próximos passos (futuro)

- [ ] Adicionar Supabase pra salvar respostas no banco (sincroniza entre devices)
- [ ] Painel admin pra ver todos os briefings recebidos
- [ ] Exportação pra PDF/CSV depois de receber
- [ ] Login pra cada cliente
