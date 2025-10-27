# URL Shortener Frontend

Este é o **frontend** do projeto **URL Shortener**, desenvolvido em **React + Vite + TypeScript**, com o objetivo de consumir a API de encurtamento de URLs e apresentar suas principais funcionalidades de forma simples e funcional.

---

## Funcionalidades

O frontend permite interagir com as três operações principais da API:

1. **Encurtar URL (Shorten URL)**  
   O usuário informa uma URL original e opcionalmente um _alias_ personalizado.

   - Se o alias já existir, a API retorna um erro.
   - Caso contrário, é criada uma nova URL encurtada.

2. **Buscar e Redirecionar (Retrieve URL)**  
   O usuário insere um _alias_ existente e é redirecionado para a URL original.

3. **Listar Top 10 URLs (Top URLs)**  
   Exibe as 10 URLs mais acessadas, mostrando a contagem total de acessos.

---

## Arquitetura

A aplicação foi estruturada com base em **componentização** e **hooks personalizados (custom hooks)** para melhor organização, separando lógica de apresentação.

### Estrutura de Pastas

```bash
src/
├── components/
│   ├── ShortenUrl.tsx
│   ├── RetrieveUrl.tsx
│   └── TopUrls.tsx
├── hooks/
│   ├── useShortenUrl.ts
│   ├── useRetrieveUrl.ts
│   └── useTopUrls.ts
├── App.tsx
├── App.css
└── main.tsx
```

Essa estrutura garante clareza, reutilização e testabilidade do código.

## Tecnologias Utilizadas

- Vite – Build rápido e leve para projetos React
- React – Framework de UI
- TypeScript – Tipagem estática para mais segurança
- CSS Puro – Estilização simples e funcional

## Como Executar o Projeto

- Instalar dependências
  npm install

- Rodar o servidor local
  npm run dev

A aplicação será executada em:

http://localhost:5173

## Integração com o Backend

O frontend consome a API hospedada localmente.
Certifique-se de que o backend está rodando em http://localhost:3000.

Endpoints consumidos:

Método Rota Descrição

(`PUT /create`) Cria uma URL encurtada
(`GET /u/:alias`) Redireciona para a URL original
(`GET /top`) Retorna as 10 URLs mais acessadas

Caso o backend use outra URL, atualize as chamadas fetch() dentro dos hooks em src/hooks/.

## Hooks Personalizados

- useShortenUrl Lida com a criação de novas URLs encurtadas
- useRetrieveUrl Gerencia a busca e redirecionamento de aliases
- useTopUrls Obtém e exibe as 10 URLs mais acessadas

Essa abordagem melhora a manutenção e separação de responsabilidades.

## Layout

A interface foi construída com foco em simplicidade e clareza, mantendo uma estrutura visual organizada:

Container centralizado

Campos de input com espaçamento

Botões de ação diretos

Tabela limpa para exibir as URLs mais acessadas

## Boas Práticas Seguidas

Separação entre lógica e apresentação (hooks + components)

Modularização e reutilização de código

Consumo de API assíncrono com fetch e async/await

Uso de tipagem com TypeScript

Estrutura limpa e de fácil leitura
