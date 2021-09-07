import { Entity, Column, BaseEntity } from "typeorm";
import CommonEntity from "../common/CommonEntity.entity";

@Entity("app_template_group_key")
export default class AppTemplateGroupKey extends CommonEntity {
  @Column()
  groupId: number;
  //   references: {
  //     model: "app_template_group";
  //     key: "id";
  //   };

  @Column()
  fieldId: number;
  // references: {
  //   model: "application_template_field";
  //   key: "id";
  // };
}
