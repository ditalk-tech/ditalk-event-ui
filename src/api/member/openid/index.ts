import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OpenidVO, OpenidForm, OpenidQuery } from '@/api/member/openid/types';

/**
 * 查询会员OpenId列表
 * @param query
 * @returns {*}
 */

export const listOpenid = (query?: OpenidQuery): AxiosPromise<OpenidVO[]> => {
  return request({
    url: '/member/openid/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询会员OpenId详细
 * @param id
 */
export const getOpenid = (id: string | number): AxiosPromise<OpenidVO> => {
  return request({
    url: '/member/openid/' + id,
    method: 'get'
  });
};

/**
 * 新增会员OpenId
 * @param data
 */
export const addOpenid = (data: OpenidForm) => {
  return request({
    url: '/member/openid',
    method: 'post',
    data: data
  });
};

/**
 * 修改会员OpenId
 * @param data
 */
export const updateOpenid = (data: OpenidForm) => {
  return request({
    url: '/member/openid',
    method: 'put',
    data: data
  });
};

/**
 * 删除会员OpenId
 * @param id
 */
export const delOpenid = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/openid/' + id,
    method: 'delete'
  });
};
