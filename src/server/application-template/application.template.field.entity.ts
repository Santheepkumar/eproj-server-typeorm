import { Entity, Column, BaseEntity, ManyToOne } from "typeorm";
import CommonEntity from "../common/CommonEntity.entity";
import ApplicationTemplate from "./application.template.entity";

export type UiComponentTypes = "Select" | "Radio" | "Checkbox";

@Entity("application_template_field")
export default class ApplicationTemplateField extends CommonEntity {
  @Column({ nullable: true })
  applicationTemplateId: number;
  //   references: {
  //     model: "application_template";
  //     key: "id";
  //   };

  @ManyToOne(() => ApplicationTemplate, (at) => at.applicationTemplateFields, {
    onDelete: "CASCADE",
  })
  applicationTemplate: ApplicationTemplate;

  @Column()
  label: string;

  @Column()
  type: string;

  @Column({ default: false })
  required: boolean;

  @Column({ nullable: true })
  order: number;

  //   @Column()
  //   metaDataTypeId: number;
  //   references: {
  //     model: "meta_data_type";
  //     key: "id";
  //   };

  @Column({ nullable: true })
  sectionId: number;
  //   references: {
  //     model: "app_template_section";
  //     key: "id";
  //   };

  @Column({ nullable: true })
  groupId: number;
  //   references: {
  //     model: "app_template_group";
  //     key: "id";
  //   };

  @Column({
    type: "jsonb",
    array: false,
    nullable: true,
  })
  validation: JSON;

  @Column({ default: false })
  multipleValues: boolean;

  @Column({
    nullable: true,
    type: "enum",
    enum: ["Select", "Radio", "Checkbox"],
  })
  operation: UiComponentTypes;
}
