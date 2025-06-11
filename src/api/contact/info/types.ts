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
   * 状态
   */
  state: string;

  /**
   * 名字
   */
  name: string;

  /**
   * 昵称
   */
  nickname: string;

  /**
   * 姓名拼音
   */
  pinyin: string;

  /**
   * 手机号码
   */
  mobile: string;

  /**
   * 电子邮件
   */
  email: string;

  /**
   * 性别
   */
  gender: string;

  /**
   * 生日
   */
  birthday: string;

  /**
   * 户籍
   */
  placeOfOrigin: string;

  /**
   * 居住地
   */
  address: string;

  /**
   * 毕业学校
   */
  graduationSchool: string;

  /**
   * 学历
   */
  qualification: string;

  /**
   * 公司组织
   */
  organization: string;

  /**
   * 工作职务
   */
  position: string;

  /**
   * 社会角色
   */
  socialRole: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 最近接触时间
   */
  lastInteractionTime: string;

  /**
   * 接触频率
   */
  interactionFrequency: string;

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
   * 状态
   */
  state?: string;

  /**
   * 名字
   */
  name?: string;

  /**
   * 昵称
   */
  nickname?: string;

  /**
   * 姓名拼音
   */
  pinyin?: string;

  /**
   * 手机号码
   */
  mobile?: string;

  /**
   * 电子邮件
   */
  email?: string;

  /**
   * 性别
   */
  gender?: string;

  /**
   * 生日
   */
  birthday?: string;

  /**
   * 户籍
   */
  placeOfOrigin?: string;

  /**
   * 居住地
   */
  address?: string;

  /**
   * 毕业学校
   */
  graduationSchool?: string;

  /**
   * 学历
   */
  qualification?: string;

  /**
   * 公司组织
   */
  organization?: string;

  /**
   * 工作职务
   */
  position?: string;

  /**
   * 社会角色
   */
  socialRole?: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 最近接触时间
   */
  lastInteractionTime?: string;

  /**
   * 接触频率
   */
  interactionFrequency?: string;

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
   * 状态
   */
  state?: string;

  /**
   * 名字
   */
  name?: string;

  /**
   * 昵称
   */
  nickname?: string;

  /**
   * 姓名拼音
   */
  pinyin?: string;

  /**
   * 手机号码
   */
  mobile?: string;

  /**
   * 电子邮件
   */
  email?: string;

  /**
   * 性别
   */
  gender?: string;

  /**
   * 生日
   */
  birthday?: string;

  /**
   * 户籍
   */
  placeOfOrigin?: string;

  /**
   * 居住地
   */
  address?: string;

  /**
   * 毕业学校
   */
  graduationSchool?: string;

  /**
   * 学历
   */
  qualification?: string;

  /**
   * 公司组织
   */
  organization?: string;

  /**
   * 工作职务
   */
  position?: string;

  /**
   * 社会角色
   */
  socialRole?: string;

  /**
   * 最近接触时间
   */
  lastInteractionTime?: string;

  /**
   * 接触频率
   */
  interactionFrequency?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



