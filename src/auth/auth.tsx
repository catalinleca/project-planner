import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { replace } from 'connected-react-router/immutable';
import {AUTH_PATH, HOME_PATH} from "../utils/constants";
import {makeSelectIsLoggedIn} from "../store/selectors";
import {routerActions} from "connected-react-router";
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

// connectedRouterRedirect
export const userIsAuthenticated = (component?: any) => connectedReduxRedirect({
  redirectPath: AUTH_PATH,
  // authenticatedSelector: state => state.firebase.auth.uid,
  authenticatedSelector: state => makeSelectIsLoggedIn()(state),
  // authenticatingSelector: state => component != null && makeSelectIsLoggedIn()(state),
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectAction: routerActions.replace,

})

const locationHelper = locationHelperBuilder({});


export const userIsNotAuthenticated = (component?: any) => connectedReduxRedirect({
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || HOME_PATH,
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  authenticatedSelector: state => !(makeSelectIsLoggedIn()(state)),
  // If selector is true, wrapper will not redirect
  // So if there is no user data, then we show the page
  redirectAction: replace,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated',
})