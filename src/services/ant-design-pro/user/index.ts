import { request } from '@umijs/max';
import { baseUrl } from '..';
import { UserTree } from './user';

export async function getDeptTreeApi() {
  return request<{ data: UserTree[] }>(`${baseUrl}/system/user/deptTree`, {
    method: 'GET',
  });
}
