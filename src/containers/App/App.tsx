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
  Route,
  Switch,
} from 'react-router-dom';
import {PROJECT_DETAILS, PROJECT_LIST, USER_DETAILS, USER_LIST} from "../../utils/constants";
import ProjectDetailsPage from '../../pages/ProjectDetailsPage/ProjectDetailsPage';
import ProjectListPage from "../../pages/ProjectListPage/ProjectListPage";
import CreateNewProject from "../CreateNewProject/CreateNewProject";
import UserListPage from "../../pages/UserListPage/UserListPage";

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
const App: React.FC<AppProps> = (props) => {

  const { width } = props;
  const menuItems = <React.Fragment>
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
      >
        <Switch>
          <Route path={`${PROJECT_DETAILS}/:id`} component={ProjectDetailsPage}/>
          <Route path={PROJECT_LIST} component={ProjectListPage} exact={true}/>
          <Route path={USER_LIST} component={UserListPage} exact={true}/>
        </Switch>
        <CreateNewProject/>
      </AppMenu>
    </React.Fragment>
  );
}


export default compose<React.ComponentClass<any>>(
  withWidth(),
  withStyles(styles, {withTheme: true})
)(App);
