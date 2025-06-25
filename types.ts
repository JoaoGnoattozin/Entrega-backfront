export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  preferencias?: string;
  historico: number;
}

export interface Mesa {
  numero: number;
  capacidade: number;
  ocupada: boolean;
  localizacao: 'Salão Principal' | 'Terraço' | 'Área VIP' | 'Jardim';
  tipo: 'Regular' | 'VIP' | 'Romântica' | 'Familiar';
}

export interface Reserva {
  id: string;
  cliente: Cliente;
  mesa: Mesa;
  horario: string;
  data: string;
  status: 'Confirmada' | 'Pendente' | 'Cancelada' | 'Finalizada';
  observacoes?: string;
  numeroConvidados: number;
}

export interface Produto {
  id: string;
  nome: string;
  categoria: 'Entrada' | 'Prato Principal' | 'Sobremesa' | 'Bebida';
  preco: number;
  disponivel: boolean;
  descricao: string;
}

export interface Pedido {
  id: string;
  reservaId: string;
  produtos: { produto: Produto; quantidade: number }[];
  total: number;
  status: 'Pendente' | 'Preparando' | 'Pronto' | 'Entregue';
  observacoes?: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  cargo: 'Garçom' | 'Chef' | 'Gerente' | 'Recepcionista';
  turno: 'Manhã' | 'Tarde' | 'Noite';
  ativo: boolean;
}