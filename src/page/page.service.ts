import { Injectable } from '@nestjs/common';
import { PageDao } from './page.dao';
import { AddPageReqDto, AddPageResDto, PageDetailReqDto, PageDetailResDto, PageListReqDto, PageListResDto, PageSimpleListResDto, UpdatePageReqDto, UpdatePageResDto } from './page.dto';

@Injectable()
export class PageService {
  constructor(private pageDao: PageDao) {}

  async findAllPage(query: PageListReqDto): Promise<PageListResDto> {
    try {
      const list = await this.pageDao.findPage(query);
      const total = await this.pageDao.findPageCount();
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

  async findAllSimplePage(): Promise<PageSimpleListResDto> {
    try {
      const list = await this.pageDao.findSimplePage();
      return {
        success: true,
        list: list,
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async getPageDetail(query: PageDetailReqDto): Promise<PageDetailResDto> {
    try {
      const page = query.id
        ? await this.pageDao.findPageById(query.id)
        : await this.pageDao.findPageByIdentifier(query?.identifier);
      return {
        success: true,
        data: page
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async addPage(page: AddPageReqDto): Promise<AddPageResDto> {
    try {
       const result = await this.pageDao.addPage(page);
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

  async updatePage(page: UpdatePageReqDto): Promise<UpdatePageResDto> {
    try {
      await this.pageDao.updatePage(page);
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

  async deletePage(id: number): Promise<UpdatePageResDto> {
    try {
      await this.pageDao.deletePage(id);
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
