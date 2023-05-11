import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Request } from './Request';

export enum RequestStepStatus {
    ANALISE_RISCO = 'Analise de risco',
    ALINHAMENTO_ESTRATEGICO = 'Alinhamento estratégico'
}

@Entity('statusConfigurations')
export class StatusConfiguration {
    @PrimaryGeneratedColumn('uuid')
    status_id: string;

    @Column({ type: 'text', nullable: false })
    rating: string;

    @Column({ type: 'text', nullable: false })
    status: string;

    @Column({
        type: 'enum',
        enum: RequestStepStatus,
        nullable: true
    })
    requestStep: RequestStepStatus;

    @Column({ type: 'text', nullable: true })
    color: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    archiveRequests: boolean

    @OneToMany(() => Request, (request) => request.status)
    requests: Request[]
}