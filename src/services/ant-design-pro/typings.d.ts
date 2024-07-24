// @ts-ignore
/* eslint-disable */

declare namespace API {
  type UserInfo = {
    user: CurrentUser;
    permissions: string[];
    roles: string[];
  };

  type CurrentUser = {
    createBy: string;
    createTime: string;
    updateBy: any;
    updateTime: any;
    userId: number;
    deptId: number;
    userName: string;
    nickName: string;
    userType: string;
    email: string;
    phonenumber: string;
    sex: string;
    avatar: string;
    status: string;
    delFlag: string;
    loginIp: string;
    loginDate: string;
    remark: string;
    dept: Dept;
    roles: Role[];
    roleIds: any;
    postIds: any;
    roleId: any;
    admin: boolean;
  };

  type Dept = {
    createBy: any;
    createTime: any;
    updateBy: any;
    updateTime: any;
    parentName: any;
    parentId: number;
    children: any[];
    deptId: number;
    deptName: string;
    orderNum: number;
    leader: string;
    phone: any;
    email: any;
    status: string;
    delFlag: any;
    ancestors: string;
  };

  type Role = {
    createBy: any;
    createTime: any;
    updateBy: any;
    updateTime: any;
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: number;
    dataScope: string;
    menuCheckStrictly: any;
    deptCheckStrictly: any;
    status: string;
    delFlag: any;
    remark: any;
    flag: boolean;
    menuIds: any;
    deptIds: any;
    admin: boolean;
  };

  type CaptchaResult = {
    captchaEnabled: boolean;
    img: string;
    uuid: string;
  };

  type LoginResult = {
    token: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type Menu = {
    name?: string;
    path?: string;
    hidden?: boolean;
    redirect?: string;
    component?: string;
    alwaysShow?: boolean;
    meta?: Meta;
    children?: Menu[];
  };

  type Meta = {
    title?: string;
    icon?: string;
    noCache?: boolean;
    link?: any;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    code?: string;
    uuid?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
