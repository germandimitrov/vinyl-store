import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, OneToMany } from "typeorm";
import { Record } from './Record';
import { Artist } from "./Artist";

@Entity({name: "users"})
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: null})
  firstName: string;

  @Column({default: null})
  lastName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string

  @Column({ select: false })
  salt: string

  @OneToMany(type => Record, records => records.user)
  records: Record[]

  @OneToMany(type => Artist, artist => artist.user)
  artist: Artist[]

}
