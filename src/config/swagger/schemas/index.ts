/**
 * Punto de entrada para todos los schemas de Swagger
 * Agrupa y exporta todos los schemas y respuestas
 */

import { usuarioSchemas } from './usuario.schema';
import { eventoSchemas } from './evento.schema';
import { artistaSchemas } from './artista.schema';
import { artistaEventoSchemas } from './artistaEvento.schema';
import { organizadorSchemas } from './organizador.schema';
import { boletoSchemas } from './boleto.shema';
import { ordenSchemas } from './orden.schema';
import { albumSchemas } from './album.schema';
import { songSchemas } from './song.schema';
import { commonSchemas, commonResponses } from './common.schema';

// Combinar todos los schemas
export const allSchemas = {
    ...usuarioSchemas,
    ...eventoSchemas,
    ...artistaSchemas,
    ...artistaEventoSchemas,
    ...organizadorSchemas,
    ...boletoSchemas,
    ...ordenSchemas,
    ...albumSchemas,
    ...songSchemas,
    ...commonSchemas,
};

// Exportar respuestas comunes
export const allResponses = commonResponses;

// Exportar schemas individuales por si se necesitan
export {
    usuarioSchemas,
    eventoSchemas,
    artistaSchemas,
    artistaEventoSchemas,
    organizadorSchemas,
    boletoSchemas,
    ordenSchemas,
    albumSchemas,
    songSchemas,
    commonSchemas,
    commonResponses,
};
