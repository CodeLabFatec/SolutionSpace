import { TipoChamado } from "../enums/tipo-chamado"
import { FileChamado } from "./filechamado-type"

export type ChamadoType = {
    request_id: string
    title: string
    description: string
    requestType: TipoChamado
    created_at: string
    requestStep: string
    status: string
    files: FileChamado[]
}