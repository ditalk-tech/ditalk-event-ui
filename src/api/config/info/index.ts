import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { InfoVO, InfoForm, InfoQuery } from '@/api/config/info/types';

/**
 * 查询配置信息列表
 * @param query
 * @returns {*}
 */

export const listInfo = (query?: InfoQuery): AxiosPromise<InfoVO[]> => {
  return request({
    url: '/config/info/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询配置信息详细
 * @param id
 */
export const getInfo = (id: string | number): AxiosPromise<InfoVO> => {
  return request({
    url: '/config/info/' + id,
    method: 'get'
  });
};

/**
 * 新增配置信息
 * @param data
 */
export const addInfo = (data: InfoForm) => {
  return request({
    url: '/config/info',
    method: 'post',
    data: data
  });
};

/**
 * 修改配置信息
 * @param data
 */
export const updateInfo = (data: InfoForm) => {
  return request({
    url: '/config/info',
    method: 'put',
    data: data
  });
};

/**
 * 删除配置信息
 * @param id
 */
export const delInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/config/info/' + id,
    method: 'delete'
  });
};
