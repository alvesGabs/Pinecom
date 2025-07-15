import React, { createContext, useContext, useState } from 'react';

type Produto = {
  id: string;
  nome: string;
  imagem: string;
};

type CartContextType = {
  carrinho: Produto[];
  adicionarProduto: (produto: Produto) => void;
  limparCarrinho: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const adicionarProduto = (produto: Produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CartContext.Provider value={{ carrinho, adicionarProduto, limparCarrinho }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
};