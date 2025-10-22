import { IUserRepository } from "../interfaces/IUserRepository";
import { Usuario } from "../models/Usuario";
import { Role } from "../types/enums";
export declare class UsuarioRepository implements IUserRepository {
    create(usuario: Usuario): Promise<Usuario>;
    findMany(): Promise<Usuario[]>;
    findById(id: number): Promise<Usuario | null>;
    update(id: number, usuario: Partial<Usuario>): Promise<Usuario>;
    delete(id: number): Promise<void>;
    findByEmail(email: string): Promise<Usuario | null>;
    findByNombre(nombre: string): Promise<Usuario[]>;
    findByRangoFecha(fechaInicio: Date, fechaFin: Date): Promise<Usuario[]>;
    findWithPaginatio(page: number, pageSize: number): Promise<Usuario[]>;
    count(): Promise<number>;
    emailExists(email: string): Promise<boolean>;
    findByRol(rol: Role): Promise<Usuario[]>;
}
//# sourceMappingURL=UsuarioRepository.d.ts.map