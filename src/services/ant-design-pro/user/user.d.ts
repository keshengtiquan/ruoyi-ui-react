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

export interface AddUser {
  deptId?: number | string;
  userName?: string | undefined;
  nickName?: string;
  email?: string;
  phonenumber?: string;
  sex?: string;
  status?: string;
  remark?: string;
  roleIds?: any;
  postIds?: any;
  password?: string | undefined;
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

export interface UserModal {
  roleIds?: number[];
  postIds?: number[];
  roles: Role[];
  posts: Post[];
  user?: UserResult;
}

export interface Post {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: any;
  postId: number;
  postCode: string;
  postName: string;
  postSort: number;
  status: string;
  remark: string;
  flag: boolean;
}

export interface Role {
  createBy: any;
  createTime: string;
  updateBy: any;
  updateTime: any;
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly: boolean;
  deptCheckStrictly: boolean;
  status: string;
  delFlag: string;
  remark?: string;
  flag: boolean;
  menuIds: any;
  deptIds: any;
  admin: boolean;
}

export interface AuthRole {
  roles: Role[];
  user: UserResult;
}
