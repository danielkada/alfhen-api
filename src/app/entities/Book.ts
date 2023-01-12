import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Reading } from './Reading';

@Entity('books')
export class Book {
  @PrimaryColumn({ type: 'uuid', unique: true, default: uuid()})
    id: string;

  @OneToMany(() => Reading, reading => reading.book)
    readings: Reading[];
}
