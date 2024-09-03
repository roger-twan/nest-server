import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class PageSimpleEntity {
  @PrimaryGeneratedColumn('increment')
  page_id: number;

  @Column()
  page_title: string;
}

@Entity('page')
export class PageEntity {
  @PrimaryGeneratedColumn('increment')
  page_id: number;

  @Column()
  page_title: string;

  @Column()
  page_banners?: string;

  @Column()
  page_banner_video_id?: number;

  @Column()
  page_banner_video_post_src?: string;

  @Column()
  page_banner_video_src?: string;

  @Column()
  page_top_nav?: string;

  @Column()
  page_rich_text?: string;

  @Column()
  page_bottom_nav?: string;

  @Column()
  page_identifier?: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;
}
