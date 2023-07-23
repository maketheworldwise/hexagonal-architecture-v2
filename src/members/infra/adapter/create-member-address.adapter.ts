import { Injectable } from '@nestjs/common';
import { ICreateMemberAddressPort } from '../../application/port/i.create-member-address.port';
import { MemberAddressesRepository } from '../db/repository/member-addresses.repository';
import { MemberAddresses } from '../../domain/member-addresses';
import { MemberAddressesMapper } from '../db/mapper/member-addresses.mapper';

@Injectable()
export class CreateMemberAddressAdapter implements ICreateMemberAddressPort {
  constructor(
    private readonly memberAddressesRepository: MemberAddressesRepository,
  ) {}

  async create(address: MemberAddresses): Promise<void> {
    const entity = MemberAddressesMapper.toEntity(address);
    await this.memberAddressesRepository.save(entity);
  }
}
