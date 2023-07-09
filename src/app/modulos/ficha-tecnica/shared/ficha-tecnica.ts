import { Cadastro } from "../../cadastro/shared/cadastro";

export interface FichaTecnica {

  id: string;
  dataAvaliacao: string;
  peso: string;
  horaEntrada: string;
  horaSaida: string;
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
  sabado: string;
  descricao: string;
  statusFichaTecnica: string;
  cadastro: Cadastro;

}
