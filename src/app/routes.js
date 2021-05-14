import Home from 'components/Home';
import EditProfile from 'components/EditProfile';

export const homeRoute = '/';
export const editProfileRoute = '/edit-profile';

/**
 * @param {string} path
 * @param {JSX.Element} component
 * @return {{path: string, component: JSX.Element}}
 */
const routeComponent = (path, component) => ({ path, component });

/**
 * Array of routes to their components.
 * (Array to guarantee order).
 */
export const routeList = [
  routeComponent(editProfileRoute, EditProfile),
  routeComponent(homeRoute, Home),
];
