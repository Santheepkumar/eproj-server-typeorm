import { Entity, Column, BaseEntity } from "typeorm";
import CommonEntity from "../common/CommonEntity.entity";

@Entity("app_group_instance")
export default class AppTemplateGroupInstance extends CommonEntity {
  @Column()
  groupId: number;
  //   references: {
  //     model: "app_template_group";
  //     key: "id";
  //   };

  @Column()
  applicationId: number;
  //   references: {
  //     model: "application",
  //     key: "id"
  //   }
}
