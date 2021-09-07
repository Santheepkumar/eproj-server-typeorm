import { Entity, Column, BaseEntity, OneToMany } from "typeorm";
import CommonEntity from "../common/CommonEntity.entity";
import ApplicationTemplateField from "./application.template.field.entity";

export type StatusTypes = "ACTIVE" | "INACTIVE";

@Entity("application_template")
export default class ApplicationTemplate extends CommonEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: ["ACTIVE", "INACTIVE"],
  })
  status: StatusTypes;

  @OneToMany(() => ApplicationTemplateField, (atf) => atf.applicationTemplate)
  applicationTemplateFields: ApplicationTemplateField[];
}
