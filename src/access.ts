import { flatRoutePath } from './utils/router';

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { menuList?: API.Menu[] } | undefined) {
  const { menuList } = initialState ?? {};
  console.log(menuList);

  let pathList: string[] = [];
  if (menuList && menuList.length > 0) {
    pathList = flatRoutePath(menuList);
  }
  return {
    normalRouteFilter: (route: any) => pathList.includes(route.path),
  };
}
