import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/_decorator/role.decorator';
import { AddMenuReqDto, AddMenuResDto, MenuDetailReqDto, MenuDetailResDto, MenuListReqDto, MenuListResDto, DeleteMenuReqDto, SetMenuTopReqDto, UpdateMenuReqDto, UpdateMenuResDto, SetMenuOrderReqDto } from './menu.dto';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Roles(Role.Admin)
  @Get('list')
  getList(@Query() query: MenuListReqDto): Promise<MenuListResDto> {
    return this.menuService.findAllMenu(query);
  }

  @Roles(Role.Admin)
  @Get('detail')
  getMenuById(@Query() query: MenuDetailReqDto): Promise<MenuDetailResDto> {
    return this.menuService.findMenuById(query.id);
  }

  @Roles(Role.Admin)
  @Post('add')
  addMenu(@Body() menu: AddMenuReqDto): Promise<AddMenuResDto> {
    return this.menuService.addMenu(menu);
  }

  @Roles(Role.Admin)
  @Post('update')
  updateMenu(@Body() menu: UpdateMenuReqDto): Promise<UpdateMenuResDto> {
    return this.menuService.updateMenu(menu);
  }

  @Roles(Role.Admin)
  @Post('set_top')
  setMenuTop(@Body() body: SetMenuTopReqDto): Promise<UpdateMenuResDto> {
    return this.menuService.setMenuTop(body.menu_id, body.menu_order);
  }

  @Roles(Role.Admin)
  @Post('set_order')
  setBannerOrder(@Body() body: SetMenuOrderReqDto): Promise<UpdateMenuResDto> {
    return this.menuService.setMenuOrder(body.menu_id, body.menu_order, body.type);
  }

  @Roles(Role.Admin)
  @Post('delete')
  deleteMenu(@Body() body: DeleteMenuReqDto): Promise<UpdateMenuResDto> {
    return this.menuService.deleteMenu(body.menu_id);
  }
}
