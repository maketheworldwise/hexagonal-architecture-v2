import { Members } from '../../domain/members';
import { MembersEntity } from '../../infra/db/entity/members.entity';

export const CreateMemberPortToken = Symbol('CreateMemberPortService');

export interface ICreateMemberPort {
  create(member: Members): Promise<MembersEntity>;
}
