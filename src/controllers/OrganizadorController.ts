import { Request, Response } from 'express';
import { OrganizadorService } from '../services/OrganizadorService';
import { Organizador } from '../models/Organizador';

export class OrganizadoresController {
    private organizadorService: OrganizadorService;

    constructor() {
        this.organizadorService = new OrganizadorService();
    }

    async createOrganizador(req: Request, res: Response) {
        try {
            const organizador = await this.organizadorService.createOrganizador(req.body);
            res.status(201).json(organizador);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
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
            const organizador = await this.organizadorService.updateOrganizador(req.body);
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