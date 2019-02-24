import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Record } from './Record';
import { User } from './User';

@Entity({name: 'artists'})
export class Artist extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: null})
  name: string;

  @ManyToOne(type => User, user => user.artist)
  user: User

  @ManyToMany(type => Record, record =>  record.artists)
  @JoinTable({name: 'artists_records'})
  records: Record[]

}
