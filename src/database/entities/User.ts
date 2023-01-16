import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Reading } from './Reading';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'uuid', unique: true })
    id: string;

  @Column({ type: 'text' })
    name: string;

  @Column({ type: 'text' })
    surname: string;

  @Column({ type: 'text', unique: true })
    username: string;

  @Column({ type: 'text' })
    password: string;

  @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

  @OneToMany(() => Reading, reading => reading.user)
    readings: Reading[];
}
