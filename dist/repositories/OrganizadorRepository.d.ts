import { IOrganizadorRepository } from '../interfaces/IOrganizadorRepository';
import { Organizador } from '../models/Organizador';
export declare class OrganizadorRepository implements IOrganizadorRepository {
    create(organizador: Organizador): Promise<Organizador>;
    findById(id: number): Promise<Organizador | null>;
    update(organizador: Organizador): Promise<Organizador | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=OrganizadorRepository.d.ts.map