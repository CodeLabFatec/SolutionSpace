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
import bcrypt from 'bcryptjs'
import { Team } from './Team'
import moment from 'moment-timezone'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: number

  @Column({ type: 'text', nullable: false })
  name: string

  @Column({ type: 'text', unique: true, nullable: false })
  email: string

  @Column({ type: 'text', nullable: false })
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  @ManyToOne(() => Team, (team) => team.users)
  @JoinColumn({ name: 'team_id' })
  team: Team

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
