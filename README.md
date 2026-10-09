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
Frontend React
   ↓
Backend Node.js / Express
   ↓
PostgreSQL / Neon

Pluggy
   ↓
Webhook
   ↓
Backend Node.js / Express
```

# Acesso ao ambiente de demonstração

A versão pública do Finance SaaS utiliza o ambiente Sandbox da Pluggy, permitindo testar o fluxo da aplicação sem conectar uma conta bancária real.

Acesse a aplicação em:

https://finances-saas-chi.vercel.app

Para entrar no ambiente de demonstração, utilize:

```text
Email: thiago@email.com
Senha: 123
```

# Próximas evoluções

A versão 1.0 foi desenvolvida com foco em concluir o fluxo principal da aplicação e manter a arquitetura simples o suficiente para fins de aprendizado e portfólio.

As próximas versões poderão incluir melhorias de segurança, infraestrutura, desempenho e novas funcionalidades.

## Segurança

- substituir o armazenamento do JWT em `localStorage` por cookies `HttpOnly`
- utilizar Access Token de curta duração
- implementar Refresh Token
- melhorar o controle de sessão e autenticação

## Infraestrutura e DevOps

- containerizar a aplicação com Docker
- hospedar os serviços em uma VPS própria
- utilizar Coolify para gerenciamento de deploy e infraestrutura
- configurar CI/CD com GitHub Actions
- automatizar testes e deploys
- adicionar monitoramento da aplicação

## Performance

- reduzir consultas repetidas ao banco
- implementar operações em lote durante sincronizações
- otimizar o processo de importação e atualização de transações
- adicionar paginação no histórico de transações

## Integração bancária

- evoluir do ambiente Sandbox para integrações reais via Open Finance
- permitir gerenciamento das conexões bancárias
- melhorar o suporte a diferentes tipos de contas
- tratar cartões de crédito e faturas separadamente

## Novas funcionalidades

- gráficos de receitas e despesas
- planejamento de gastos mensais
- metas financeiras
- gerenciamento mais completo de categorias
- contas manuais
- relatórios financeiros
- melhorias de responsividade e experiência do usuário

Essas evoluções serão implementadas gradualmente, mantendo o projeto como uma base de aprendizado contínuo em desenvolvimento Full Stack, integração com serviços externos e infraestrutura.