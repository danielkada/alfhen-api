import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('readings')
export class Reading {
  @PrimaryColumn({ type: 'uuid', unique: true, default: uuid() })
    id: string;

  @Column({ type: 'varchar', default: 0 })
    current_page: string;

  @Column({ type: 'uuid', default: uuid() })
    book_id: string;

  @Column({ type: 'uuid', default: uuid() })
    user_id: string;

  @CreateDateColumn({ type: 'timestamp', default: Date.now() })
    created_at: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
    user: User;
}
