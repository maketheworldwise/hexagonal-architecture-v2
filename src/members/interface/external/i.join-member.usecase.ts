import { JoinMemberCommand } from '../../application/command/join-member.command';
import { JoinMemberAddressCommand } from '../../application/command/join-member-address.command';

export const JoinMemberUsecaseToken = Symbol('JoinMemberUsecase');

export interface IJoinMemberUsecase {
  join(
    member: JoinMemberCommand,
    address: JoinMemberAddressCommand,
  ): Promise<void>;
}
