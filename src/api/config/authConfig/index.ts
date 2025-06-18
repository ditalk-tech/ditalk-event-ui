import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { AuthConfigVO, AuthConfigForm, AuthConfigQuery } from '@/api/config/authConfig/types';

/**
 * 查询小程序变量列表
 * @param query
 * @returns {*}
 */

export const listAuthConfig = (query?: AuthConfigQuery): AxiosPromise<AuthConfigVO[]> => {
  return request({
    url: '/config/authConfig/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询小程序变量详细
 * @param id
 */
export const getAuthConfig = (id: string | number): AxiosPromise<AuthConfigVO> => {
  return request({
    url: '/config/authConfig/' + id,
    method: 'get'
  });
};

/**
 * 新增小程序变量
 * @param data
 */
export const addAuthConfig = (data: AuthConfigForm) => {
  return request({
    url: '/config/authConfig',
    method: 'post',
    data: data
  });
};

/**
 * 修改小程序变量
 * @param data
 */
export const updateAuthConfig = (data: AuthConfigForm) => {
  return request({
    url: '/config/authConfig',
    method: 'put',
    data: data
  });
};

/**
 * 删除小程序变量
 * @param id
 */
export const delAuthConfig = (id: string | number | Array<string | number>) => {
  return request({
    url: '/config/authConfig/' + id,
    method: 'delete'
  });
};
