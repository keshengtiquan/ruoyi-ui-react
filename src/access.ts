import { flatRoutePath } from './utils/router';

const hasAuth = (permissions: string[] | undefined, authkey: string[]) => {
  console.log(permissions, authkey);

  if (!permissions || permissions.length === 0) {
    return false;
  }
  if (permissions.includes('*:*:*')) {
    return true;
  } else {
    return authkey.every((item) => permissions.includes(item));
  }
};
/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { menuList?: API.Menu[]; permissions: string[] } | undefined,
) {
  const { menuList, permissions } = initialState ?? {};

  let pathList: string[] = [];
  if (menuList && menuList.length > 0) {
    pathList = flatRoutePath(menuList);
  }
  return {
    normalRouteFilter: (route: any) => pathList.includes(route.path),
    permissions: (router: any) => hasAuth(permissions, router.permissions),
  };
}
