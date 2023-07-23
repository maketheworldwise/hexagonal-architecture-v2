import { Injectable } from '@nestjs/common';
import { ICreateMemberPort } from '../../application/port/i.create-member.port';
import { MembersRepository } from '../db/repository/members.repository';
import { MembersEntity } from '../db/entity/members.entity';
import { Members } from '../../domain/members';
import { MembersMapper } from '../db/mapper/member.mapper';

@Injectable()
export class CreateMemberAdapter implements ICreateMemberPort {
  constructor(private readonly membersRepository: MembersRepository) {}

  async create(member: Members): Promise<MembersEntity> {
    const entity = MembersMapper.toEntity(member);
    return await this.membersRepository.save(entity);
  }
}
