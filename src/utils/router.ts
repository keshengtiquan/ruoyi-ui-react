export const router2menu = (routes: API.Menu[]) => {
  return (
    routes &&
    routes.map((route) => {
      const obj: API.Menu = {};
      const { path, component, meta, children, hidden } = route;
      if (path === '/' && component === 'Layout' && !hidden) {
        if (children && children.length > 0) {
          const singleMenu: API.Menu[] = router2menu(children);
          return singleMenu[0];
        }
      } else if (!hidden) {
        obj.path = path;
        obj.name = meta?.title;
        if (children && children.length > 0) {
          obj.children = router2menu(children);
        }
      }

      return obj;
    })
  );
};

export const flatRoutePath = (routes: API.Menu[], basePath = '') => {
  let paths: string[] = [];

  routes.forEach((item) => {
    let currentPath = item.path;
    if (basePath && basePath !== '/') {
      currentPath = `${basePath}/${item.path}`.replace(/\/+/g, '/');
    } else if (currentPath === '/') {
      currentPath = '';
    }

    if (currentPath) {
      if (!currentPath.startsWith('/')) {
        currentPath = '/' + currentPath;
      }
      paths.push(currentPath);
    }

    if (item.children) {
      paths = paths.concat(flatRoutePath(item.children, currentPath));
    }
  });

  return paths;
};
