import { Organizador } from "../models/Organizador";

export interface IOrganizadorRepository {
   create(organizador: Organizador): Promise<Organizador>;
   findById(id: number): Promise<Organizador | null>;
   update(organizador: Organizador): Promise<Organizador | null>;
   delete(id: number): Promise<boolean>;
}