export interface PhotoVO {
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
   * 照片
   */
  photoId: string | number;

  /**
   * 照片Url
   */
  photoUrl: string;
  /**
   * 会员ID
   */
  memberId: string | number;

  /**
   * 图片描述
   */
  caption: string;

  /**
   * 状态
   */
  state: string;

}

export interface PhotoForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 乐观锁
   */
  version?: number;

  /**
   * 照片
   */
  photoId?: string | number;

  /**
   * 会员ID
   */
  memberId?: string | number;

  /**
   * 图片描述
   */
  caption?: string;

  /**
   * 状态
   */
  state?: string;

}

export interface PhotoQuery extends PageQuery {

  /**
   * ID
   */
  id?: string | number;

  /**
   * 创建时间
   */
  createTime?: string;

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



