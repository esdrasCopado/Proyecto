"use strict";
/**
 * Punto de entrada para todos los schemas de Swagger
 * Agrupa y exporta todos los schemas y respuestas
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonResponses = exports.commonSchemas = exports.boletoSchemas = exports.organizadorSchemas = exports.artistaSchemas = exports.eventoSchemas = exports.usuarioSchemas = exports.allResponses = exports.allSchemas = void 0;
const usuario_schema_1 = require("./usuario.schema");
Object.defineProperty(exports, "usuarioSchemas", { enumerable: true, get: function () { return usuario_schema_1.usuarioSchemas; } });
const evento_schema_1 = require("./evento.schema");
Object.defineProperty(exports, "eventoSchemas", { enumerable: true, get: function () { return evento_schema_1.eventoSchemas; } });
const artista_schema_1 = require("./artista.schema");
Object.defineProperty(exports, "artistaSchemas", { enumerable: true, get: function () { return artista_schema_1.artistaSchemas; } });
const organizador_schema_1 = require("./organizador.schema");
Object.defineProperty(exports, "organizadorSchemas", { enumerable: true, get: function () { return organizador_schema_1.organizadorSchemas; } });
const boleto_shema_1 = require("./boleto.shema");
Object.defineProperty(exports, "boletoSchemas", { enumerable: true, get: function () { return boleto_shema_1.boletoSchemas; } });
const common_schema_1 = require("./common.schema");
Object.defineProperty(exports, "commonSchemas", { enumerable: true, get: function () { return common_schema_1.commonSchemas; } });
Object.defineProperty(exports, "commonResponses", { enumerable: true, get: function () { return common_schema_1.commonResponses; } });
// Combinar todos los schemas
exports.allSchemas = {
    ...usuario_schema_1.usuarioSchemas,
    ...evento_schema_1.eventoSchemas,
    ...artista_schema_1.artistaSchemas,
    ...organizador_schema_1.organizadorSchemas,
    ...boleto_shema_1.boletoSchemas,
    ...common_schema_1.commonSchemas,
};
// Exportar respuestas comunes
exports.allResponses = common_schema_1.commonResponses;
//# sourceMappingURL=index.js.map