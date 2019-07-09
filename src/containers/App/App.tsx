import * as React from 'react';
import '../../App.css';
import {
  compose,
} from 'redux';
import {
  WithStyles,
  withStyles,
  Theme,
} from '@material-ui/core'
import {StyleRules} from "@material-ui/core/styles";
import AppMenu from "../AppMenu/AppMenu";
import CustomMenuItem from "../../components/CustomMenuItem/CustomMenuItem";
import Module from "../../store/Module";
import withWidth, { isWidthUp, isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import {
  ADD_USER,
  AUTH_PATH,
  CREATE_ADMIN_PATH,
  HOME_PATH,
  PROJECT_DETAILS,
  PROJECT_LIST,
  USER_DETAILS,
  USER_LIST
} from "../../utils/constants";
import ProjectDetailsPage from '../../pages/ProjectDetailsPage/ProjectDetailsPage';
import ProjectListPage from "../../pages/ProjectListPage/ProjectListPage";
import CreateNewProject from "../CreateNewProject/CreateNewProject";
import UserListPage from "../../pages/UserListPage/UserListPage";
import UserDetailsPage from "../../pages/UserDetailsPage/UserDetailsPage";
import LoginSignupComponent from "../LoginSingupComponent/LoginSignupComponent";
import {firestoreConnect} from "react-redux-firebase";
import HomePage from "../../pages/HomePage/HomePage";
import {userIsAuthenticated, userIsNotAuthenticated} from "../../auth/auth";

const styles = (theme: Theme): StyleRules => ({
  root: {
    display: 'flex',
  }
});

interface IAppComponentProps {
  classes: any,
  theme: any,
}

interface IAppProps {
  firstAction: any,
  state: any,
  projects: any,
  projectTitle: any
}


type AppProps = IAppComponentProps & WithWidth & IAppProps & WithStyles<keyof ReturnType<typeof styles>>;

const submit = (values) => {
  console.log(values);
}

const NotAuthenticatedLoginSignupComponent = userIsNotAuthenticated()(LoginSignupComponent);
const AuthenticatedLoginSignupComponent = userIsAuthenticated()(LoginSignupComponent)
const AuthenticatedProjectListPage = userIsAuthenticated()(ProjectListPage);
const AuthenticatedHomePage = userIsAuthenticated()(HomePage);
const AuthenticatedProjectDetailsPage = userIsAuthenticated()(ProjectDetailsPage);
const AuthenticatedUserListPage = userIsAuthenticated()(UserListPage);
const AuthenticatedUserDetailsPage = userIsAuthenticated()(UserDetailsPage);

const App: React.FC<AppProps> = (props) => {

  const { width } = props;
  const menuItems = <React.Fragment>
    <CustomMenuItem
      to={HOME_PATH}
      iconProps={{icon: 'inbox'}}
      label='Home'
      width={width}
    />
    <CustomMenuItem
      to={PROJECT_LIST}
      iconProps={{icon: 'envelope'}}
      label='Projects'
      width={width}
    />
    <CustomMenuItem
      to={USER_LIST}
      iconProps={{icon: 'users'}}
      label='Users'
      width={width}
    />
    <CustomMenuItem
      to={PROJECT_DETAILS}
      iconProps={{icon: 'bars'}}
      label='Project Details'
      width={width}
    />
  </React.Fragment>

  const userMenuItems = <React.Fragment>
    <CustomMenuItem
      to='/'
      iconProps={{icon: 'inbox'}}
      label='Home'
      width={width}
    />
    <CustomMenuItem
      to={PROJECT_LIST}
      iconProps={{icon: 'envelope'}}
      label='Projects'
      width={width}
    />
    <CustomMenuItem
      to={USER_LIST}
      iconProps={{icon: 'users'}}
      label='Users'
      width={width}
    />
    <CustomMenuItem
      to={PROJECT_DETAILS}
      iconProps={{icon: 'bars'}}
      label='Project Details'
      width={width}
    />
  </React.Fragment>

  return (
    <React.Fragment>
      <Module/>
      <AppMenu
        menuItems={menuItems}
        userMenuItems={userMenuItems}
      >
        <Switch>
          <Redirect from={`/`} to={`${HOME_PATH}`} exact={true}/>
          <Route path={`${AUTH_PATH}`} component={NotAuthenticatedLoginSignupComponent} exact={true}/>
          <Route path={`${CREATE_ADMIN_PATH}`} render={(props) => <NotAuthenticatedLoginSignupComponent {...props} admin={true}/>}/>
          <Route path={`${ADD_USER}`} render={(props) => <AuthenticatedLoginSignupComponent {...props} admin={false}/>} exact={true}/>
          <Route path={`${HOME_PATH}`} component={AuthenticatedHomePage}/>
          <Route path={`${PROJECT_DETAILS}/:id`} component={AuthenticatedProjectDetailsPage}/>
          <Route path={PROJECT_LIST} component={AuthenticatedProjectListPage} exact={true}/>
          <Route path={`${USER_DETAILS}/:id`} render={(props) => <AuthenticatedUserDetailsPage width={width} {...props}/>}/>

          <Route path={USER_LIST} component={AuthenticatedUserListPage} exact={true}/>
        </Switch>
      </AppMenu>
    </React.Fragment>
  );
}


export default compose<React.ComponentClass<any>>(
  withWidth(),
  withStyles(styles, {withTheme: true}),
  firestoreConnect([
    'projects', 'tasks', 'users'
  ])
)(App);
