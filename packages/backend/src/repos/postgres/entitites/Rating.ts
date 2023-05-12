import moment from 'moment';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany
} from 'typeorm';
import { User } from './User';
import { Request } from './Request';
import { File } from './File';
import { Group } from './Group';

export enum RequestStep {
    ANALISE_RISCO = 'Analise de risco',
    ALINHAMENTO_ESTRATEGICO = 'Alinhamento estratégico'
}

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    rating_id: string;

    @Column({ type: 'text', nullable: false })
    rating: string;

    @ManyToOne(() => User, (user) => user.user_id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Request, (request) => request.request_id)
    @JoinColumn({ name: 'request_id' })
    request: Request;

    @Column({ type: 'text', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: RequestStep,
        nullable: true
    })
    requestStep: RequestStep;

    @ManyToOne(() => Group, (group) => group.ratings, { nullable: true })
    @JoinColumn({ name: 'targetGroup' })
    targetGroup: Group;

    @OneToMany(() => File, (file) => file.rating)
    files: File[];

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