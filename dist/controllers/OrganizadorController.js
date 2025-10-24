"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizadoresController = void 0;
const OrganizadorService_1 = require("../services/OrganizadorService");
class OrganizadoresController {
    constructor() {
        this.organizadorService = new OrganizadorService_1.OrganizadorService();
    }
    async createOrganizador(req, res) {
        try {
            const organizador = await this.organizadorService.createOrganizador(req.body);
            res.status(201).json(organizador);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getOrganizadorById(req, res) {
        try {
            const organizador = await this.organizadorService.getOrganizadorById(Number(req.params.id));
            res.status(200).json(organizador);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateOrganizador(req, res) {
        try {
            const organizador = await this.organizadorService.updateOrganizador({
                id: Number(req.params.id),
                ...req.body
            });
            res.status(200).json(organizador);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteOrganizador(req, res) {
        try {
            await this.organizadorService.deleteOrganizador(Number(req.params.id));
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.OrganizadoresController = OrganizadoresController;
//# sourceMappingURL=OrganizadorController.js.map