import { Organizador } from "../models/Organizador";
export declare class OrganizadorService {
    private organizadorRepository;
    constructor();
    createOrganizador(organizadorData: {
        nombre: string;
        contacto: string;
        pais: string;
        usuarioId: number;
    }): Promise<Organizador>;
    getOrganizadorById(id: number): Promise<Organizador>;
    updateOrganizador(organizadorData: {
        id: number;
        nombre?: string;
        contacto?: string;
        pais?: string;
    }): Promise<Organizador | null>;
    deleteOrganizador(id: number): Promise<true>;
}
//# sourceMappingURL=OrganizadorService.d.ts.map