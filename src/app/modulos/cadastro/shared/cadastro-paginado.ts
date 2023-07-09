import { Cadastro } from './cadastro';

export interface CadastroPaginado {
    content: Cadastro[];
    totalElements: number;
    size: number;
    number: number;
    totalPages: number;
}
