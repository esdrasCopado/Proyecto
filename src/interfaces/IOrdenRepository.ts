import { IOrden, Orden } from "../models/Orden";
export interface IOrdenRepository {
    createOrden(ordenData: IOrden): Promise<IOrden>;
    getOrdenById(id: number): Promise<IOrden | null>;
    updateOrden(orden: IOrden): Promise<IOrden>;
    deleteOrden(id: number): Promise<void>;
    listOrdenes(): Promise<IOrden[]>;
}