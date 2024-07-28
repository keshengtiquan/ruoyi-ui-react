import { request } from '@umijs/max';
import { baseUrl, ResultVo } from '..';

const url = baseUrl + '/system/config';

export async function getConfigKeyApi(configKey: string) {
  return request<ResultVo<null>>(`${url}/configKey/${configKey}`, {
    method: 'GET',
  });
}
