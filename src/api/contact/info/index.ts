import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { InfoVO, InfoForm, InfoQuery } from '@/api/contact/info/types';

/**
 * 查询联系人列表
 * @param query
 * @returns {*}
 */

export const listInfo = (query?: InfoQuery): AxiosPromise<InfoVO[]> => {
  return request({
    url: '/contact/info/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询联系人详细
 * @param id
 */
export const getInfo = (id: string | number): AxiosPromise<InfoVO> => {
  return request({
    url: '/contact/info/' + id,
    method: 'get'
  });
};

/**
 * 新增联系人
 * @param data
 */
export const addInfo = (data: InfoForm) => {
  return request({
    url: '/contact/info',
    method: 'post',
    data: data
  });
};

/**
 * 修改联系人
 * @param data
 */
export const updateInfo = (data: InfoForm) => {
  return request({
    url: '/contact/info',
    method: 'put',
    data: data
  });
};

/**
 * 删除联系人
 * @param id
 */
export const delInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/contact/info/' + id,
    method: 'delete'
  });
};
