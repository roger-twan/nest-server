import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class LabelBasicEntity {
  @Column()
  label_name: string;

  @Column()
  label_category_id: number;
}

@Entity('label')
export class LabelEntity extends LabelBasicEntity {
  @PrimaryGeneratedColumn('increment')
  label_id: number;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;
}
