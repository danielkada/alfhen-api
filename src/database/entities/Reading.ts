import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity('readings')
export class Reading {
  @PrimaryColumn({
    type: 'uuid',
    primary: true,
    generated: 'uuid',
    default: 'uuid_generate_v4()'
  })
    id: string;

  @Column({ type: 'int', default: 0 })
    current_page: number;

  @Column({ type: 'varchar' })
    book_id: string;

  @Column({ type: 'uuid' })
    user_id: string;

  @CreateDateColumn({ type: 'timestamp', default: 'now()' })
    created_at: Date;

  @ManyToOne(() => User, user => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
    user: User;

  @ManyToOne(() => Book, book => book.id, {
    eager: true,
  })
  @JoinColumn({ name: 'book_id' })
    book: Book;
}
