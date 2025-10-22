import { Usuario } from '../models/Usuario';
import { Role } from '../types/enums';
export interface IUserRepository {
    create(usuario: Usuario): Promise<Usuario>;
    findMany(): Promise<Usuario[]>;
    findById(id: number): Promise<Usuario | null>;
    update(id: number, usuario: Partial<Usuario>): Promise<Usuario>;
    delete(id: number): Promise<void>;
    findByEmail(email: string): Promise<Usuario | null>;
    findByNombre(nombre: string): Promise<Usuario[]>;
    findByRangoFecha(fechaInicio: Date, fecha: Date): Promise<Usuario[]>;
    findWithPaginatio(page: number, pageSize: number): Promise<Usuario[]>;
    findByRol(rol: Role): Promise<Usuario[]>;
    count(): Promise<number>;
    emailExists(email: string): Promise<boolean>;
}
//# sourceMappingURL=IUserRepository.d.ts.map