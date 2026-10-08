# Finance SaaS

Finance SaaS é uma aplicação web de gestão financeira pessoal que permite acompanhar contas, saldos e transações em um único lugar.

O projeto foi desenvolvido com React, Node.js, Express e PostgreSQL, utilizando a Pluggy para integração bancária via Open Finance em ambiente Sandbox. A aplicação também utiliza autenticação com JWT, sincronização automática através de webhooks e persistência dos dados em banco PostgreSQL.

O projeto foi construído principalmente como um projeto de portfólio e aprendizado, com o objetivo de aprofundar conhecimentos em desenvolvimento Full Stack, APIs, autenticação, bancos de dados, integração com serviços externos e deploy de aplicações.

---

## Tecnologias utilizadas

### Frontend

- React
- Vite
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express
- JWT
- bcrypt
- Pluggy SDK

### Banco de dados

- PostgreSQL
- Neon

### Deploy

- Vercel — Frontend
- Render — Backend
- Neon — PostgreSQL

---

# Versão 1.0

A versão 1.0 implementa o fluxo principal de uma aplicação de gestão financeira integrada a dados bancários.

Entre as funcionalidades disponíveis estão:

- Cadastro e login de usuários
- Autenticação utilizando JWT
- Senhas armazenadas utilizando bcrypt
- Rotas protegidas no backend
- Conexão bancária através da Pluggy
- Integração utilizando o ambiente Sandbox da Pluggy
- Sincronização de contas bancárias
- Sincronização de transações
- Armazenamento das informações no PostgreSQL
- Prevenção de duplicação de transações durante sincronizações
- Atualização automática dos dados bancários através de Webhooks
- Sincronização manual dos dados como alternativa ao Webhook
- Visualização do saldo atual
- Visualização do saldo individual das contas
- Cálculo das receitas do mês
- Cálculo das despesas do mês
- Cálculo do resultado financeiro mensal
- Cadastro manual de transações
- Exibição das transações mais recentes no Dashboard
- Página com histórico completo de transações
- Filtro de transações por período
- Filtro por conta
- Filtro por categoria

O fluxo principal da aplicação funciona da seguinte maneira:

```text
Pluggy
   ↓
Webhook
   ↓
Backend Node.js / Express
   ↓
PostgreSQL / Neon
   ↓
Frontend React