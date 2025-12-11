export class CreateExercicioDto {
  nome: string;
  musculoAlvo: string;
  duracao?: number;
  repeticoes?: number;
  caloriasEstimadas: number;
  tipoTreinoId: number;
  usuarioId: number;
}
