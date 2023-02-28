import { ACTION_TYPE } from "../../constants/ACTION_TYPE";
import { prisma } from "../../database/prismaClient";
import { getLoteById } from "../repository/LotesRepository";
import { findGeneticById, findRecipienteById, findLocationById, findPropagationTypeById } from "../repository/ParamsRepository";
import { getPlantsById } from "../repository/PlantasRepository";
import { validateNewPlantasLote } from "../validation/Validator";

interface ICreateLote {
    propDate: Date
    id_propagationType: number;
    id_genetic: number;
    id_location_init: number;
    id_recipiente: number;
    qtTotal: number;
    id_mother?: number;
    obs: string;
    id_user_create: number;
    id_user_atribution: number;
    scheduled: boolean;
    startDate: Date;
    endDate: Date;
}

export async function newPlantasLoteService(action: any, lote: any) {
    

    
    const selectedLote = await getLoteById(lote)
    if (action.isCompleted) {
    await validateNewPlantasLote(selectedLote, action.qtd)
    }

}
