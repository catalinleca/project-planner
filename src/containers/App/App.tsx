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


type AppProps = IAppComponentProps & IAppProps & WithStyles<keyof ReturnType<typeof styles>>;

const App: React.FC<AppProps> = () => {
  const menuItems = <React.Fragment>
    <CustomMenuItem
      to='/'
      iconProps={{icon: 'inbox'}}
      label='home'
    />
    <CustomMenuItem
      to='/projects'
      iconProps={{icon: 'envelope'}}
      label='home'
    />
    <CustomMenuItem
      to='/users'
      iconProps={{icon: 'trash'}}
      label='home'
    />
  </React.Fragment>
  return (
    <React.Fragment>
      <AppMenu
        menuItems={menuItems}
      >
      </AppMenu>
    </React.Fragment>
  );
}


export default compose<React.ComponentClass<any>>(
  withStyles(styles, {withTheme: true})
)(App);
