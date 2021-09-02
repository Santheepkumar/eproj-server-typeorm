import { Exclude } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import { Entity, Column, Index, BeforeInsert } from "typeorm";
import { generateSalt, hashPassword } from "../../utils/secure";
import CommonEntity from "../common/CommonEntity.entity";

@Entity("users")
export default class User extends CommonEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  @Length(4)
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @BeforeInsert()
  async passwordHash() {
    this.salt = generateSalt();
    this.password = await hashPassword(this.password, this.salt);
  }
}
