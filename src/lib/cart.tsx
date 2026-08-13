import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Produto } from "./catalog";
import { estoqueDisponivel, imagemCard, precoFinal } from "./catalog";

export type CartItem = {
  id: string;
  nome: string;
  codigo: string | null;
  variacao: string | null;
  preco: number;
  qtd: number;
  estoque: number;
  imagem: string | null;
};

const STORAGE_KEY = "aura.sacola.v1";

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (produto: Produto, qtd?: number) => void;
  setQtd: (id: string, qtd: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback((produto: Produto, qtd = 1) => {
    const estoque = estoqueDisponivel(produto);
    if (estoque <= 0) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === produto.id_publico);
      if (existing) {
        return prev.map((i) =>
          i.id === produto.id_publico
            ? { ...i, qtd: Math.min(estoque, i.qtd + qtd), estoque }
            : i,
        );
      }
      return [
        ...prev,
        {
          id: produto.id_publico,
          nome: produto.nome,
          codigo: produto.codigo,
          variacao: produto.material || produto.categoria || null,
          preco: precoFinal(produto),
          qtd: Math.min(estoque, Math.max(1, qtd)),
          estoque,
          imagem: imagemCard(produto),
        },
      ];
    });
  }, []);

  const setQtd = useCallback((id: string, qtd: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qtd: Math.min(i.estoque || qtd, Math.max(0, qtd)) } : i,
        )
        .filter((i) => i.qtd > 0),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qtd, 0);
    const total = items.reduce((s, i) => s + i.qtd * i.preco, 0);
    return { items, count, total, add, setQtd, remove, clear };
  }, [items, add, setQtd, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
