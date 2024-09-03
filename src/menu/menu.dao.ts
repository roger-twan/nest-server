import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { MenuEntity } from './menu.entity';
import { AddMenuReqDto, MenuListReqDto, UpdateMenuReqDto } from './menu.dto';

@Injectable()
export class MenuDao {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
  ) {}

  private async _findMaxOrder(): Promise<number> {
    const maxOrderRow = await this.menuRepository.find({
      select: { menu_order: true },
      order: { menu_order: 'DESC' },
      take: 1
    })

    return maxOrderRow[0] ? maxOrderRow[0].menu_order : 0
  }

  findMenu(query: MenuListReqDto): Promise<MenuEntity[]> {
    return this.menuRepository.find({
      where: query.status ? { menu_status: query.status } : {},
      order: { menu_order: 'DESC' },
      skip: (query.page - 1) * query.page_size,
      take: query.page_size
    });
  }

  findMenuCount(status?: number): Promise<number> {
    return this.menuRepository.count({
      where: status ? { menu_status: status } : {}
    });
  }

  findMenuById(id: number): Promise<MenuEntity> {
    return this.menuRepository.findOneBy({ menu_id: id });
  }

  async addMenu(menu: AddMenuReqDto): Promise<MenuEntity> {
    const maxOrder = await this._findMaxOrder();
    const date = new Date();

    return this.menuRepository.save({
      ...menu,
      menu_type: 2,
      menu_status: 0,
      menu_order: maxOrder + 1,
      create_time: date,
      update_time: date,
    });
  }

  updateMenu(menu: UpdateMenuReqDto): Promise<UpdateResult> {
    const data = {
      ...menu,
      update_time: new Date(),
    }
    const filteredData = {};
    for (const key in data) {
      if (![undefined, null].includes(data[key])) {
        filteredData[key] = data[key];
      }
    }
    return this.menuRepository.update(menu.menu_id, filteredData);
  }

  async setMenuTop(id: number, order: number): Promise<UpdateResult> {
    const maxOrder = await this._findMaxOrder();
    await this.menuRepository
      .createQueryBuilder()
      .update()
      .where('menu.menu_order > :order', { order })
      .set({ menu_order: () => 'menu_order - 1' })
      .execute()
    return this.menuRepository
      .update(id, { menu_order: maxOrder });
  }

  async setMenuOrder(id: number, order: number, type: 'up' | 'down'): Promise<UpdateResult> {
    const targetOrder = type === 'up' ? order + 1 : order - 1

    await this.menuRepository
      .createQueryBuilder()
      .update()
      .where('menu.menu_order = :order', { order: targetOrder })
      .set({ menu_order: order })
      .execute()
    return this.menuRepository
      .update(id, { menu_order: targetOrder });
  }

  deleteMenu(id: number): Promise<DeleteResult> {
    return this.menuRepository.delete(id);
  }
}
