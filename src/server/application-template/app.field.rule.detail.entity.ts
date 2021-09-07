import { Entity, Column, BaseEntity } from "typeorm";
import CommonEntity from "../common/CommonEntity.entity";

export type OperationTypes = "eq" | "ne" | "lt" | "gt" | "lte" | "gte";

@Entity("app_field_rule_detail")
export default class AppFieldRuleDetail extends CommonEntity {
  @Column()
  appFieldRuleId: number;
  // references: {
  //   model: "app_field_rule";
  //   key: "id";
  // };
  @Column()
  depFieldId: number;
  // references: {
  //   model: "app_field_rule";
  //   key: "id";
  // };

  @Column({
    type: "enum",
    enum: ["eq", "ne", "lt", "gt", "lte", "gte"],
  })
  operation: OperationTypes;

  @Column({ default: false })
  values: string[];

  @Column()
  show: boolean;

  @Column({ default: false })
  required: boolean;

  @Column({ default: false })
  disabled: boolean;
}
