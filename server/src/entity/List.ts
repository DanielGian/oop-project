import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity("list")
export class List extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  title: string;

  @Column({ type: "simple-array", nullable: true })
  ids: number[];

  @ManyToOne(_type => User, user => user.lists)
  user: User;
}
