import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { InfoVO, InfoForm, InfoQuery } from '@/api/news/info/types';

/**
 * 查询喜讯新闻列表
 * @param query
 * @returns {*}
 */

export const listInfo = (query?: InfoQuery): AxiosPromise<InfoVO[]> => {
  return request({
    url: '/news/info/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询喜讯新闻详细
 * @param id
 */
export const getInfo = (id: string | number): AxiosPromise<InfoVO> => {
  return request({
    url: '/news/info/' + id,
    method: 'get'
  });
};

/**
 * 新增喜讯新闻
 * @param data
 */
export const addInfo = (data: InfoForm) => {
  return request({
    url: '/news/info',
    method: 'post',
    data: data
  });
};

/**
 * 修改喜讯新闻
 * @param data
 */
export const updateInfo = (data: InfoForm) => {
  return request({
    url: '/news/info',
    method: 'put',
    data: data
  });
};

/**
 * 删除喜讯新闻
 * @param id
 */
export const delInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/news/info/' + id,
    method: 'delete'
  });
};
