import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Reading } from './Reading';

@Entity('users')
export class User {
  @PrimaryColumn({
    type: 'uuid',
    primary: true,
    generated: 'uuid',
    default: 'uuid_generate_v4()'
  })
    id: string;

  @Column({ type: 'varchar' })
    name: string;

  @Column({ type: 'varchar' })
    surname: string;

  @Column({ type: 'varchar', unique: true })
    username: string;

  @Column({ type: 'varchar' })
    password: string;

  @CreateDateColumn({ type: 'timestamp', default: 'now()' })
    created_at: Date;

  @OneToMany(() => Reading, reading => reading.user)
    readings: Reading[];
}
