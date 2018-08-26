export class Asignatura{
    constructor(
       public _id: string, 
       public codigo: string,
       public nombre: string,
       public texto: string,
       public etiquetas: string[],
       public tipoEstudio: string,
       public estudio: string,
       public anyoCurso: number,
       public creditos: number,
       public curso: number,
       public semestre: number,
       public duracion: string
    ){}
}