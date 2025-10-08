import { Evento } from "../models/Evento";
export interface IEventoRepository {
    save(evento: Evento): Promise<Evento>;
    findById(id: number): Promise<Evento | null>;
    update(evento: Evento): Promise<Evento>;
    delete(id: number): Promise<void>;
    findMany(): Promise<Evento[]>;
}