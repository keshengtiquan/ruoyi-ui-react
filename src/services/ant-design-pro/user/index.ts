import { request } from '@umijs/max';
import { baseUrl, ID, ResultVo } from '..';
import { AddUser, AuthRole, UserModal, UserParams, UserResult, UserTree } from './user';
import { parseStrEmpty } from '@/utils/ruoyi';

const url = `${baseUrl}/system/user`;

/**
 * 获取部门树
 * @returns
 */
export async function getDeptTreeApi() {
  return request<{ data: UserTree[] }>(`${url}/deptTree`, {
    method: 'GET',
  });
}

/**
 * 获取用户列表
 * @param params
 * @returns
 */
export async function getUserListApi(params: UserParams) {
  return request<{ rows: UserResult[]; total: number }>(`${url}/list`, {
    method: 'GET',
    params,
  });
}

/**
 * 修改用户状态
 * @param body
 * @returns
 */
export async function changeStatus(body: { status: '1' | '0'; userId: number | string }) {
  return request<ResultVo<null>>(`${url}/changeStatus`, {
    method: 'PUT',
    data: body,
  });
}

/**
 * 获取用户信息
 * @param userId
 */
export async function getUserApi(userId: string | number | null) {
  return request<{ data: UserModal }>(url + '/' + parseStrEmpty(userId), {
    method: 'get',
  });
}

/**
 * 添加用户
 * @param data AddUser
 * @returns
 */
export async function addUserApi(data: AddUser) {
  return request<ResultVo<null>>(url, {
    method: 'POST',
    data: data,
  });
}

/**
 * 修改用户
 * @param data
 * @returns
 */
export async function updateUserApi(data: AddUser & { userId: ID }) {
  return request<ResultVo<null>>(url, {
    method: 'PUT',
    data: data,
  });
}

/**
 * 删除用户
 * @param userId
 * @returns
 */
export async function delUserApi(userId: ID[]) {
  return request<ResultVo<null>>(url + '/' + userId, {
    method: 'DELETE',
  });
}
/**
 * 重置用户密码
 * @param data
 * @returns
 */
export async function resetUserPasswordApi(data: { userId: ID; password: string }) {
  return request(url + '/resetPwd', {
    method: 'PUT',
    data: data,
  });
}

/**
 * 查询分配角色
 * @param userId
 * @returns
 */
export async function authRoleApi(userId: ID) {
  return request<{ data: AuthRole }>(url + `/authRole/${userId}`, {
    method: 'GET',
  });
}

export async function updateAuthRoleApi(data: { userId: ID; roleIds: string }) {
  return request<ResultVo<null>>(url + '/authRole', {
    method: 'PUT',
    params: data,
  });
}
