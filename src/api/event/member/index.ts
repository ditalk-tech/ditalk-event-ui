import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MemberVO, MemberForm, MemberQuery } from '@/api/event/member/types';

/**
 * 查询活动报名人列表
 * @param query
 * @returns {*}
 */

export const listMember = (query?: MemberQuery): AxiosPromise<MemberVO[]> => {
  return request({
    url: '/event/member/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询活动报名人详细
 * @param id
 */
export const getMember = (id: string | number): AxiosPromise<MemberVO> => {
  return request({
    url: '/event/member/' + id,
    method: 'get'
  });
};

/**
 * 新增活动报名人
 * @param data
 */
export const addMember = (data: MemberForm) => {
  return request({
    url: '/event/member',
    method: 'post',
    data: data
  });
};

/**
 * 修改活动报名人
 * @param data
 */
export const updateMember = (data: MemberForm) => {
  return request({
    url: '/event/member',
    method: 'put',
    data: data
  });
};

/**
 * 删除活动报名人
 * @param id
 */
export const delMember = (id: string | number | Array<string | number>) => {
  return request({
    url: '/event/member/' + id,
    method: 'delete'
  });
};
