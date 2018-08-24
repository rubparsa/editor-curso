export class Usuario{
    constructor(
       public _id: string,
       public nombre: string,
       public apellidos: string,
       public email: string,
       public password: string,
       public departamento: string,
       public facultad: string,
       public rol: string
    ){}
}