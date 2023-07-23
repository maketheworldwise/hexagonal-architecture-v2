import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from '../entity/members.entity';

@Injectable()
export class MembersRepository extends Repository<MembersEntity> {
  constructor(
    @InjectRepository(MembersEntity)
    private readonly repository: Repository<MembersEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
