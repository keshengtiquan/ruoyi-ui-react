// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { baseUrl, ResultVo } from '.';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getCaptchaImage(){
  return request<ResultVo<API.CaptchaResult>>(`${baseUrl}/captchaImage`, {
    method: 'GET',
  })
}


export async function getRoutes() {
  return request<ResultVo<API.Menu[]>>(`${baseUrl}/getRouters`, {
    method: 'GET',
  })
}
