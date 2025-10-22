import { Request, Response } from 'express';
export declare class OrganizadoresController {
    private organizadorService;
    constructor();
    createOrganizador(req: Request, res: Response): Promise<void>;
    getOrganizadorById(req: Request, res: Response): Promise<void>;
    updateOrganizador(req: Request, res: Response): Promise<void>;
    deleteOrganizador(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=OrganizadorController.d.ts.map