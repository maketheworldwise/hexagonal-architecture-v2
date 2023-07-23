import { IGetMemberInfoQuery } from '../../interface/external/i.get-member-info.query';
import { ReadMemberAdapter } from '../../infra/adapter/read-member.adapter';
import {Injectable} from "@nestjs/common";

@Injectable()
export class GetMemberInfoQuery implements IGetMemberInfoQuery {
  constructor(private readonly readMemberAdapter: ReadMemberAdapter) {}

  async get(memberId: number): Promise<any> {
    const memberEntity = await this.readMemberAdapter.findMemberInfo(memberId);
    return {
      name: memberEntity.name,
      email: memberEntity.email,
      gender: memberEntity.gender,
      age: memberEntity.age,
    };
  }
}
