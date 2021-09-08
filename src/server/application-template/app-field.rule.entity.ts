import { Entity, Column } from "typeorm";
import CommonEntity from "../common/CommonEntity.entity";

@Entity("app_field_rule")
export default class AppFieldRule extends CommonEntity {
  @Column({ nullable: true })
  fieldId: number;
  // references: {
  //   model: "application_template_field";
  //   key: "id";
  // };
}
