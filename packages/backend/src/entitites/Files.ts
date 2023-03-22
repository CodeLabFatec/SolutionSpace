import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  file_id: number

  @Column({ type: 'text', nullable: false })
  file_name: string

  @Column({ type: 'text', nullable: false })
  base64: string

  @Column({ type: 'text', nullable: false })
  ext: string
}
