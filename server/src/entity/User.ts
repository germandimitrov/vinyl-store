import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Record } from './Record';
import { Artist } from "./Artist";
import { Vote } from "./Vote";
import { Role } from './Role';

@Entity({name: "users"})
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: null})
  username: string;

  @Column({default: null, unique: true})
  email: string;

  @Column({default: null})
  address: string;

  @Column({default: null})
  phone: number;

  @Column({default: null})
  rating: number

  @Column({default: null})
  active: boolean

  @Column({default: null })
  picture: string;

  @Column({ select: false })
  password: string

  @Column({ select: false })
  salt: string

  @OneToMany(type => Record, records => records.user)
  records: Record[]

  @OneToMany(type => Role, role => role.user)
  roles: Role[]

  @OneToMany(type => Artist, artist => artist.user)
  artist: Artist[]

  @OneToMany(type => Vote, Vote => Vote.rater)
  rater: Vote[]

  @OneToMany(type => Vote, Vote => Vote.rated)
  rated: Vote[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
