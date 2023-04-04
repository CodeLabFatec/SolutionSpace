import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { User } from './User'

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  group_id: string

  @Column({ type: 'text', unique: true, nullable: false })
  group_name: string

  @OneToMany(() => User, (user) => user.team)
  users: User[]
}
