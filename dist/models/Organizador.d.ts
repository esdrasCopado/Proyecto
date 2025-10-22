export interface IOrganizador {
    id: number;
    nombre: string;
    contacto: string;
    pais: string;
    fundacion: Date;
    usuarioId: number;
}
export declare class Organizador {
    private _id?;
    private _nombre;
    private _contacto;
    private _pais;
    private _fundacion;
    private _usuarioId;
    constructor(data: {
        id?: number;
        nombre: string;
        contacto: string;
        pais: string;
        fundacion: Date;
        usuarioId: number;
    });
    get id(): number | undefined;
    get nombre(): string;
    set nombre(value: string);
    get contacto(): string;
    set contacto(value: string);
    get pais(): string;
    set pais(value: string);
    get fundacion(): Date;
    set fundacion(value: Date);
    get usuarioId(): number;
    set usuarioId(value: number);
    toJSON(): IOrganizador;
    static fromDatabase(data: any): Organizador;
}
//# sourceMappingURL=Organizador.d.ts.map