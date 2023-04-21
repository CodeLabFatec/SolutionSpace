import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './User'
import { Team } from './Team'

@Entity('groups')
export class Group {
    @PrimaryGeneratedColumn('uuid')
    group_id: string

    @Column({ type: 'text', unique: true, nullable: false })
    group_name: string

    @Column({ type: 'boolean', nullable: false, default: false })
    canRequestFeatures: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    canRequestHotfix: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    canRatingAnalise: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    mustRateAnalise: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    canRatingAnalinhamento: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    mustRateAnalinhamento: boolean

    @ManyToOne(() => Team, (team) => team.users)
    @JoinColumn({ name: 'team_id' })
    team: Team

    @OneToMany(() => User, (user) => user.team)
    users: User[]
}
