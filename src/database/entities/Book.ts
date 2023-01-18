import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Reading } from './Reading';

@Entity('books')
export class Book {
  @PrimaryColumn({ type: 'uuid' })
    id: string;

  @Column({ type: 'varchar' })
    title: string;

  @Column({ array: true })
    authors: string;

  @Column({ type: 'varchar' })
    publishedDate: string;

  @Column({ type: 'varchar' })
    description: string;

  @Column({ type: 'int' })
    numberOfPages: number;

  @OneToMany(() => Reading, reading => reading.book)
    readings: Reading[];
}
