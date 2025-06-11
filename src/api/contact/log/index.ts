import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LogVO, LogForm, LogQuery } from '@/api/contact/log/types';

/**
 * 查询联系记录列表
 * @param query
 * @returns {*}
 */

export const listLog = (query?: LogQuery): AxiosPromise<LogVO[]> => {
  return request({
    url: '/contact/log/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询联系记录详细
 * @param id
 */
export const getLog = (id: string | number): AxiosPromise<LogVO> => {
  return request({
    url: '/contact/log/' + id,
    method: 'get'
  });
};

/**
 * 新增联系记录
 * @param data
 */
export const addLog = (data: LogForm) => {
  return request({
    url: '/contact/log',
    method: 'post',
    data: data
  });
};

/**
 * 修改联系记录
 * @param data
 */
export const updateLog = (data: LogForm) => {
  return request({
    url: '/contact/log',
    method: 'put',
    data: data
  });
};

/**
 * 删除联系记录
 * @param id
 */
export const delLog = (id: string | number | Array<string | number>) => {
  return request({
    url: '/contact/log/' + id,
    method: 'delete'
  });
};
