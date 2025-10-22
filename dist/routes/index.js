"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioRoutes_1 = __importDefault(require("./usuarioRoutes"));
const eventoRoutes_1 = __importDefault(require("./eventoRoutes"));
const organizadorRoutes_1 = __importDefault(require("./organizadorRoutes"));
// import artistaRoutes from './artistaRoutes';
// import organizadorRoutes from './organizadorRoutes';
const router = (0, express_1.Router)();
router.use('/usuarios', usuarioRoutes_1.default);
router.use('/eventos', eventoRoutes_1.default);
router.use('/organizadores', organizadorRoutes_1.default);
// router.use('/artistas', artistaRoutes); // TODO: Implementar ArtistaController
// router.use('/organizadores', organizadorRoutes); // TODO: Implementar OrganizadorService
exports.default = router;
//# sourceMappingURL=index.js.map