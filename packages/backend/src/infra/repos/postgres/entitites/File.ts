import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Request } from './Request'
import moment from 'moment'
import { Rating } from './Rating'

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  file_id: string

  @Column({ type: 'text', nullable: false })
  file_name: string

  @Column({ type: 'text', nullable: false })
  base64: string

  @Column({ type: 'text', nullable: false })
  ext: string

  @ManyToOne(() => Request, (request) => request.files)
  @JoinColumn({ name: 'request_id' })
  request: Request

  @ManyToOne(() => Rating, (rating) => rating.files)
  @JoinColumn({ name: 'rating_id' })
  rating: Rating

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
