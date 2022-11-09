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
exports.ChangePlantStageUseCase = void 0;
var prismaClient_1 = require("../../../../database/prismaClient");
var postmanJson = {
    "transplantDate": "2012-04-30T18:25:43.511Z",
    "plants": [1, 2, 3, 4],
    "id_recipiente": 1,
    "id_location": 1,
    "id_faseCultivo": 2,
    "obs": "Ae"
};
var ChangePlantStageUseCase = /** @class */ (function () {
    function ChangePlantStageUseCase() {
    }
    ChangePlantStageUseCase.prototype.execute = function (_a) {
        var actionDate = _a.actionDate, plants = _a.plants, id_faseCultivo = _a.id_faseCultivo, id_user_create = _a.id_user_create, obs = _a.obs;
        return __awaiter(this, void 0, void 0, function () {
            var selectedFaseCultivo, plantsToUpdate, updatePlantsParams, updatedDatePlants, updatePlantsParams, updatedDatePlants;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prisma.fasesCultivo.findFirst({
                            where: {
                                id: id_faseCultivo
                            }
                        })];
                    case 1:
                        selectedFaseCultivo = _b.sent();
                        if (!selectedFaseCultivo) {
                            throw new Error('Fase de cultivo não existente: ' + id_faseCultivo);
                        }
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.findMany({
                                where: {
                                    id: { "in": plants }
                                }
                            })
                            //VALIDA VIABILIDADE DE TRANSPLANTE
                            //DESCARTADA?
                        ];
                    case 2:
                        plantsToUpdate = _b.sent();
                        //VALIDA VIABILIDADE DE TRANSPLANTE
                        //DESCARTADA?
                        plantsToUpdate.map(function (plant) {
                            if (plant.id_faseCultivo === id_faseCultivo) {
                                throw new Error('Planta já está na fase de cultivo selecionada.');
                            }
                            if (plant.isTrashed) {
                                throw new Error('Não é possivel alterar plantas descartadas.');
                            }
                            if (plant.isCropped) {
                                throw new Error('Não é possivel alterar plantas colhidas.');
                            }
                        });
                        if (!(selectedFaseCultivo.name == "Vegetação")) return [3 /*break*/, 4];
                        updatePlantsParams = {
                            where: {
                                id: { "in": plants }
                            },
                            data: {
                                id_faseCultivo: id_faseCultivo,
                                vegetationDate: actionDate
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.updateMany(updatePlantsParams)];
                    case 3:
                        updatedDatePlants = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!(selectedFaseCultivo.name == "Floração")) return [3 /*break*/, 6];
                        updatePlantsParams = {
                            where: {
                                id: { "in": plants }
                            },
                            data: {
                                id_faseCultivo: id_faseCultivo,
                                floweringDate: actionDate
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.updateMany(updatePlantsParams)];
                    case 5:
                        updatedDatePlants = _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return ChangePlantStageUseCase;
}());
exports.ChangePlantStageUseCase = ChangePlantStageUseCase;
//# sourceMappingURL=ChangePlantStageUseCase.js.map