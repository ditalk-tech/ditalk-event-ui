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
   * 封面图片
   */
  coverImage: number;

  /**
   * 封面图片Url
   */
  coverImageUrl: string;
  /**
   * 标题
   */
  title: string;

  /**
   * 发布时间
   */
  publishTime: string;

  /**
   * 报名截止
   */
  applicationDeadline: string;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 名额
   */
  quota: number;

  /**
   * 地点
   */
  location: string;

  /**
   * 活动安排
   */
  arrangement: string;

  /**
   * 报名会员快照
   */
  members: string | number;

  /**
   * 备注信息
   */
  remark: string;

  /**
   * 扩展信息
   */
  exInfo: string;

  /**
   * 状态
   */
  state: string;

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
   * 封面图片
   */
  coverImage?: number;

  /**
   * 标题
   */
  title?: string;

  /**
   * 发布时间
   */
  publishTime?: string;

  /**
   * 报名截止
   */
  applicationDeadline?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 名额
   */
  quota?: number;

  /**
   * 地点
   */
  location?: string;

  /**
   * 活动安排
   */
  arrangement?: string;

  /**
   * 报名会员快照
   */
  members?: string | number;

  /**
   * 备注信息
   */
  remark?: string;

  /**
   * 扩展信息
   */
  exInfo?: string;

  /**
   * 状态
   */
  state?: string;

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
   * 标题
   */
  title?: string;

  /**
   * 发布时间
   */
  publishTime?: string;

  /**
   * 报名截止
   */
  applicationDeadline?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 地点
   */
  location?: string;

  /**
   * 状态
   */
  state?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



