import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class ApplicationSimpleEntity {
  @Column()
  application_id: number;

  @Column()
  application_job_title: string;

  @Column()
  application_company_name: string;
}

export class ApplicationBasicEntity {
  @Column()
  applicant_name: string;

  @Column()
  applicant_contact: string;

  @Column()
  applicant_resume_src: string;

  @Column()
  application_job_title: string;

  @Column()
  application_company_id: number;

  @Column()
  application_company_name: string;

  @Column()
  application_department: string;

  @Column()
  application_job_id: number;

  @Column()
  applicant_openid: string;
}

@Entity('application')
export class ApplicationEntity extends ApplicationBasicEntity {
  @PrimaryGeneratedColumn('increment')
  application_id: number;

  @Column()
  application_status: number;

  @Column()
  apply_time: Date;

  @Column()
  update_time: Date;
}
