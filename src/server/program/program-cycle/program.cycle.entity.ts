import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import CommonEntity from "../../common/CommonEntity.entity";
import Program from "../program.entity";

@Entity("program_cycles")
export default class ProgramCycle extends CommonEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startDate: Number;

  @Column()
  endDate: Number;

  @ManyToOne(() => Program, (program) => program.programCycles)
  @JoinColumn({ name: "programId" })
  program: Program;

  @Column({ nullable: false })
  programId: number;
}