import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class MenuEntity {
  @PrimaryGeneratedColumn('increment')
  menu_id: number;

  @Column()
  menu_name: string;

  @Column()
  menu_type: number;

  @Column()
  menu_link_type: number;

  @Column()
  menu_link_id: string;

  @Column()
  menu_status: number;

  @Column()
  menu_order: number;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;
}
