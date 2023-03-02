import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column()
  password: string

  @Column()
  expire: number

  @Column({ type: 'bigint', width: 14 })
  created: number
}