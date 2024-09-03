import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PageEntity, PageSimpleEntity } from './page.entity';
import { AddPageReqDto, PageListReqDto, UpdatePageReqDto } from './page.dto';

@Injectable()
export class PageDao {
  constructor(
    @InjectRepository(PageEntity)
    private pageRepository: Repository<PageEntity>,
  ) {}

  findPage(query: PageListReqDto): Promise<PageEntity[]> {
    return this.pageRepository.find({
      order: { page_id: 'DESC' },
      skip: (query.page - 1) * query.page_size,
      take: query.page_size
    });
  }

  findSimplePage(): Promise<PageSimpleEntity[]> {
    return this.pageRepository.find({
      order: { page_id: 'DESC' },
      select: ['page_id', 'page_title']
    });
  }

  findPageCount(): Promise<number> {
    return this.pageRepository.count();
  }

  findPageById(id: number): Promise<PageEntity> {
    return this.pageRepository.findOneBy({ page_id: id });
  }

  findPageByIdentifier(identifier: string): Promise<PageEntity> {
    return this.pageRepository.findOneBy({ page_identifier: identifier });
  }

  async addPage(page: AddPageReqDto): Promise<PageEntity> {
    const date = new Date();

    return this.pageRepository.save({
      ...page,
      create_time: date,
      update_time: date,
    });
  }

  updatePage(page: UpdatePageReqDto): Promise<UpdateResult> {
    const data = {
      ...page,
      update_time: new Date(),
    }
    const filteredData = {};
    for (const key in data) {
      if (![undefined, null].includes(data[key])) {
        filteredData[key] = data[key];
      }
    }
    return this.pageRepository.update(page.page_id, filteredData);
  }

  deletePage(id: number): Promise<DeleteResult> {
    return this.pageRepository.delete(id);
  }
}
