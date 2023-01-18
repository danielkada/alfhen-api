import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity('readings')
export class Reading {
  @PrimaryColumn({ type: 'uuid' })
    id: string;

  @Column({ type: 'varchar', default: 0 })
    current_page: number;

  @Column({ type: 'varchar' })
    book_id: string;

  @Column({ type: 'uuid' })
    user_id: string;

  @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

  @ManyToOne(() => User, user => user.id)
    user: User;

  @ManyToOne(() => Book, book => book.id)
    book: Book;
}
