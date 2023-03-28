import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { User } from './User'

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  team_id: number

  @Column({ type: 'text', nullable: false })
  team_name: string

  @OneToMany(() => User, (user) => user.team)
  users: User[]
}
