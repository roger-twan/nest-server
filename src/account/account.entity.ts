import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class AccountBasicEntity {
  @PrimaryGeneratedColumn()
  account_id: number;

  @Column()
  account_email: string;

  @Column()
  account_type: number;

  @Column()
  account_company_ids: string;
}

@Entity('account')
export class AccountEntity extends AccountBasicEntity {
  @Column()
  account_password: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;
}
