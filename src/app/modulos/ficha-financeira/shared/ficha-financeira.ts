export interface FichaFinanceira {
  alunoId: number;
  nome: string;
  login: string;
  cpf: string;
  fichaFinanceiraId: number;
  dataGeracao: string;
  diaVencimento: number;
  valorMensal: number;
  statusFichaFinanceira: string;
}
