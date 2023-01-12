import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Book } from './Book';
import { User } from './User';

@Entity('readings')
export class Reading {
  @PrimaryColumn({ type: 'uuid', unique: true, default: uuid() })
    id: string;

  @Column({ type: 'number', default: 0 })
    current_page: number;


  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
    user: User;

  @ManyToOne(() => Book, book => book.id)
  @JoinColumn({ name: 'book_id' })
    book: Book;

  @Column({ type: 'timestamp', default: Date.now() })
    created_at: Date;
}
