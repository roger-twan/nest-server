import { Injectable } from '@nestjs/common';
import { MenuDao } from './menu.dao';
import { AddMenuReqDto, AddMenuResDto, MenuDetailResDto, MenuListReqDto, MenuListResDto, UpdateMenuReqDto, UpdateMenuResDto } from './menu.dto';

@Injectable()
export class MenuService {
  constructor(private menuDao: MenuDao) {}

  async findAllMenu(query: MenuListReqDto): Promise<MenuListResDto> {
    try {
      const list = await this.menuDao.findMenu(query);
      const total = await this.menuDao.findMenuCount(query.status);
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

  async findMenuById(id: number): Promise<MenuDetailResDto> {
    try {
      const menu = await this.menuDao.findMenuById(id);
      return {
        success: true,
        data: menu
      }
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async addMenu(menu: AddMenuReqDto): Promise<AddMenuResDto> {
    try {
       const result = await this.menuDao.addMenu(menu);
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

  async updateMenu(menu: UpdateMenuReqDto): Promise<UpdateMenuResDto> {
    try {
      await this.menuDao.updateMenu(menu);
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

  async setMenuTop(id: number, order: number): Promise<UpdateMenuResDto> {
    try {
      await this.menuDao.setMenuTop(id, order);
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

  async setMenuOrder(id: number, order: number, type: 'up' | 'down'): Promise<UpdateMenuResDto> {
    try {
      await this.menuDao.setMenuOrder(id, order, type);
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

  async deleteMenu(id: number): Promise<UpdateMenuResDto> {
    try {
      await this.menuDao.deleteMenu(id);
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
