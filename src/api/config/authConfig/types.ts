export interface AuthConfigVO {
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
   * 平台名称
   */
  platform: string;

  /**
   * AppId
   */
  appId: string | number;

  /**
   * App密钥
   */
  secret: string;

  /**
   * 状态（sys_normal_disable）
   */
  state: string;

  /**
   * 备注信息
   */
  remark: string;

}

export interface AuthConfigForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 乐观锁
   */
  version?: number;

  /**
   * 平台名称
   */
  platform?: string;

  /**
   * AppId
   */
  appId?: string | number;

  /**
   * App密钥
   */
  secret?: string;

  /**
   * 状态（sys_normal_disable）
   */
  state?: string;

  /**
   * 备注信息
   */
  remark?: string;

}

export interface AuthConfigQuery extends PageQuery {

  /**
   * ID
   */
  id?: string | number;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 平台名称
   */
  platform?: string;

  /**
   * AppId
   */
  appId?: string | number;

  /**
   * 状态（sys_normal_disable）
   */
  state?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



