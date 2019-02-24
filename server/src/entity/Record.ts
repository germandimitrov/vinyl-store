import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, JoinTable, RelationId, JoinColumn, ManyToMany, OneToMany, ManyToOne } from "typeorm";
import { Artist } from './Artist';
import { User } from "./User";

@Entity({name: 'records'})
export class Record extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: null})
  name: string;

  @Column({default: null})
  description: string;

  @Column({default: null})
  picture: string;

  @Column('decimal', { precision: 15, scale: 2, default: null })
  price: number;

  @ManyToOne(type => User, user => user.records)
  user: User

  @RelationId((record: Record) => record.artists)
  artistsIds: number[]

  @ManyToMany(type => Artist, artist =>  artist.records)
  artists: Artist[]

}
