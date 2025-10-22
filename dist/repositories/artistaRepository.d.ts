import { IArtistaRepository } from "../interfaces/IArtistaRepository";
import { Artista } from "../models/Artista";
export declare class ArtistaRepository implements IArtistaRepository {
    save(artista: Artista): Promise<Artista>;
    findMany(): Promise<Artista[]>;
    findById(id: number): Promise<Artista | null>;
    update(id: number, artista: Partial<Artista>): Promise<Artista | null>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=artistaRepository.d.ts.map