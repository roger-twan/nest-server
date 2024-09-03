import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('video')
export class VideoEntity {
  @PrimaryGeneratedColumn('increment')
  video_id: number;

  @Column()
  video_src: string;

  @Column()
  video_poster: string;

  @Column()
  video_name: string;

  @Column()
  video_title: string;

  @Column()
  video_description?: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;
}
