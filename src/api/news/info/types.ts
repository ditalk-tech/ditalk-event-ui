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
   * 发生时间
   */
  eventTime: string;

  /**
   * 内容
   */
  content: string;

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
   * 发生时间
   */
  eventTime?: string;

  /**
   * 内容
   */
  content?: string;

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
   * 发生时间
   */
  eventTime?: string;

  /**
   * 内容
   */
  content?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



