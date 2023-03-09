import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Status {
  INPROGRESS = 'in-progress',
  SUCCESS = 'success'
}


@Entity({ name: "todo" })
export class TodoEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number

  @Column({ type: 'varchar', length: 191 })
  public description: string

  @Column({
    type: "enum", enum: Status,
    default: Status.INPROGRESS
  })
  public status: Status

  /*
  * Create and Update Date Columns
  */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
