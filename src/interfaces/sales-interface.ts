export interface ISalesPaginated {
  id: number;
  cliente: string;
  vendedor: string;
  data_venda: string;
  total_itens: number;
  total_valor: number;
  itens: Item[];
}

export interface Item {
  produto: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}
