import { OrganizadorRepository } from "../repositories/OrganizadorRepository";
import { Organizador } from "../models/Organizador";

export class OrganizadorService {
    private organizadorRepository: OrganizadorRepository;

    constructor() {
        this.organizadorRepository = new OrganizadorRepository();
    }

    async createOrganizador(organizadorData: {
        nombre: string;
        contacto: string;
        pais: string;
        usuarioId: number;
    }) {
        // Validar datos de entrada
        if (!organizadorData.nombre || !organizadorData.contacto || !organizadorData.pais) {
            throw new Error('Faltan campos requeridos: nombre, contacto, pais');
        }

        if (!organizadorData.usuarioId || organizadorData.usuarioId <= 0) {
            throw new Error('El ID del usuario es requerido y debe ser válido');
        }

        const organizador = new Organizador({
            nombre: organizadorData.nombre,
            contacto: organizadorData.contacto,
            pais: organizadorData.pais,
            fundacion: new Date(),
            usuarioId: organizadorData.usuarioId,
        });

        // No envolver el error, dejarlo pasar tal cual viene del repositorio
        return await this.organizadorRepository.create(organizador);
    }
    async getOrganizadorById(id: number) {
        try {
            const organizador = await this.organizadorRepository.findById(id);
            if (!organizador) {
                throw new Error(`Organizador con ID ${id} no encontrado`);
            }
            return organizador;
        } catch (error: any) {
            throw new Error(`Error al obtener el organizador: ${error}`);
        }
    }
    async updateOrganizador(organizadorData: {
        id: number;
        nombre?: string;
        contacto?: string;
        pais?: string;
    }) {
        try {
            const organizador = await this.organizadorRepository.findById(organizadorData.id);
            if (!organizador) {
                throw new Error(`Organizador con ID ${organizadorData.id} no encontrado`);
            }
            organizador.nombre = organizadorData.nombre ?? organizador.nombre;
            organizador.contacto = organizadorData.contacto ?? organizador.contacto;
            organizador.pais = organizadorData.pais ?? organizador.pais;
            return await this.organizadorRepository.update(organizador);
        } catch (error: any) {
            throw new Error(`Error al actualizar el organizador: ${error}`);
        }
    }

    async deleteOrganizador(id: number) {
        try {
            const success = await this.organizadorRepository.delete(id);
            if (!success) {
                throw new Error(`No se pudo eliminar el organizador con ID ${id}`);
            }
            return success;
        } catch (error: any) {
            throw new Error(`Error al eliminar el organizador: ${error}`);
        }
    }

}