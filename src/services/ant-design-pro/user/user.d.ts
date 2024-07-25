import { Page } from '..';

export interface UserTree {
  key: number;
  id: number;
  parentId: number;
  label: string;
  weight: number;
  children: UserTree[];
}

export interface UserParams extends Page {
  userName?: string;
  phonenumber?: string;
  status?: string;
  beginTime?: string;
  endTime?: string;
  params?: {
    beginTime?: string;
    endTime?: string;
  };
}
export interface UserResult {
  createBy: string;
  createTime: string;
  updateBy: any;
  updateTime: any;
  userId: any;
  deptId: number;
  userName: string;
  nickName: string;
  userType: any;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  remark?: string;
  dept: Dept;
  roles: any[];
  roleIds: any;
  postIds: any;
  roleId: any;
  admin: boolean;
}

export interface Dept {
  createBy: any;
  createTime: any;
  updateBy: any;
  updateTime: any;
  parentName: any;
  parentId: any;
  children: any[];
  deptId: number;
  deptName: string;
  orderNum: any;
  leader: string;
  phone: any;
  email: any;
  status: any;
  delFlag: any;
  ancestors: any;
}
