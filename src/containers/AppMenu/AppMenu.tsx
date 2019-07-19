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
import withWidth, { isWidthUp, isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import {StyleRules} from "@material-ui/core/styles";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {CreateProjectAction, doTheThingAction, FirstAction} from "../../store/action";
import {createStructuredSelector} from "reselect";
import {makeSelectIsLoggedIn, makeSelectProjectTitle} from "../../store/selectors";
import { default as styledj } from 'styled-jss';
import CustomMenuItem from "../../components/CustomMenuItem/CustomMenuItem";
import AppNavBar from "../../components/AppNavBar/AppNavBar";
import blueLogo from '../../images/blueLogo.svg';
import whitePlaneNoBackground from '../../images/whitePlaneNoBackground.svg';
import whiteText from '../../images/whiteText.svg';
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
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: '100%',
    background: 'none',
    border: 'none',
    overflow: 'hidden;',
    flex: '1 0 0px',
  },
  flex: {
    flex: 1,
  },
  hideMobile: {
    height: '100%',
    transition: `all ${ANIMATION_SPEED}s`,
    opacity: 0,
    [theme.breakpoints.up('md')]: {
      opacity: 1,
    },
  },
  showMobile: {
    height: '100%',
    transition: `all ${ANIMATION_SPEED}s`,
    opacity: 1,
    [theme.breakpoints.up('md')]: {
      opacity: 1,
    },
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  content2: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    flex: '1 0 auto',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  footerWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    overflow: 'auto',
    overflowX: 'hidden',
    height: '100%',
    marginTop: theme.spacing.unit * HEADER_HEIGHT_UNIT_MULTIPLIER,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * SM_HEADER_HEIGHT_UNIT_MULTIPLIER,
    },
  },
  footer: {
    borderTop: '1px solid #cdcdcd',
    backgroundColor: '#fafafa',
    width: '100%',
    bottom: 0,
  },
  screenLogo: {
    height: '100%',
    // margin: 'auto',
    width: 'calc(100% - 24px)',
    objectFit: 'cover',
  },
  mobileLogo: {
    height: '64px',
    width: '100%',
    objectFit: 'cover'
  },
  logoContainer: {
    marginLeft: '8px',
    paddingRight: '8px',
    overflow: 'hidden'
  }
});

export const HEADER_HEIGHT_UNIT_MULTIPLIER = 7;
export const SM_HEADER_HEIGHT_UNIT_MULTIPLIER = 8;
export const SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER = 30;
export const MD_SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER = 12;
export const SM_SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER = 0;
export const ANIMATION_SPEED = 0.5;


const AppBarInterceptor = (props) => {
  const {
    widthBreakpoint,
    ...rest
  } = props;

  return <AppBar {...rest} />;
};


const AppBarWrapper = styledj(AppBarInterceptor)(({theme, widthBreakpoint}) => ({
  maxHeight: `${theme.spacing.unit * HEADER_HEIGHT_UNIT_MULTIPLIER}px`,
  transition: `padding-left ${ANIMATION_SPEED}s`,
  width: '100%',
  paddingLeft: `${theme.spacing.unit * SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER}px`,

  ...isWidthDown('sm', widthBreakpoint)
  && {
    paddingLeft: `${theme.spacing.unit * MD_SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER}px`,
  },
  ...isWidthDown('xs', widthBreakpoint)
  && {
    paddingLeft: `${theme.spacing.unit * SM_SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER}px`,
  },
  ...isWidthUp('xs', widthBreakpoint)
  && {
    maxHeight: `${theme.spacing.unit * SM_HEADER_HEIGHT_UNIT_MULTIPLIER}px`,
  },
}));
const DrawerInterceptor = (props) => {
  const {
    widthBreakpoint,
    ...rest
  } = props;

  return <Drawer {...rest} />;
};

