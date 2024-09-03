import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('banner')
export class BannerEntity {
  @PrimaryGeneratedColumn('increment')
  banner_id: number;

  @Column()
  banner_src: string;

  @Column()
  banner_title?: string;

  @Column()
  banner_description?: string;

  @Column()
  banner_link?: string;

  @Column()
  banner_status: number;

  @Column()
  banner_order: number;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;
}
