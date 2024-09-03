import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CompanyEntity, CompanySimpleEntity } from './company.entity';
import { AddCompanyReqDto, CompanyListReqDto, UpdateCompanyReqDto } from './company.dto';

@Injectable()
export class CompanyDao {
  constructor(
    @InjectRepository(CompanyEntity)
    private CompanyRepository: Repository<CompanyEntity>,
  ) {}

  private async _findMaxOrder(): Promise<number> {
    const maxOrderRow = await this.CompanyRepository.find({
      select: { company_order: true },
      order: { company_order: 'DESC' },
      take: 1
    })

    return maxOrderRow[0] ? maxOrderRow[0].company_order : 0
  }

  findCompany(query: CompanyListReqDto): Promise<CompanyEntity[]> {
    return this.CompanyRepository.find({
      where: {
        company_id: query.companies ? In(query.companies.split(',').map(Number)) : null
      },
      order: { company_order: 'DESC' },
      skip: (query.page - 1) * query.page_size,
      take: query.page_size
    });
  }

  findCompanySimple(query: CompanyListReqDto): Promise<CompanySimpleEntity[]> {
    return this.CompanyRepository.find({
      select: { company_id: true, company_name: true, company_intro: true },
      where: {
        company_id: query.companies ? In(query.companies.split(',').map(Number)) : null
      },
      order: { company_order: 'DESC' },
      skip: (query.page - 1) * query.page_size,
      take: query.page_size
    });
  }

  findCompanyCount(query: CompanyListReqDto): Promise<number> {
    return this.CompanyRepository.count({
      where: {
        company_id: query.companies ? In(query.companies.split(',').map(Number)) : null
      },
    });
  }

  findCompanyById(id: number): Promise<CompanyEntity> {
    return this.CompanyRepository.findOneBy({ company_id: id });
  }

  async addCompany(company: AddCompanyReqDto): Promise<CompanyEntity> {
    const maxOrder = await this._findMaxOrder();
    const date = new Date();

    return this.CompanyRepository.save({
      company_name: company.company_name,
      company_intro: company.company_intro,
      company_address: company.company_address,
      company_coordinate: company.company_coordinate,
      company_description: company.company_description,
      company_policy: company.company_policy,
      company_order: maxOrder + 1,
      create_time: date,
      update_time: date,
    });
  }

  updateCompany(company: UpdateCompanyReqDto): Promise<UpdateResult> {
    const data = {
      company_name: company.company_name,
      company_intro: company.company_intro,
      company_address: company.company_address,
      company_coordinate: company.company_coordinate,
      company_description: company.company_description,
      company_policy: company.company_policy,
      update_time: new Date(),
    }
    const filteredData = {};
    for (const key in data) {
      if (![undefined, null].includes(data[key])) {
        filteredData[key] = data[key];
      }
    }
    return this.CompanyRepository.update(company.company_id, filteredData);
  }

  async setCompanyTop(id: number): Promise<UpdateResult> {
    const maxOrder = await this._findMaxOrder();
    return this.CompanyRepository.update(id, { company_order: maxOrder + 1 });
  }

  deleteCompany(id: number): Promise<DeleteResult> {
    return this.CompanyRepository.delete(id);
  }
}
