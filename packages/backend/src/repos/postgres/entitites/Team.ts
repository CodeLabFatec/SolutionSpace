import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';
import { Group } from './Group';

@Entity('teams')
export class Team {
    @PrimaryGeneratedColumn('uuid')
    team_id: string;

    @Column({ type: 'text', unique: true, nullable: false })
    team_name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    permissionCreateUsers: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    permissionCreateTeams: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    permissionCreateGroups: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    permissionEditRequests: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    permissionUnarchiveRequests: boolean

    @OneToMany(() => User, (user) => user.team)
    users: User[];

    @OneToMany(() => Group, (group) => group.team)
    groups: Group[];
}