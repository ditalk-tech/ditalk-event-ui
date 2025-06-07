import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { InfoVO, InfoForm, InfoQuery } from '@/api/member/info/types';

/**
 * 查询会员信息列表
 * @param query
 * @returns {*}
 */

export const listInfo = (query?: InfoQuery): AxiosPromise<InfoVO[]> => {
  return request({
    url: '/member/info/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询会员信息详细
 * @param id
 */
export const getInfo = (id: string | number): AxiosPromise<InfoVO> => {
  return request({
    url: '/member/info/' + id,
    method: 'get'
  });
};

/**
 * 新增会员信息
 * @param data
 */
export const addInfo = (data: InfoForm) => {
  return request({
    url: '/member/info',
    method: 'post',
    data: data
  });
};

/**
 * 修改会员信息
 * @param data
 */
export const updateInfo = (data: InfoForm) => {
  return request({
    url: '/member/info',
    method: 'put',
    data: data
  });
};

/**
 * 删除会员信息
 * @param id
 */
export const delInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/info/' + id,
    method: 'delete'
  });
};
