export interface Parcela {
  id: number;
  dataPagamento: string;
  valor: string;
  juro: string;
  desconto: string;
  valorTotal: string;
  tipoPagamento: string;
  statusParcela: string;
  observacao: string;
  fichaFinanceira: number;
  diaVencimento: number;
  valorMensal: string;
  nome: string;
  cpf: string;
  login:string;
  statusFichaFinanceira: string;
}
