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
    await validateNewPlantasLote(selectedLote, action.qtd)


}

export async function createLoteService({propDate, id_propagationType, id_genetic, id_location_init, id_recipiente, qtTotal, id_mother, obs, id_user_create, id_user_atribution, scheduled, startDate, endDate }: ICreateLote) {

    if (qtTotal <= 0) {
        throw new Error('Quantidade deve ser maior que 0.');
      }
  
      const selectedGenetic = await findGeneticById(id_genetic)
      const setlectedRecipiente = await findRecipienteById(id_recipiente)
      const selectedLocation = await findLocationById(id_location_init)
      const selectedPropagationType = await findPropagationTypeById(id_propagationType)
  
      if (id_mother) {
        const selectedMother = await getPlantsById([id_mother])
  
      }
  
  
  
      // INICIA CRIAÇÃO DE CODIGO UNICO 
  
  
      const date = new Date(propDate).toLocaleDateString('pt-BR').replaceAll("/", "");
  
      const newName1 = selectedGenetic?.nick + "#" + date;
  
      const lotesEncontrados = await prisma.lotes.findMany({
        where: {
          name: {
            contains: newName1,
            mode: 'insensitive'
          },
        },
      });
  
  
      const newName2 = newName1 + "-" +
  
        String.fromCharCode("A".charCodeAt(0) + lotesEncontrados?.length);
  
  
      // FINALIZA CRIAÇÃO DE CÓDIGO ÚNICO
  
      const clientExists = await prisma.lotes.findFirst({
        where: {
          name: {
            equals: newName2,
            mode: 'insensitive'
          },
        },
      });
  
      if (clientExists) {
        throw new Error('Client already exists: ' + newName2);
      }
  
      const lote = await prisma.lotes.create({
        data: {
          name: newName2,
          id_user_create,
          propDate,
  
          id_propagationType,
          id_genetic,
          id_location_init,
          // id_mother,
          qtTotal,
          qtProp: qtTotal,
          obs,
  
        },
      });
  
      const newActionGroup = await (await prisma.actionGroups.create({
        data: {
          id_user_create: id_user_create,
          obs: obs,
          startDate: startDate,
          endDate: endDate
        }
      })).id
  
      const newAction = await prisma.actions.create({
        data: {
          id_user_create: id_user_create,
          isLote: true,
          isPlant: false,
          isCrop: false,
          name: "Criação de muda",
          id_actionType: ACTION_TYPE.CREATE_MUDA,
          created_at: new Date(),
          id_user_completion: id_user_atribution,
          id_user_atribution: id_user_atribution,
          scheduledDate: scheduled ? propDate : undefined,
          id_actionGroup: newActionGroup,
          isCompleted: true,
          completionDate: propDate,
          qtd: qtTotal
        }
      })
  
      const actionLote = await prisma.actionLotes.create({
        data: {
          id_lote: lote.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,
  
          status: "Completed",
          isCompleted: true,
          scheduledDate: scheduled ? propDate : undefined,
  
          id_user_atribution: id_user_atribution,
  
          id_user_completion: id_user_atribution,
  
          completionDate: propDate,
          id_action: newAction.id,
  
          qt: qtTotal
        }
      })
  
      return lote;
}