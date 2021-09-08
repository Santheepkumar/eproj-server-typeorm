import { Entity, Column, BaseEntity } from "typeorm";
import CommonEntity from "../common/CommonEntity.entity";

@Entity("app_template_group")
export default class AppTemplateGroup extends CommonEntity {
  @Column({ nullable: true })
  applicationTemplateId: number;
  //   references: {
  //     model: "application_template";
  //     key: "id";
  //   };

  @Column()
  name: string;

  @Column({ default: 0 })
  min: number;

  @Column()
  max: number;
}
