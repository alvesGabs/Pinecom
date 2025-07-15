# Pinecom

É um aplicativo de e-commerce simples e elegante, desenvolvido com **React Native**. O projeto simula uma loja online com funcionalidades essenciais, como visualização de produtos, carrinho de compras e finalização de pedidos.

## Funcionalidades

- Listagem de produtos com imagens e nome
- Visualização dos detalhes do produto
- Adição de produtos ao carrinho
- Visualização do carrinho com imagens dos itens adicionados
- Finalização da compra com tela de confirmação
- Limpeza do carrinho após a compra
- Navegação intuitiva entre as telas usando Expo Router
- Ícones e interface estilizada com tema escuro
- Llama (assistente de IA para suporte ao desenvolvimento)

## Tecnologias utilizadas

- React Native
- Expo
- Expo Router
- Context API (para gerenciamento do carrinho)
- Python
- TypeScript ou JavaScript
- Ícones do Expo Vector Icons (Ionicons)

## Estrutura de pastas

pinecom/
backend/
|── ai
|    ├── ...
|── api
|    ├── ...
|── db
|    ├── ...
frontend/
├── app/
│ ├── (tabs)/home.tsx
│ ├── detalhes/
│ │ ├── index.tsx
│ │ └── contextoCarrinho.tsx
│ ├── editar/
│ │ ├── chat.tsx
│ │ └── compra.tsx
│ └── carrinho.tsx
├── assets/
├── components/
├── App.tsx
├── package.json
└── ...

## Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/alvesGabs/Pinecom.git
   cd pinecom
