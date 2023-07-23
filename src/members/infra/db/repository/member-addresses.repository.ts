import { Repository } from 'typeorm';
import { MemberAddressesEntity } from '../entity/member-addresses.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberAddressesRepository extends Repository<MemberAddressesEntity> {
  constructor(
    @InjectRepository(MemberAddressesEntity)
    private readonly repository: Repository<MemberAddressesEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
