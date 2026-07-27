import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: string; nome: string; preco: number; quantidade?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantidade: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] };

interface CartContextType {
  items: CartItem[];
  total: number;
  totalItems: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
  addItem: (product: { id: string; nome: string; preco: number }, quantidade?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantidade: number) => void;
  clearCart: () => void;
  checkoutWhatsApp: () => void;
}

const SESSION_STORAGE_KEY = 'experiencia_posicao_cart';

function getInitialState(): CartState {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return { items: parsed };
      }
    }
  } catch (err) {
    console.error('Error reading cart from sessionStorage:', err);
  }
  return { items: [] };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const qtyToAdd = action.payload.quantidade || 1;
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantidade: updatedItems[existingIndex].quantidade + qtyToAdd,
        };
        return { items: updatedItems };
      }

      return {
        items: [
          ...state.items,
          {
            id: action.payload.id,
            nome: action.payload.nome,
            preco: action.payload.preco,
            quantidade: qtyToAdd,
          },
        ],
      };
    }

    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantidade <= 0) {
        return {
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      return {
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantidade: action.payload.quantidade }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return { items: [] };
    }

    case 'SET_CART': {
      return { items: action.payload };
    }

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync with sessionStorage on state changes
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state.items));
    } catch (err) {
      console.error('Error saving cart to sessionStorage:', err);
    }
  }, [state.items]);

  const total = state.items.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const totalItems = state.items.reduce((acc, item) => acc + item.quantidade, 0);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const addItem = (product: { id: string; nome: string; preco: number }, quantidade = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantidade } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantidade: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantidade } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const checkoutWhatsApp = () => {
    if (state.items.length === 0) return;

    const WHATSAPP_NUM = (import.meta as any).env.VITE_WHATSAPP_NUM || '5548991261832';

    const formattedTotal = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total);

    let msg = `Olá Andréia! Gostaria de fazer o pedido da(s) seguinte(s) leitura(s):\n\n`;
    state.items.forEach((item) => {
      const itemTotal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(item.preco * item.quantidade);
      msg += `• ${item.quantidade}x ${item.nome} (${itemTotal})\n`;
    });
    msg += `\n*Valor Total:* ${formattedTotal}\n`;
    msg += `\nVou realizar o pagamento via PIX. Poderia me confirmar para enviar o comprovante?`;

    const url = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total,
        totalItems,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleDrawer,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        checkoutWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
