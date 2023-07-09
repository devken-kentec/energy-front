import { FichaTecnica } from './ficha-tecnica';

export interface FichaTecnicaPaginada {
    content: FichaTecnica[];
    totalElements: number;
    size: number;
    number: number;
    totalPages: number;
}
