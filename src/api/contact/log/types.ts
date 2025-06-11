export interface LogVO {
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
   * 状态
   */
  state: string;

  /**
   * 联系人ID
   */
  contactId: string | number;

  /**
   * 经办人ID
   */
  operatorId: string | number;

  /**
   * 通讯渠道
   */
  channel: string;

  /**
   * 主题
   */
  subject: string;

  /**
   * 描述
   */
  description: string;

}

export interface LogForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 乐观锁
   */
  version?: number;

  /**
   * 状态
   */
  state?: string;

  /**
   * 联系人ID
   */
  contactId?: string | number;

  /**
   * 经办人ID
   */
  operatorId?: string | number;

  /**
   * 通讯渠道
   */
  channel?: string;

  /**
   * 主题
   */
  subject?: string;

  /**
   * 描述
   */
  description?: string;

}

export interface LogQuery extends PageQuery {

  /**
   * ID
   */
  id?: string | number;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 状态
   */
  state?: string;

  /**
   * 联系人ID
   */
  contactId?: string | number;

  /**
   * 经办人ID
   */
  operatorId?: string | number;

  /**
   * 通讯渠道
   */
  channel?: string;

  /**
   * 主题
   */
  subject?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



