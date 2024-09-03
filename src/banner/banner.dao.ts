import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BannerEntity } from './banner.entity';
import { AddBannerReqDto, BannerListReqDto, UpdateBannerReqDto } from './banner.dto';

@Injectable()
export class BannerDao {
  constructor(
    @InjectRepository(BannerEntity)
    private bannerRepository: Repository<BannerEntity>,
  ) {}

  private async _findMaxOrder(): Promise<number> {
    const maxOrderRow = await this.bannerRepository.find({
      select: { banner_order: true },
      order: { banner_order: 'DESC' },
      take: 1
    })

    return maxOrderRow[0] ? maxOrderRow[0].banner_order : 0
  }

  findBanner(query: BannerListReqDto): Promise<BannerEntity[]> {
    return this.bannerRepository.find({
      where: query.status ? { banner_status: query.status } : {},
      order: { banner_order: 'DESC' },
      skip: (query.page - 1) * query.page_size,
      take: query.page_size
    });
  }

  findBannerCount(status?: number): Promise<number> {
    return this.bannerRepository.count({
      where: status ? { banner_status: status } : {}
    });
  }

  findBannerById(id: number): Promise<BannerEntity> {
    return this.bannerRepository.findOneBy({ banner_id: id });
  }

  async addBanner(banner: AddBannerReqDto): Promise<BannerEntity> {
    const maxOrder = await this._findMaxOrder();
    const date = new Date();

    return this.bannerRepository.save({
      banner_src: banner.banner_src,
      banner_title: banner.banner_title,
      banner_description: banner.banner_description,
      banner_link: banner.banner_link,
      banner_status: 0,
      banner_order: maxOrder + 1,
      create_time: date,
      update_time: date,
    });
  }

  updateBanner(banner: UpdateBannerReqDto): Promise<UpdateResult> {
    const data = {
      banner_src: banner.banner_src,
      banner_title: banner.banner_title,
      banner_description: banner.banner_description,
      banner_link: banner.banner_link,
      banner_status: banner.banner_status,
      update_time: new Date(),
    }
    const filteredData = {};
    for (const key in data) {
      if (![undefined, null].includes(data[key])) {
        filteredData[key] = data[key];
      }
    }
    return this.bannerRepository.update(banner.banner_id, filteredData);
  }

  async setBannerTop(id: number, order: number): Promise<UpdateResult> {
    const maxOrder = await this._findMaxOrder();
    await this.bannerRepository
      .createQueryBuilder()
      .update()
      .where('banner.banner_order > :order', { order })
      .set({ banner_order: () => 'banner_order - 1' })
      .execute()
    return this.bannerRepository
      .update(id, { banner_order: maxOrder });
  }

  async setBannerOrder(id: number, order: number, type: 'up' | 'down'): Promise<UpdateResult> {
    const targetOrder = type === 'up' ? order + 1 : order - 1

    await this.bannerRepository
      .createQueryBuilder()
      .update()
      .where('banner.banner_order = :order', { order: targetOrder })
      .set({ banner_order: order })
      .execute()
    return this.bannerRepository
      .update(id, { banner_order: targetOrder });
  }

  deleteBanner(id: number): Promise<DeleteResult> {
    return this.bannerRepository.delete(id);
  }
}
