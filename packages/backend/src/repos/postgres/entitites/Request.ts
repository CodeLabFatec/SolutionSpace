import moment from 'moment';
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
import { User } from './User';
import { File } from './File';
import { StatusConfiguration } from './StatusConfiguration';
import { Rating } from './Rating';
import { Kanban } from './Kanban';
import { Group } from './Group';

export enum RequestType {
    FEATURE = 'feature',
    HOTFIX = 'hotfix'
}

@Entity('requests')
export class Request {
    @PrimaryGeneratedColumn('uuid')
    request_id: string;

    @Column({ type: 'text', nullable: false })
    title: string;

    @ManyToOne(() => StatusConfiguration, (status) => status.requests, { nullable: true })
    @JoinColumn({ name: 'status_id' })
    status!: StatusConfiguration | null;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: RequestType,
        nullable: true
    })
    requestType: RequestType;

    @ManyToOne(() => User, (user) => user.user_id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'text', nullable: false })
    requestStep: string;

    @OneToMany(() => File, (file) => file.request)
    files: File[];

    @ManyToOne(() => Kanban, (kanban) => kanban.kanban_id, { nullable: true })
    @JoinColumn({ name: 'kanban_id' })
    kanban!: Kanban | null;

    @ManyToOne(() => Group, (group) => group.users, { nullable: true })
    @JoinColumn({ name: 'group_id' })
    group!: Group | null;

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

    @Column({ type: 'boolean', nullable: false, default: false })
    arquived: boolean

    @Column({ type: 'boolean', nullable: false, default: false })
    approved: boolean

    @OneToMany(() => Rating, (rating) => rating.request)
    ratings: Rating[];
}