"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioRoutes_1 = __importDefault(require("./usuarioRoutes"));
const eventoRoutes_1 = __importDefault(require("./eventoRoutes"));
const organizadorRoutes_1 = __importDefault(require("./organizadorRoutes"));
const boletoRoutes_1 = __importDefault(require("./boletoRoutes"));
const ordenRoutes_1 = __importDefault(require("./ordenRoutes"));
const artistaRoutes_1 = __importDefault(require("./artistaRoutes"));
const artistaEventoRoutes_1 = __importDefault(require("./artistaEventoRoutes"));
const albumRoutes_1 = __importDefault(require("./albumRoutes"));
const songRoutes_1 = __importDefault(require("./songRoutes"));
const router = (0, express_1.Router)();
router.use('/usuarios', usuarioRoutes_1.default);
router.use('/eventos', eventoRoutes_1.default);
router.use('/eventos', artistaEventoRoutes_1.default); // Rutas de artistas en eventos
router.use('/organizadores', organizadorRoutes_1.default);
router.use('/boletos', boletoRoutes_1.default);
router.use('/ordenes', ordenRoutes_1.default);
router.use('/artistas', artistaRoutes_1.default);
router.use('/artistas', artistaEventoRoutes_1.default); // Rutas de eventos de artistas
router.use('/albums', albumRoutes_1.default);
router.use('/songs', songRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map