const ResponsiveDrawer = styledj(DrawerInterceptor)(({theme, widthBreakpoint}) => ({
  boxShadow: `${[theme.shadows[12], theme.shadows[12]].join(',')}`,
  zIndex: `${theme.zIndex.drawer}`,
  borderRight: `${theme.palette.primary[900]}`,
  overflow: 'auto',
  overflowX: 'hidden',
  transition: `width ${ANIMATION_SPEED}s`,
  width: `${theme.spacing.unit * SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER}px`,
  ...isWidthDown('sm', widthBreakpoint)
  && {
    width: `${theme.spacing.unit * MD_SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER}px`,
  },
  ...isWidthDown('xs', widthBreakpoint)
  && {
    width: `${theme.spacing.unit * SM_SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER}px`,
  },
  display: 'flex',
  flexFlow: 'column nowrap',
  position: 'absolute',
  height: '100%',
}));

const ResponsiveContentContainer = styledj('div')(({theme, widthBreakpoint}) => ({
  height: '100%',
  position: 'absolute',
  left: 0,
  boxSizing: 'border-box',
  display: 'flex',
  flexFlow: 'row nowrap',
  transition: `padding-left ${ANIMATION_SPEED}s`,
  width: '100%',
  paddingLeft: `${theme.spacing.unit * SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER}px`,

  ...isWidthDown('sm', widthBreakpoint)
  && {
    paddingLeft: `${theme.spacing.unit * MD_SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER}px`,
  },


  ...isWidthDown('xs', widthBreakpoint)
  && {
    paddingLeft: `${theme.spacing.unit * SM_SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER}px`,
  },
}));

const MobileMenu = styledj('div')(({theme, widthBreakpoint, menuOpen}) => ({
  transition: `all ${ANIMATION_SPEED}s`,
  display: 'none',
  minWidth: 0,
  paddingTop: `${theme.spacing.unit * HEADER_HEIGHT_UNIT_MULTIPLIER}px`,
  ...isWidthDown('xs', widthBreakpoint)
  && {
    display: 'flex',
    width: 0,
    flex: menuOpen ? '1 0 auto' : '0 1 0',
  },
  ...isWidthUp('xs', widthBreakpoint)
  && {
    paddingTop: `${theme.spacing.unit * SM_HEADER_HEIGHT_UNIT_MULTIPLIER}px`,
  },
}));

const ContentWrapper = styledj('div')(({theme, widthBreakpoint, menuOpen}) => ({
  display: 'flex',
  flexDirection: 'column',
  transition: `all ${ANIMATION_SPEED}s`,
  overflow: 'auto',
  flex: 1,
  ...isWidthDown('xs', widthBreakpoint)
  && {
    width: 0,
    flex: menuOpen ? 0 : 1,
  },
}));


interface IAppMenuComponentProps {
  classes: any;
  theme: any;

}

interface IAppMenuProps extends IAppMenuComponentProps{
  firstAction: any;
  createProject: any;
  doTheThing: any;
  state: any;
  projects: any;
  projectTitle: any;
  menuItems: any;
  isLoggedIn: boolean;
}


type AppMenuProps = IAppMenuComponentProps & WithWidth & IAppMenuProps & WithStyles<keyof ReturnType<typeof styles>>;

export const CreateProjectContext = React.createContext({} as any)
class AppMenu extends React.Component<AppMenuProps> {
  state = {
    isOpen: true,
    isCreateProjectOpen: false,
  };

  handleDrawerOpen = () => {
    this.setState({ isOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ isOpen: false });
  };

  public toggleMenu = () =>  {
    this.setState({ isOpen: !this.state.isOpen });
  }

  public buttonHandler = () => {
    const {
      state,
      firstAction,
      createProject,
      doTheThing
    } = this.props;

    // createProject({
    //   title: 'dadada',
    //   content: 'blahbalhba'
    // })

    doTheThing();

  }

  public customIcon = (iconName: IconProp) => (
    <FontAwesomeIcon
      icon={iconName}
    />
  )

