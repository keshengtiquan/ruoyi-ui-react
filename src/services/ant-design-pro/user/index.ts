import { request } from '@umijs/max';
import { baseUrl } from '..';
import { UserParams, UserResult, UserTree } from './user';

const url = `${baseUrl}/system/user`;

export async function getDeptTreeApi() {
  return request<{ data: UserTree[] }>(`${url}/deptTree`, {
    method: 'GET',
  });
}

export async function getUserListApi(params: UserParams) {
  return request<{rows: UserResult[], total: number}>(`${url}/list`, {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}
