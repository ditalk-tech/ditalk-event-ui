import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { PhotoVO, PhotoForm, PhotoQuery } from '@/api/member/photo/types';

/**
 * 查询会员照片列表
 * @param query
 * @returns {*}
 */

export const listPhoto = (query?: PhotoQuery): AxiosPromise<PhotoVO[]> => {
  return request({
    url: '/member/photo/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询会员照片详细
 * @param id
 */
export const getPhoto = (id: string | number): AxiosPromise<PhotoVO> => {
  return request({
    url: '/member/photo/' + id,
    method: 'get'
  });
};

/**
 * 新增会员照片
 * @param data
 */
export const addPhoto = (data: PhotoForm) => {
  return request({
    url: '/member/photo',
    method: 'post',
    data: data
  });
};

/**
 * 修改会员照片
 * @param data
 */
export const updatePhoto = (data: PhotoForm) => {
  return request({
    url: '/member/photo',
    method: 'put',
    data: data
  });
};

/**
 * 删除会员照片
 * @param id
 */
export const delPhoto = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/photo/' + id,
    method: 'delete'
  });
};
