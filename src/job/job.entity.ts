import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job')
export class JobEntity {
  @PrimaryGeneratedColumn('increment')
  job_id: number;

  @Column()
  job_title: string;

  @Column()
  job_department: string;

  @Column()
  job_company_id: number;

  @Column()
  job_label_ids?: string;

  @Column()
  job_detail: string;

  @Column()
  job_status: number;

  @Column()
  job_custom_salary: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;
}
