import { ArtistaEvento } from '../models/ArtistaEvento';

export interface IArtistaEventoRepository {
    save(artistaEvento: ArtistaEvento): Promise<ArtistaEvento>;
    findById(id: number): Promise<ArtistaEvento | null>;
    update(artistaEvento: ArtistaEvento): Promise<ArtistaEvento>;
    delete(id: number): Promise<void>;
    findMany(): Promise<ArtistaEvento[]>;
    findByArtistaId(artistaId: number): Promise<ArtistaEvento[]>;
    findByEventoId(eventoId: number): Promise<ArtistaEvento[]>;
}
