/**
 * Schemas de Swagger para el modelo Organizador
 */
export declare const organizadorSchemas: {
    Organizador: {
        type: string;
        properties: {
            Nombre: {
                type: string;
                description: string;
                example: string;
            };
            Contracto: {
                type: string;
                description: string;
                example: string;
            };
            Pais: {
                type: string;
                description: string;
                example: string;
            };
            UsuarioId: {
                type: string;
                description: string;
                example: string;
            };
            Fundacion: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            createdAt: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            updatedAt: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
        };
    };
    OrganizadorCreate: {
        type: string;
        required: string[];
        properties: {
            nombreEmpresa: {
                type: string;
                minLength: number;
                example: string;
            };
            rfc: {
                type: string;
                pattern: string;
                example: string;
            };
            direccion: {
                type: string;
                minLength: number;
                example: string;
            };
            telefonoEmpresa: {
                type: string;
                pattern: string;
                example: string;
            };
            sitioWeb: {
                type: string;
                format: string;
                example: string;
            };
        };
    };
    OrganizadorUpdate: {
        type: string;
        properties: {
            nombreEmpresa: {
                type: string;
                minLength: number;
                example: string;
            };
            rfc: {
                type: string;
                pattern: string;
                example: string;
            };
            direccion: {
                type: string;
                minLength: number;
                example: string;
            };
            telefonoEmpresa: {
                type: string;
                pattern: string;
                example: string;
            };
            sitioWeb: {
                type: string;
                format: string;
                example: string;
            };
            verificado: {
                type: string;
                example: boolean;
            };
        };
    };
};
//# sourceMappingURL=organizador.schema.d.ts.map