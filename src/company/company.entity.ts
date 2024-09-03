import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class CompanySimpleEntity {
  @PrimaryGeneratedColumn('increment')
  company_id: number;

  @Column()
  company_name: string;

  @Column()
  company_intro: string;
}

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn('increment')
  company_id: number;

  @Column()
  company_name: string;

  @Column()
  company_intro: string;

  @Column()
  company_address: string;

  @Column()
  company_coordinate: string;

  @Column()
  company_order: number;

  @Column()
  company_description: string;

  @Column()
  company_policy: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;
}