  render() {
    const { classes, theme, projects, projectTitle, menuItems, width: widthBreakpoint, isLoggedIn } = this.props;

    const {isOpen} = this.state;
    //
    // console.log('projects: ', projects);
    // console.log('projectTitle: ', projectTitle);

    // const logo = (
    //   <div
    //     className={classes.showMobile}
    //   >
    //     <img
    //       src={blueLogo}
    //       alt="logo"
    //       className={classes.screenLogo}
    //     />
    //   </div>
    // )
    //
    // const plane = (
    //   <div
    //     className={classes.hideMobile}
    //   >
    //     <img
    //       src={bluePlane}
    //       alt="logo"
    //       className={classes.mobileLogo}
    //     />
    //   </div>
    // )

    const logo = (
      <Grid
        container={true}
        direction='row'
        alignItems='center'
        className={classes.logoContainer}
      >
        <Grid
          item={true}
          xs={8}
          md={3}
          className={classes.showMobile}
        >
          <img
            src={whitePlaneNoBackground}
            alt="asd"
            className={classes.mobileLogo}
          />
        </Grid>
        <Grid
          item={true}
          xs={9}
          className={classes.hideMobile}
        >
          <img
            src={whiteText}
            alt="dsa"
            className={classes.mobileLogo}

          />
        </Grid>
      </Grid>
    )

    const showMenuItems = isLoggedIn && menuItems
    return (
      <div className={classes.root}>
        <CreateProjectContext.Provider
          value={{
            isCreateProjectOpen: this.state.isCreateProjectOpen,
            setIsCreateProjectOpen: (value: Boolean) => this.setState({isCreateProjectOpen: value})
          }}
        >
        <CssBaseline />
        <AppBarWrapper
          widthBreakpoint={widthBreakpoint}
          style={{backgroundColor: 'white'}}
        >
          <Toolbar>
            {/*{HeaderContents}*/}
            {
              isWidthDown('xs', widthBreakpoint) &&
              <IconButton onClick={this.toggleMenu} aria-label='Toggle Application Menu'>
                  <FontAwesomeIcon icon='bars' />
              </IconButton>
            }
            <AppNavBar/>
          </Toolbar>
        </AppBarWrapper>
        <ResponsiveDrawer
          widthBreakpoint={widthBreakpoint}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor='left'
        >
          <AppBar
            position='static'
            color='primary'
            style={{
              height: '64px',
            }}
          >
            {logo}
          </AppBar>
          <List
            style={{
            }}
          >
            {showMenuItems}
          </List>
        </ResponsiveDrawer>
        <ResponsiveContentContainer
            widthBreakpoint={widthBreakpoint}
        >
          <MobileMenu
            menuOpen={isOpen}
            widthBreakpoint={widthBreakpoint}
            style={{
              background: `linear-gradient(180deg, ${theme.palette.primary[500]} 0%, ${theme.palette.primary[700]} 25% )`,
            }}
          >
            <List>
              {showMenuItems}
            </List>
          </MobileMenu>
          <ContentWrapper
            menuOpen={isOpen}
            widthBreakpoint={widthBreakpoint}
          >
            <div
              className={classNames('footerWrapper', classes.footerWrapper)}
            >
              <div className={classes.content}>
                {this.props.children}
                </div>
            </div>
          </ContentWrapper>
        </ResponsiveContentContainer>
        </CreateProjectContext.Provider>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    firstAction: () => { dispatch(FirstAction()) },
    createProject: (project) => { dispatch(CreateProjectAction(project)) },
    doTheThing: (project) => { dispatch(doTheThingAction()) }
  };
}


const mapStateToProps = (state: any) => {
  return createStructuredSelector({
    isLoggedIn: makeSelectIsLoggedIn(),
    // projectTitle: makeSelectProjectTitle()
  })(state)
}

export default compose<React.ComponentClass<any>>(
  withWidth(),
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(AppMenu);
