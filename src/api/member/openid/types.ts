export interface OpenidVO {
  /**
   * 主键
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
   * 会员ID
   */
  memberId: string | number;

  /**
   * App应用ID
   */
  appId: string | number;

  /**
   * 平台代码
   */
  platform: string;

  /**
   * OpenID
   */
  openId: string | number;

}

export interface OpenidForm extends BaseEntity {
  /**
   * 主键
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
   * 会员ID
   */
  memberId?: string | number;

  /**
   * App应用ID
   */
  appId?: string | number;

  /**
   * 平台代码
   */
  platform?: string;

  /**
   * OpenID
   */
  openId?: string | number;

}

export interface OpenidQuery extends PageQuery {

  /**
   * 主键
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
   * 会员ID
   */
  memberId?: string | number;

  /**
   * App应用ID
   */
  appId?: string | number;

  /**
   * 平台代码
   */
  platform?: string;

  /**
   * OpenID
   */
  openId?: string | number;

    /**
     * 日期范围参数
     */
    params?: any;
}



