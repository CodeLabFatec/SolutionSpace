import moment from 'moment';
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
} from 'typeorm';
import { User } from './User';

@Entity('notifications')
export class Notifications {
    @PrimaryGeneratedColumn('uuid')
    notification_id: string;

    @Column({ type: 'text', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    hasRead: boolean;

    @ManyToOne(() => User, (user) => user.user_id, { 
        onDelete: 'CASCADE' 
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

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