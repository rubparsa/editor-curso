export class Capitulo{
    constructor(
       public _id: string, 
       public title: string,
       public texto: string,
       public etiquetas: string[],
       public asignatura: string,
       public parent: string,
       public children: string[],
       public key: number
    ){}
}