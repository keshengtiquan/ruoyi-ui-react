import { request } from '@umijs/max';
import { baseUrl } from '..';
import { DictData } from './dict';

const url = `${baseUrl}/system/dict/data`;

/**
 * 根据字典类型查询字典数据信息
 *
 * @param dictType 字典类型
 */
export async function getDictByType(dictType: string) {
  return request<{data: DictData[]}>(`${url}/type/${dictType}`, {
    method: 'GET',
    params: {
      dictType,
    },
  });
}
