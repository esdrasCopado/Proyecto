
export interface IOrganizador {
    id: number;
    nombre: string;
    contacto: string;
    pais: string;
    fundacion: Date;
    usuarioId: number;
}

export class Organizador {
   private _id?: number;
   private _nombre: string;
   private _contacto: string;
   private _pais: string;
   private _fundacion: Date;
   private _usuarioId: number;

   constructor(data: { id?: number; nombre: string; contacto: string; pais: string; fundacion: Date; usuarioId: number }) {
       this._id = data.id;
       this._nombre = data.nombre;
       this._contacto = data.contacto;
       this._pais = data.pais;
       this._fundacion = data.fundacion;
       this._usuarioId = data.usuarioId;
   }

   get id(): number | undefined {
       return this._id;
   }

   get nombre(): string {
       return this._nombre;
   }

   set nombre(value: string) {
       this._nombre = value;
   }

   get contacto(): string {
       return this._contacto;
   }

   set contacto(value: string) {
       this._contacto = value;
   }

   get pais(): string {
       return this._pais;
   }

   set pais(value: string) {
       this._pais = value;
   }

   get fundacion(): Date {
       return this._fundacion;
   }

   set fundacion(value: Date) {
       this._fundacion = value;
   }

   get usuarioId(): number {
       return this._usuarioId;
   }

   set usuarioId(value: number) {
       this._usuarioId = value;
   }

   public toJSON(): IOrganizador {
       return {
           id: this._id ?? 0,
           nombre: this._nombre,
           contacto: this._contacto,
           pais: this._pais,
           fundacion: this._fundacion,
           usuarioId: this._usuarioId,
       };
   }

   public static fromDatabase(data: any): Organizador {
       return new Organizador({
           id: data.id,
           nombre: data.nombre,
           contacto: data.contacto,
           pais: data.pais,
           fundacion: new Date(data.fundacion),
           usuarioId: data.usuarioId,
       });
   } 
}