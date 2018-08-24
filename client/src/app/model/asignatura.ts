export class Asignatura{
    constructor(
       public codigo: number,
       public nombre: string,
       public tipoEstudio: string,
       public estudio: string,
       public anyoCurso: number,
       public creditos: number,
       public curso: number,
       public semestre: number,
       public duracion: string
    ){}
}