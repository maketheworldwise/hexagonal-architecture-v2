import { MemberAddresses } from '../../domain/member-addresses';

export const CreateMemberAddressPortToken = Symbol(
  'CreateMemberAddressPortService',
);

export interface ICreateMemberAddressPort {
  create(address: MemberAddresses): Promise<void>;
}
