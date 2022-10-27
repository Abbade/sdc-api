"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CreatePlantsLoteUseCase = void 0;
var prismaClient_1 = require("../../../../database/prismaClient");
var CreatePlantsLoteUseCase = /** @class */ (function () {
    function CreatePlantsLoteUseCase() {
    }
    CreatePlantsLoteUseCase.prototype.execute = function (_a) {
        var id_lote = _a.id_lote, aclimatationDate = _a.aclimatationDate, qtPlant = _a.qtPlant, id_location = _a.id_location, id_recipiente = _a.id_recipiente, obs = _a.obs, id_user_create = _a.id_user_create;
        return __awaiter(this, void 0, void 0, function () {
            var selectedLote, selectedGenetic, selectedLocation, selectedRecipiente, newPlants, plantIndex, i, trashedLote, lote;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prisma.lotes.findFirst({
                            where: {
                                id: id_lote
                            }
                        })];
                    case 1:
                        selectedLote = _b.sent();
                        if (!selectedLote) {
                            throw new Error('Lote não existente: ' + id_lote);
                        }
                        return [4 /*yield*/, prismaClient_1.prisma.genetics.findFirst({
                                where: {
                                    id: selectedLote.id_genetic
                                }
                            })];
                    case 2:
                        selectedGenetic = _b.sent();
                        if (!selectedGenetic) {
                            throw new Error('Genética não existente: ' + selectedLote.id);
                        }
                        return [4 /*yield*/, prismaClient_1.prisma.locations.findFirst({
                                where: {
                                    id: id_location
                                }
                            })];
                    case 3:
                        selectedLocation = _b.sent();
                        if (!selectedLocation) {
                            throw new Error('Local não existente: ' + selectedLote.id);
                        }
                        return [4 /*yield*/, prismaClient_1.prisma.recipientes.findFirst({
                                where: {
                                    id: id_recipiente
                                }
                            })];
                    case 4:
                        selectedRecipiente = _b.sent();
                        if (!selectedRecipiente) {
                            throw new Error('Recipiente não existente: ' + selectedLote.id);
                        }
                        //VALIDA QUANTIDADE DE ESTACAS/SEEDLINGS
                        if ((selectedLote === null || selectedLote === void 0 ? void 0 : selectedLote.qtProp) - qtPlant < 0) {
                            throw new Error('Lote não tem estacas suficiente para transplante.: ' + selectedLote.qtProp);
                        }
                        newPlants = [];
                        plantIndex = selectedLote.qtPlant + 1;
                        for (i = selectedLote.qtPlant + 1; i < plantIndex + qtPlant; i++) {
                            newPlants.push({
                                name: selectedLote.name + '#' + i,
                                id_lote: id_lote,
                                id_location: id_location,
                                id_recipiente: id_recipiente,
                                aclimatationDate: aclimatationDate,
                                aclimatationRecipient: selectedRecipiente.name,
                                aclimatationLocation: selectedLocation.name,
                                lastTransplant: aclimatationDate,
                                id_user_create: id_user_create,
                                propDate: selectedLote.propDate,
                                propName: selectedLote.name,
                                id_genetic: selectedLote.id_genetic,
                                id_propagationType: selectedLote.id_propagationType,
                                id_faseCultivo: 2,
                                obs: obs
                            });
                        }
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.createMany({ data: newPlants })];
                    case 5:
                        trashedLote = _b.sent();
                        return [4 /*yield*/, prismaClient_1.prisma.lotes.update({
                                where: {
                                    id: id_lote
                                },
                                data: {
                                    qtProp: selectedLote.qtProp - qtPlant,
                                    qtPlant: selectedLote.qtPlant + qtPlant
                                }
                            })];
                    case 6:
                        lote = _b.sent();
                        return [2 /*return*/, trashedLote];
                }
            });
        });
    };
    return CreatePlantsLoteUseCase;
}());
exports.CreatePlantsLoteUseCase = CreatePlantsLoteUseCase;
//# sourceMappingURL=CreatePlantsLoteUseCase.js.map