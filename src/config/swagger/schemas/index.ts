/**
 * Punto de entrada para todos los schemas de Swagger
 * Agrupa y exporta todos los schemas y respuestas
 */

import { usuarioSchemas } from './usuario.schema';
import { eventoSchemas } from './evento.schema';
import { artistaSchemas } from './artista.schema';
import { organizadorSchemas } from './organizador.schema';
import { commonSchemas, commonResponses } from './common.schema';

// Combinar todos los schemas
export const allSchemas = {
    ...usuarioSchemas,
    ...eventoSchemas,
    ...artistaSchemas,
    ...organizadorSchemas,
    ...commonSchemas,
};

// Exportar respuestas comunes
export const allResponses = commonResponses;

// Exportar schemas individuales por si se necesitan
export {
    usuarioSchemas,
    eventoSchemas,
    artistaSchemas,
    organizadorSchemas,
    commonSchemas,
    commonResponses,
};
