import User from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  phone_number: string;

  @ManyToOne(() => User, (user) => user.contacts, { nullable: false })
  user: User;

  @Column()
  picture_uri: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  address: string; // Campo para guardar la dirección
}
