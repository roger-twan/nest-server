import { Injectable } from '@nestjs/common';
import { BannerDao } from './banner.dao';
import { AddBannerReqDto, AddBannerResDto, BannerDetailResDto, BannerListReqDto, BannerListResDto, UpdateBannerReqDto, UpdateBannerResDto } from './banner.dto';

@Injectable()
export class BannerService {
  constructor(private bannerDao: BannerDao) {}

  async findAllBanner(query: BannerListReqDto): Promise<BannerListResDto> {
    try {
      const list = await this.bannerDao.findBanner(query);
      const total = await this.bannerDao.findBannerCount(query.status);
      return {
        success: true,
        list: list,
        total: total
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async findBannerById(id: number): Promise<BannerDetailResDto> {
    try {
      const banner = await this.bannerDao.findBannerById(id);
      return {
        success: true,
        data: banner
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async addBanner(banner: AddBannerReqDto): Promise<AddBannerResDto> {
    try {
       const result = await this.bannerDao.addBanner(banner);
       return {
        success: true,
        data: result
       }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async updateBanner(banner: UpdateBannerReqDto): Promise<UpdateBannerResDto> {
    try {
      await this.bannerDao.updateBanner(banner);
      return {
        success: true,
      }
   } catch (error) {
     return {
       success: false,
       message: error
     }
   }
  }

  async setBannerTop(id: number, order: number): Promise<UpdateBannerResDto> {
    try {
      await this.bannerDao.setBannerTop(id, order);
      return {
        success: true,
      }
   } catch (error) {
     return {
       success: false,
       message: error
     }
   }
  }

  async setBannerOrder(id: number, order: number, type: 'up' | 'down'): Promise<UpdateBannerResDto> {
    try {
      await this.bannerDao.setBannerOrder(id, order, type);
      return {
        success: true,
      }
   } catch (error) {
     return {
       success: false,
       message: error
     }
   }
  }

  async deleteBanner(id: number): Promise<UpdateBannerResDto> {
    try {
      await this.bannerDao.deleteBanner(id);
      return {
        success: true,
      }
   } catch (error) {
     return {
       success: false,
       message: error
     }
   }
  }
}
