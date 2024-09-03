import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { LabelBasicEntity, LabelEntity } from './label.entity';

@Injectable()
export class LabelDao {
  constructor(
    @InjectRepository(LabelEntity)
    private labelRepository: Repository<LabelEntity>,
  ) {}

  findLabel(ids?: number[]): Promise<LabelEntity[]> {
    return this.labelRepository.find({ where: ids ? { label_id: In(ids) } : null });
  }

  async addLabels(data: LabelBasicEntity[]): Promise<void> {
    const date = new Date();

    this.labelRepository.save(data.map((item: LabelBasicEntity) => {
      return {
        ...item,
        create_time: date,
        update_time: date,
      }
    }));
  }

  deleteLabels(ids: number[]): Promise<DeleteResult> {
    return this.labelRepository.delete(ids);
  }
}
