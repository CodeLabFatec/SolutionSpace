import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('kanban')
export class Kanban {
    @PrimaryGeneratedColumn('uuid')
    kanban_id: string;

    @Column({ type: 'text', nullable: false })
    column: string;
}