import { TipoChamado } from "../enums/tipo-chamado"
import { FileChamado } from "./filechamado-type"
import { StatusConfiguration } from "./status-configuration"

export type ChamadoType = {
    request_id: string
    title: string
    description: string
    requestType: TipoChamado
    created_at: string
    requestStep: string
    status: StatusConfiguration | undefined
    files: FileChamado[]
    approved: boolean
    arquived: boolean
}