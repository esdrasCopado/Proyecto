import { Request, Response } from 'express';
import { OrganizadorService } from '../services/OrganizadorService';

export class OrganizadoresController {
    private organizadorService: OrganizadorService;

    constructor() {
        this.organizadorService = new OrganizadorService();
    }

    async createOrganizador(req: Request, res: Response) {
        try {
            const organizador = await this.organizadorService.createOrganizador(req.body);
            res.status(201).json({
                success: true,
                message: 'Organizador creado exitosamente',
                data: organizador
            });
        } catch (error: any) {
            // Determinar el código de estado apropiado
            let statusCode = 500;

            if (error.message.includes('ya es un organizador')) {
                statusCode = 409; // Conflict
            } else if (error.message.includes('no existe')) {
                statusCode = 404; // Not Found
            } else if (error.message.includes('requerido') || error.message.includes('válido')) {
                statusCode = 400; // Bad Request
            }

            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    async getOrganizadorById(req: Request, res: Response) {
        try {
            const organizador = await this.organizadorService.getOrganizadorById(Number(req.params.id));
            res.status(200).json(organizador);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateOrganizador(req: Request, res: Response) {
        try {
            const organizador = await this.organizadorService.updateOrganizador({
                id: Number(req.params.id),
                ...req.body
            });
            res.status(200).json(organizador);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteOrganizador(req: Request, res: Response) {
        try {
            await this.organizadorService.deleteOrganizador(Number(req.params.id));
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}