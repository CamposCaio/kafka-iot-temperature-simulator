import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'jsonb', nullable: false })
  message: unknown;
}
