import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Request } from './Request'
import { Rating } from './Rating'
import moment from 'moment'

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

  @ManyToMany(() => Request, (request) => request.files)
  @JoinTable({
    name: 'request_file',
    joinColumn: {
      name: 'request',
      referencedColumnName: 'file_id'
    },
    inverseJoinColumn: {
      name: 'file',
      referencedColumnName: 'request_id'
    }
  })
  requests: Request[]

  @ManyToOne(() => Rating, (rating) => rating.rating_id)
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
