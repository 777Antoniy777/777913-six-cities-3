type RouteHistory = {
  action: string,
  block: () => void,
  createHref: () => void,
  go: () => void,
  goBack: () => void,
  goForward: () => void,
  length: number,
  listen: () => void,
  location: RouteLocation,
  push: (path: string) => void,
  replace: () => void,
};
