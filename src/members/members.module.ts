import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersEntity } from './infra/db/entity/members.entity';
import { MemberAddressesEntity } from './infra/db/entity/member-addresses.entity';
import { JoinMemberController } from './interface/controller/join-member.controller';
import { MyPageController } from './interface/controller/my-page.controller';
import { JoinMemberUsecaseToken } from './interface/external/i.join-member.usecase';
import { JoinMemberService } from './application/usecase/join-member.service';
import { GetMemberInfoQueryToken } from './interface/external/i.get-member-info.query';
import { GetMemberInfoQuery } from './application/query/get-member-info.query';
import { MembersRepository } from './infra/db/repository/members.repository';
import { MemberAddressesRepository } from './infra/db/repository/member-addresses.repository';
import { CreateMemberPortToken } from './application/port/i.create-member.port';
import { CreateMemberAdapter } from './infra/adapter/create-member.adapter';
import { CreateMemberAddressPortToken } from './application/port/i.create-member-address.port';
import { CreateMemberAddressAdapter } from './infra/adapter/create-member-address.adapter';
import { ReadMemberAdapter } from './infra/adapter/read-member.adapter';

const application: Provider[] = [
  {
    provide: JoinMemberUsecaseToken,
    useClass: JoinMemberService,
  },
  {
    provide: GetMemberInfoQueryToken,
    useClass: GetMemberInfoQuery,
  },
];

const persistence: Provider[] = [
  MembersRepository,
  MemberAddressesRepository,
  {
    provide: CreateMemberPortToken,
    useClass: CreateMemberAdapter,
  },
  {
    provide: CreateMemberAddressPortToken,
    useClass: CreateMemberAddressAdapter,
  },
];

const services: Provider[] = [ReadMemberAdapter];

@Module({
  imports: [TypeOrmModule.forFeature([MembersEntity, MemberAddressesEntity])],
  controllers: [JoinMemberController, MyPageController],
  providers: [...application, ...persistence, ...services],
  exports: [...application, ...persistence, ...services],
})
export class MembersModule {}
