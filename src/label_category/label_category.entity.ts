import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('label_category')
export class LabelCategoryEntity {
  @PrimaryGeneratedColumn('increment')
  label_category_id: number;

  @Column()
  label_category_name: string;

  @Column()
  label_category_type: number;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;
}
