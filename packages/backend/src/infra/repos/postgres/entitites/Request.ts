import moment from 'moment'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User'
import { File } from './File'

export enum RequestType {
  FEATURE = 'feature',
  HOTFIX = 'hotfix'
}

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn('uuid')
  request_id: string

  @Column({ type: 'text', nullable: false })
  title: string

  @Column({ type: 'text', nullable: false, default: 'Aberto' })
  status: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({
    type: 'enum',
    enum: RequestType,
    nullable: true
  })
  requestType: RequestType

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'text', nullable: false })
  requestStep: string

  @OneToMany(() => File, (file) => file.request)
  files: File[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
    this.updated_at = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
  }
}
