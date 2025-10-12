import { ArtistaEvento } from '../models/ArtistaEvento';
import { RolArtista } from '../types/enums';

export interface IArtistaEventoRepository {
    create(artistaEvento: ArtistaEvento): Promise<ArtistaEvento>;
    findById(id: number): Promise<ArtistaEvento | null>;
    update(artistaEvento: ArtistaEvento): Promise<ArtistaEvento>;
    delete(id: number): Promise<void>;
    findMany(): Promise<ArtistaEvento[]>;
    findByArtistaId(artistaId: number): Promise<ArtistaEvento[]>;
    findByEventoId(eventoId: number): Promise<ArtistaEvento[]>;
    findByRol(rol: RolArtista): Promise<ArtistaEvento[]>;
    findHeadliners(): Promise<ArtistaEvento[]>;
    findByEventoIdAndRol(eventoId: number, rol: RolArtista): Promise<ArtistaEvento[]>;
}
