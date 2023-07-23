import { IJoinMemberUsecase } from '../../interface/external/i.join-member.usecase';
import { JoinMemberCommand } from '../command/join-member.command';
import { JoinMemberAddressCommand } from '../command/join-member-address.command';
import {Inject, Injectable} from '@nestjs/common';
import {
  CreateMemberPortToken,
  ICreateMemberPort,
} from '../port/i.create-member.port';
import {
  CreateMemberAddressPortToken,
  ICreateMemberAddressPort,
} from '../port/i.create-member-address.port';
import {Transactional} from "typeorm-transactional";
import {Members} from "../../domain/members";
import {MemberAddresses} from "../../domain/member-addresses";

@Injectable()
export class JoinMemberService implements IJoinMemberUsecase {
  @Inject(CreateMemberPortToken)
  private readonly createMemberAdapter: ICreateMemberPort;

  @Inject(CreateMemberAddressPortToken)
  private readonly createMemberAddressAdapter: ICreateMemberAddressPort;

  @Transactional()
  async join(
      member: JoinMemberCommand,
      address: JoinMemberAddressCommand,
  ): Promise<void> {
    // business logic
    const memberDomain = new Members({
      id: member.getId(),
      name: member.getName(),
      email: member.getEmail(),
      gender: member.getGender(),
      age: member.getAge(),
      status: member.getStatus(),
      createdAt: member.getCreatedAt(),
      updatedAt: member.getUpdatedAt(),
    });

    const memberEntity = await this.createMemberAdapter.create(memberDomain);
    const memberId = memberEntity.id

    const memberAddressDomain = new MemberAddresses({
      id: address.getId(),
      memberId: memberId,
      zipcode: address.getZipcode(),
      address1: address.getAddress1(),
      address2: address.getAddress2(),
    })
    await this.createMemberAddressAdapter.create(memberAddressDomain);
  }
}