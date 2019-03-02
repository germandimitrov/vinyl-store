import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, JoinTable, ManyToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

export enum Name {
  Admin = 'Admin',
  User = 'User'
}

@Entity({ name: 'roles' })

export class Role extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  name: Name

  @ManyToOne(type => User, user => user.roles )
  user: User

}
