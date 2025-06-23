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
   * 部门ID
   */
  deptId: string | number;

  /**
   * 账号
   */
  userName: string;

  /**
   * 昵称
   */
  nickName: string;

  /**
   * 用户类型
   */
  userType: string;

  /**
   * 邮箱
   */
  email: string;

  /**
   * 手机号码
   */
  phoneNumber: string;

  /**
   * 性别
   */
  sex: string;

  /**
   * 头像ID
   */
  avatar: number;

  /**
   * 头像IDUrl
   */
  avatarUrl: string;
  /**
   * 小程序头像
   */
  xcxAvatar: string;

  /**
   * 最后登录IP
   */
  loginIp: string;

  /**
   * 最后登录时间
   */
  loginDate: string;

  /**
   * 生日
   */
  birthday: string;

  /**
   * 身高
   */
  tall: number;

  /**
   * 学历
   */
  qualification: string;

  /**
   * 工作
   */
  career: string;

  /**
   * 籍贯
   */
  placeOfOrigin: string;

  /**
   * 爱好
   */
  hobby: string;

  /**
   * 简介
   */
  profile: string;

  /**
   * 开放状态
   */
  openState: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 扩展信息
   */
  exInfo: string;

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
   * 部门ID
   */
  deptId?: string | number;

  /**
   * 账号
   */
  userName?: string;

  /**
   * 昵称
   */
  nickName?: string;

  /**
   * 用户类型
   */
  // userType?: string;

  /**
   * 邮箱
   */
  email?: string;

  /**
   * 手机号码
   */
  phoneNumber?: string;

  /**
   * 性别
   */
  sex?: string;

  /**
   * 头像ID
   */
  avatar?: number;

  /**
   * 小程序头像
   */
  xcxAvatar?: string;

  /**
   * 最后登录IP
   */
  loginIp?: string;

  /**
   * 最后登录时间
   */
  loginDate?: string;

  /**
   * 生日
   */
  birthday?: string;

  /**
   * 身高
   */
  tall?: number;

  /**
   * 学历
   */
  qualification?: string;

  /**
   * 工作
   */
  career?: string;

  /**
   * 籍贯
   */
  placeOfOrigin?: string;

  /**
   * 爱好
   */
  hobby?: string;

  /**
   * 简介
   */
  profile?: string;

  /**
   * 开放状态
   */
  openState?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 扩展信息
   */
  exInfo?: string;

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
   * 部门ID
   */
  deptId?: string | number;

  /**
   * 账号
   */
  userName?: string;

  /**
   * 昵称
   */
  nickName?: string;

  /**
   * 用户类型
   */
  // userType?: string;

  /**
   * 邮箱
   */
  email?: string;

  /**
   * 手机号码
   */
  phoneNumber?: string;

  /**
   * 性别
   */
  sex?: string;

  /**
   * 最后登录IP
   */
  loginIp?: string;

  /**
   * 最后登录时间
   */
  loginDate?: string;

  /**
   * 生日
   */
  birthday?: string;

  /**
   * 身高
   */
  tall?: number;

  /**
   * 学历
   */
  qualification?: string;

  /**
   * 工作
   */
  career?: string;

  /**
   * 籍贯
   */
  placeOfOrigin?: string;

  /**
   * 爱好
   */
  hobby?: string;

  /**
   * 开放状态
   */
  openState?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



