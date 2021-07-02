import SelectProfile from 'components/SelectProfile';
import EditProfile from 'components/EditProfile';
import PairVote from 'components/PairVote';
import ViewList from 'components/ViewList';

/**
 * See: react-router-dom
 * @typedef {{
 *  goBack: Function, replace: Function
 * }} history
 */

export const selectProfileRoute = '/';
export const editProfileRoute = '/edit-profile';
export const viewProfileList = '/list';
export const voteOnPairs = '/vote-pair';
export const homeRoute = selectProfileRoute;

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
  routeComponent(voteOnPairs, PairVote),
  routeComponent(viewProfileList, ViewList),
  routeComponent(editProfileRoute, EditProfile),
  routeComponent(selectProfileRoute, SelectProfile),
];

/**
 * Way to safely go back, regardless of where you start.
 *
 * @param {history} history
 */
export const goBackOrHome = (history) => {
  if (history.length > 1) {
    history.goBack();
  } else {
    history.replace(homeRoute);
  }
};
