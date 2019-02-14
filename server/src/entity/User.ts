import {Entity, PrimaryGeneratedColumn, BaseEntity, Column} from "typeorm";

@Entity({name: "users"})
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string

  @Column()
  lastName: string;

}
