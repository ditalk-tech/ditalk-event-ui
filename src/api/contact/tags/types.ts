export interface TagsVO {
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
   * 标签分类
   */
  category: string;

  /**
   * 标签名称
   */
  name: string;

}

export interface TagsForm extends BaseEntity {
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
   * 标签分类
   */
  category?: string;

  /**
   * 标签名称
   */
  name?: string;

}

export interface TagsQuery extends PageQuery {

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
   * 标签分类
   */
  category?: string;

  /**
   * 标签名称
   */
  name?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



