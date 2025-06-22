import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { InfoVO, InfoForm, InfoQuery } from '@/api/event/info/types';

/**
 * 查询活动信息列表
 * @param query
 * @returns {*}
 */

export const listInfo = (query?: InfoQuery): AxiosPromise<InfoVO[]> => {
  return request({
    url: '/event/info/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询活动信息详细
 * @param id
 */
export const getInfo = (id: string | number): AxiosPromise<InfoVO> => {
  return request({
    url: '/event/info/' + id,
    method: 'get'
  });
};

/**
 * 新增活动信息
 * @param data
 */
export const addInfo = (data: InfoForm) => {
  return request({
    url: '/event/info',
    method: 'post',
    data: data
  });
};

/**
 * 修改活动信息
 * @param data
 */
export const updateInfo = (data: InfoForm) => {
  return request({
    url: '/event/info',
    method: 'put',
    data: data
  });
};

/**
 * 删除活动信息
 * @param id
 */
export const delInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/event/info/' + id,
    method: 'delete'
  });
};
