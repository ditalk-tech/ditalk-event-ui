import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CommonTagsVO, CommonTagsForm, CommonTagsQuery } from '@/api/contact/commonTags/types';

/**
 * 查询常用标签列表
 * @param query
 * @returns {*}
 */

export const listCommonTags = (query?: CommonTagsQuery): AxiosPromise<CommonTagsVO[]> => {
  return request({
    url: '/contact/commonTags/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询常用标签详细
 * @param id
 */
export const getCommonTags = (id: string | number): AxiosPromise<CommonTagsVO> => {
  return request({
    url: '/contact/commonTags/' + id,
    method: 'get'
  });
};

/**
 * 新增常用标签
 * @param data
 */
export const addCommonTags = (data: CommonTagsForm) => {
  return request({
    url: '/contact/commonTags',
    method: 'post',
    data: data
  });
};

/**
 * 修改常用标签
 * @param data
 */
export const updateCommonTags = (data: CommonTagsForm) => {
  return request({
    url: '/contact/commonTags',
    method: 'put',
    data: data
  });
};

/**
 * 删除常用标签
 * @param id
 */
export const delCommonTags = (id: string | number | Array<string | number>) => {
  return request({
    url: '/contact/commonTags/' + id,
    method: 'delete'
  });
};
