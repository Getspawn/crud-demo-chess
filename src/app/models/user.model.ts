export class User {
    public nombre?: string;
    public apellido?: string;
    public direccion?: string;
    public telefono?: string;
    public imagen64?: string;

    constructor(
        public nrousu: number,
        public usuario: string = '',
        public activo: boolean = true,
        public clave: string = '',
        public email: string = '',
    ){}
}