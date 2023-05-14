import { TipoChamado } from "../enums/tipo-chamado"
import { FileChamado } from "./filechamado-type"
import { StatusConfiguration } from "./status-configuration"
import { User } from "./user"

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
    user: User
}