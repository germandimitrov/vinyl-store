import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Record } from './Record';
import { User } from './User';

@Entity({ name: 'votes' })
export class Vote extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.rater)
  rater: User;

  @ManyToOne(type => User, user => user.rated)
  rated: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
