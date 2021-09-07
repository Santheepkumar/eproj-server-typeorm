import { Entity, Column, BaseEntity } from "typeorm";
import CommonEntity from "../common/CommonEntity.entity";

@Entity("app_template_group_key")
export default class AppTemplateGroupKey extends CommonEntity {
  @Column()
  applicationTemplateId: number;
  //   references: {
  //     model: "application_template";
  //     key: "id";
  //   };
  
  @Column()
  name: string;
}
