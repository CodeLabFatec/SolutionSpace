import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { User } from './User'

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  group_id: number

  @Column({ type: 'text', nullable: false })
  group_name: string

  @OneToMany(() => User, (user) => user.group)
  users: User[]
}
