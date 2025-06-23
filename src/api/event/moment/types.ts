export interface MomentVO {
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
   * 图片ID
   */
  image: number;

  /**
   * 图片IDUrl
   */
  imageUrl: string;
  /**
   * 摘要
   */
  summary: string;

  /**
   * 状态
   */
  state: string;

}

export interface MomentForm extends BaseEntity {
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
   * 图片ID
   */
  image?: number;

  /**
   * 摘要
   */
  summary?: string;

  /**
   * 状态
   */
  state?: string;

}

export interface MomentQuery extends PageQuery {

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
   * 状态
   */
  state?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



