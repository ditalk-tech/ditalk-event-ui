import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MomentVO, MomentForm, MomentQuery } from '@/api/event/moment/types';

/**
 * 查询活动瞬间列表
 * @param query
 * @returns {*}
 */

export const listMoment = (query?: MomentQuery): AxiosPromise<MomentVO[]> => {
  return request({
    url: '/event/moment/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询活动瞬间详细
 * @param id
 */
export const getMoment = (id: string | number): AxiosPromise<MomentVO> => {
  return request({
    url: '/event/moment/' + id,
    method: 'get'
  });
};

/**
 * 新增活动瞬间
 * @param data
 */
export const addMoment = (data: MomentForm) => {
  return request({
    url: '/event/moment',
    method: 'post',
    data: data
  });
};

/**
 * 修改活动瞬间
 * @param data
 */
export const updateMoment = (data: MomentForm) => {
  return request({
    url: '/event/moment',
    method: 'put',
    data: data
  });
};

/**
 * 删除活动瞬间
 * @param id
 */
export const delMoment = (id: string | number | Array<string | number>) => {
  return request({
    url: '/event/moment/' + id,
    method: 'delete'
  });
};
