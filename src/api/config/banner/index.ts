import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { InfoVO } from '@/api/config/info/types';
import { InfoForm } from '@/api/config/banner/types';

/**
 * 查询配置信息
 * @param id
 */
export const getInfo = (id: string | number): AxiosPromise<InfoVO> => {
  return request({
    url: '/server/banner/',
    method: 'get'
  });
};

/**
 * 修改配置信息
 * @param data
 */
export const editInfo = (data: InfoForm) => {
  return request({
    url: '/server/banner/',
    method: 'put',
    data: data
  });
};
