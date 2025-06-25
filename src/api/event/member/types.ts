export interface MemberVO {
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
   * 活动ID
   */
  eventId: string | number;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 签到码
   */
  signCode: number;

  /**
   * 会员ID
   */
  memberId: string | number;

  /**
   * 状态
   */
  state: string;

}

export interface MemberForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 乐观锁
   */
  version?: number;

  /**
   * 活动ID
   */
  eventId?: string | number;

  /**
   * 会员ID
   */
  memberId?: string | number;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 签到码
   */
  signCode?: number;

  /**
   * 状态
   */
  state?: string;

}

export interface MemberQuery extends PageQuery {

  /**
   * ID
   */
  id?: string | number;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 活动ID
   */
  eventId?: string | number;

  /**
   * 会员ID
   */
  memberId?: string | number;

  /**
   * 状态
   */
  state?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



