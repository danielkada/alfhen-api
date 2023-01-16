import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity('readings')
export class Reading {
  @PrimaryColumn({ type: 'uuid', unique: true })
    id: string;

  @Column({ type: 'varchar', default: 0 })
    current_page: string;

  @Column({ type: 'uuid' })
    book_id: string;

  @Column({ type: 'uuid' })
    user_id: string;

  @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
    user: User;
}
