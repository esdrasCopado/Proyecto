/**
 * Schemas de Swagger para el modelo Song
 */
export declare const songSchemas: {
    Song: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
                example: number;
            };
            fontImageUrl: {
                type: string;
                description: string;
                maxLength: number;
                example: string;
            };
            videoUrl: {
                type: string;
                description: string;
                maxLength: number;
                example: string;
                nullable: boolean;
            };
            titulo: {
                type: string;
                description: string;
                maxLength: number;
                example: string;
            };
            duracion: {
                type: string;
                description: string;
                example: number;
                minimum: number;
                maximum: number;
            };
            albumId: {
                type: string;
                description: string;
                example: number;
            };
        };
    };
    SongCreate: {
        type: string;
        required: string[];
        properties: {
            fontImageUrl: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            videoUrl: {
                type: string;
                maxLength: number;
                description: string;
                example: string;
            };
            titulo: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            duracion: {
                type: string;
                minimum: number;
                maximum: number;
                description: string;
                example: number;
            };
            albumId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
        };
    };
    SongUpdate: {
        type: string;
        properties: {
            fontImageUrl: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            videoUrl: {
                type: string;
                maxLength: number;
                description: string;
                example: string;
                nullable: boolean;
            };
            titulo: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            duracion: {
                type: string;
                minimum: number;
                maximum: number;
                description: string;
                example: number;
            };
            albumId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
        };
    };
};
//# sourceMappingURL=song.schema.d.ts.map