export interface FiltersResponseDTO {
  clientes: Cliente[];
  vendedores: Vendedore[];
}

export interface Cliente {
  id: number;
  name: string;
}

export interface Vendedore {
  id: number;
  name: string;
}
