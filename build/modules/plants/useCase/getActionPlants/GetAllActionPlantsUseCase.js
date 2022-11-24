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
exports.GetAllActionPlantsUseCase = void 0;
var prismaClient_1 = require("../../../../database/prismaClient");
var GetAllActionPlantsUseCase = /** @class */ (function () {
    function GetAllActionPlantsUseCase() {
    }
    GetAllActionPlantsUseCase.prototype.execute = function (_a) {
        var name = _a.name, description = _a.description, page = _a.page, limit = _a.limit, id = _a.id, isMother = _a.isMother, isTrashed = _a.isTrashed, filter = _a.filter;
        return __awaiter(this, void 0, void 0, function () {
            var total, lotes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = id ? Number.parseInt(id) : undefined;
                        return [4 /*yield*/, prismaClient_1.prisma.actionPlants.count({
                                where: {
                                    id: {
                                        equals: id != undefined ? Number.parseInt(id) : id
                                    }
                                }
                            })];
                    case 1:
                        total = _b.sent();
                        return [4 /*yield*/, prismaClient_1.prisma.actionPlants.findMany({
                                take: (limit === null || limit === void 0 ? void 0 : limit.toString()) ? Number.parseInt(limit === null || limit === void 0 ? void 0 : limit.toString()) : 1,
                                skip: limit ? ((page - 1) * limit) : 0,
                                where: {
                                    id: { equals: id }
                                    // id_lote: {
                                    //   equals: filter?.idLote != undefined ?  Number.parseInt(filter?.idLote.toString()) : filter?.idLote
                                    // },
                                    // id_location: {
                                    //   equals: filter?.idLocation != undefined ?  Number.parseInt(filter?.idLocation.toString()) : filter?.idLocation
                                    // },
                                    // id_genetic: {
                                    //   equals: filter?.idGenetic != undefined ?  Number.parseInt(filter?.idGenetic.toString()) : filter?.idGenetic
                                    // },
                                    // id_recipiente: {
                                    //   equals: filter?.idRecipiente != undefined ?  Number.parseInt(filter?.idRecipiente.toString()) : filter?.idRecipiente 
                                    // },
                                    // id_faseCultivo: {
                                    //   equals: filter?.idFaseCultivo != undefined ?  Number.parseInt(filter?.idFaseCultivo.toString()) : filter?.idFaseCultivo  
                                    // },
                                    // name: {
                                    //   contains: name
                                    // },
                                },
                                include: {}
                            })];
                    case 2:
                        lotes = _b.sent();
                        if (!lotes) {
                            throw new Error('Sem Profiles Existentes.');
                        }
                        return [2 /*return*/, {
                                total: total,
                                itens: lotes
                            }];
                }
            });
        });
    };
    return GetAllActionPlantsUseCase;
}());
exports.GetAllActionPlantsUseCase = GetAllActionPlantsUseCase;
//# sourceMappingURL=GetAllActionPlantsUseCase.js.map