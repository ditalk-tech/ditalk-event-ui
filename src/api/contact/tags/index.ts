import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { TagsVO, TagsForm, TagsQuery } from '@/api/contact/tags/types';

/**
 * 查询联系人标签列表
 * @param query
 * @returns {*}
 */

export const listTags = (query?: TagsQuery): AxiosPromise<TagsVO[]> => {
  return request({
    url: '/contact/tags/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询联系人标签详细
 * @param id
 */
export const getTags = (id: string | number): AxiosPromise<TagsVO> => {
  return request({
    url: '/contact/tags/' + id,
    method: 'get'
  });
};

/**
 * 新增联系人标签
 * @param data
 */
export const addTags = (data: TagsForm) => {
  return request({
    url: '/contact/tags',
    method: 'post',
    data: data
  });
};

/**
 * 修改联系人标签
 * @param data
 */
export const updateTags = (data: TagsForm) => {
  return request({
    url: '/contact/tags',
    method: 'put',
    data: data
  });
};

/**
 * 删除联系人标签
 * @param id
 */
export const delTags = (id: string | number | Array<string | number>) => {
  return request({
    url: '/contact/tags/' + id,
    method: 'delete'
  });
};
