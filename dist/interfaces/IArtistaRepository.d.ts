import { Artista } from '../models/Artista';
export interface IArtistaRepository {
    save(artista: Artista): Promise<Artista>;
    findMany(): Promise<Artista[]>;
    findById(id: number): Promise<Artista | null>;
    update(id: number, artista: Partial<Artista>): Promise<Artista | null>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=IArtistaRepository.d.ts.map