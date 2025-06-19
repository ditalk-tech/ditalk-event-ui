export interface InfoVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 乐观锁
   */
  version: number;

  /**
   * 状态（sys_normal_disable）
   */
  state: string;

  /**
   * 配置项名称
   */
  name: string;

  /**
   * 配置项键
   */
  code: string;

  /**
   * 配置项JSON值
   */
  value: string;

  /**
   * 备注
   */
  remark: string;

}

export interface InfoForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 乐观锁
   */
  version?: number;

  /**
   * 状态（sys_normal_disable）
   */
  state?: string;

  /**
   * 配置项名称
   */
  name?: string;

  /**
   * 配置项键
   */
  code?: string;

  /**
   * 配置项JSON值
   */
  value?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface InfoQuery extends PageQuery {

  /**
   * ID
   */
  id?: string | number;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 状态（sys_normal_disable）
   */
  state?: string;

  /**
   * 配置项名称
   */
  name?: string;

  /**
   * 配置项键
   */
  code?: string;

  /**
   * 配置项JSON值
   */
  value?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



