import { Exercicio } from './exercicio';

export interface ExercicioPaginado {
    content: Exercicio[];
    totalElements: number;
    size: number;
    number: number;
    totalPages: number;
}
