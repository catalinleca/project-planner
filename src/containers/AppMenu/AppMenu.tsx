import * as React from 'react';
import '../../App.css';
import {
  compose,
  Dispatch,
} from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  WithStyles,
  withStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Theme,
  ListItemText, Button,
} from '@material-ui/core'
import {StyleRules} from "@material-ui/core/styles";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FirstAction} from "../../store/action";
import Module from "../../store/Module";
import {createStructuredSelector} from "reselect";
import {makeSelectProjects, makeSelectProjectTitle} from "../../store/selectors";

const drawerWidth = 240;


interface IAction {
  type: string;
  payload?: any;
  callback?: (...args: any[]) => void;
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

interface IAppMenuComponentProps {
  classes: any;
  theme: any;

}

interface IAppMenuProps extends IAppMenuComponentProps{
  firstAction: any;
  state: any;
  projects: any;
  projectTitle: any;
  menuItems: any;
}


type AppMenuProps = IAppMenuComponentProps & IAppMenuProps & WithStyles<keyof ReturnType<typeof styles>>;

class AppMenu extends React.Component<AppMenuProps> {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  public buttonHandler = () => {
    const {
      state,
      firstAction
    } = this.props;

    firstAction();

  }

  public customIcon = (iconName: IconProp) => (
    <FontAwesomeIcon
      icon={iconName}
    />
  )

  render() {
    const { classes, theme, projects, projectTitle, menuItems } = this.props;


    console.log('projects: ', projects);
    console.log('projectTitle: ', projectTitle);
    return (
      <div className={classes.root}>
        <Module/>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              {this.customIcon('bars')}
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Mini variant drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? this.customIcon('chevron-right') : this.customIcon('chevron-left')}
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuItems}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Button
            variant='contained'
            color='primary'
            onClick={this.buttonHandler}
          >
            Gica
          </Button>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<IAction>) => {
  return {
    firstAction: () => {
      dispatch(FirstAction())
    }
  };
}

const mapStateToProps = (state: any) => {
  return createStructuredSelector({
    projects: makeSelectProjects(),
    projectTitle: makeSelectProjectTitle()
  })(state)
}

export default compose<React.ComponentClass<any>>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(AppMenu);
