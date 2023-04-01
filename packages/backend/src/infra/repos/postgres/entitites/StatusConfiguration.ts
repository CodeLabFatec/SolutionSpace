import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { RequestStep } from './Rating'

@Entity('statusConfigurations')
export class StatusConfiguration {
  @PrimaryGeneratedColumn('uuid')
  status_id: string

  @Column({ type: 'text', nullable: false })
  rating: string

  @Column({ type: 'text', nullable: false })
  status: string

  @Column({
    type: 'enum',
    enum: RequestStep,
    nullable: true
  })
  requestStep: RequestStep
}
