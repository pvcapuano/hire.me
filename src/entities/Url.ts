import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("urls")
export class Url {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  original_url!: string;

  @Column({ type: "text", unique: true })
  custom_alias!: string;

  @Column({ type: "int", default: 0 })
  access_count!: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
