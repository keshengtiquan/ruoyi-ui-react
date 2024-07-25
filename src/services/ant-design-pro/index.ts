// @ts-ignore
/* eslint-disable */
// API 更新时间：
// API 唯一标识：
import * as api from './api';
import * as login from './login';

export interface ResultVo<T> {
  code: number;
  data: T;
  msg: string;
}

export interface Page {
  /** 当前的页码 */
  pageNum?: number;
  /** 页面的容量 */
  pageSize?: number;
}

export const baseUrl = '/api'
export default {
  api,
  login,
};
