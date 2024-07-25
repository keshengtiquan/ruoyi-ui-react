import { request } from '@umijs/max';
import { baseUrl, ResultVo } from '..';
import { UserParams, UserResult, UserTree } from './user';

const url = `${baseUrl}/system/user`;

export async function getDeptTreeApi() {
  return request<{ data: UserTree[] }>(`${url}/deptTree`, {
    method: 'GET',
  });
}

export async function getUserListApi(params: UserParams) {
  return request<{ rows: UserResult[]; total: number }>(`${url}/list`, {
    method: 'GET',
    params,
  });
}

export async function changeStatus(body: { status: '1' | '0'; userId: number | string }) {
  return request<ResultVo<null>>(`${url}/changeStatus`, {
    method: 'PUT',
    data: body,
  });
}
