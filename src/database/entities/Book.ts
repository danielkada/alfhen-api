import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Reading } from './Reading';

@Entity('books')
export class Book {
  @PrimaryColumn({
    type: 'varchar',
    primary: true,
  })
    id: string;

  @Column({ type: 'varchar' })
    title: string;

  @Column({ type: 'varchar', nullable: true })
    subtitle: string | null;

  @Column({ array: true })
    authors: string;

  @Column({ type: 'varchar', nullable: true })
    publishedDate: string | null;

  @Column({ type: 'varchar' })
    description: string;

  @Column({ type: 'int' })
    numberOfPages: number;

  @Column({ type: 'varchar', nullable: true })
    imageURL: string | null;

  @OneToMany(() => Reading, reading => reading.book)
    readings: Reading[];
}
