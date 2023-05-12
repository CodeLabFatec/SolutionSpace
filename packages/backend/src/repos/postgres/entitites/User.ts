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
} from 'typeorm';
import { Team } from './Team';
import moment from 'moment-timezone';
import { Group } from './Group';
import { dataEncrypt } from '../../../utils/encryptor';
import { Notifications } from './Notifications';

export enum Genders {
    MALE = 'male',
    FEMALE = 'female',
    OTHERS = 'others'
}


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({
        type: 'enum',
        enum: Genders,
        nullable: true
    })
    gender: Genders;

    @Column({ type: 'text', unique: true, nullable: false })
    email: string;

    @Column({ type: 'text', nullable: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = dataEncrypt(this.password);
    }

    @ManyToOne(() => Team, (team) => team.users)
    @JoinColumn({ name: 'team_id' })
    team: Team;

    @ManyToOne(() => Group, (group) => group.users)
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @OneToMany(() => Notifications, (notifications) => notifications.user)
    notifications: Notifications[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    insertCreated() {
        this.created_at = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'));
        this.updated_at = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'));
    }

    @BeforeUpdate()
    insertUpdated() {
        this.updated_at = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'));
    }
}