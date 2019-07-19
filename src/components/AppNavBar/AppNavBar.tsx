import * as React from 'react';
import {
  Button,
  Grid, ListItem, ListItemIcon, ListItemText, Menu, MenuItem,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import {connect} from "react-redux";
import {IAction} from "../../utils/interfaces";
import {createStructuredSelector} from "reselect";
import {
  makeSelectCurrentUserProperty,
  makeSelectIsAdmin,
  makeSelectIsLoggedIn,
  makeSelectLoggedInUserId
} from "../../store/selectors";
import {SignOutAction, toggleTaskDrawerAction} from "../../store/action";
import {push} from "connected-react-router";
import {ADD_USER, USER_DETAILS} from "../../utils/constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, LinkProps} from "react-router-dom";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import AvatarButton from "../AvatarButton/AvatarButton";
import {CreateProjectContext} from "../../containers/AppMenu/AppMenu";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  avatarButton: {
    marginLeft: '6px'
  }
});

interface IAppNavBarComponentProps {
}

//from state
interface IAppNavBarProps extends IAppNavBarComponentProps {
  isLoggedIn: boolean
  isAdmin: boolean
  logOut: any;
  dispatch: any;
  loggedInUserId: string;
  userData: {
    [key: string]: any
  };
}

type AppNavBarType = IAppNavBarProps & WithStyles<keyof ReturnType<typeof styles>>;

class AppNavBar extends React.Component<AppNavBarType, {}> {
  public state = {
    anchorEl: null
  };

  public logOutHandler = () => {
    this.props.logOut();
  };

  public createNewUser = () => {
    this.props.dispatch(push(ADD_USER))
  };

  public handleOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  public handleClick = (value) => {
    const {
      dispatch,
      loggedInUserId,
    } = this.props;

   dispatch(push(`${USER_DETAILS}/${loggedInUserId}/${value.path}`))
  }


  public handleClose = () => {
    this.setState({anchorEl: null});
  }

  render() {
    const {
      isLoggedIn,
      isAdmin,
      userData,
      classes
    } = this.props;

    const options = [
      {
        text: 'My Tasks',
        icon: 'tasks',
        path: 'tasks'
      },
      {
        text: 'My Account',
        icon: 'user',
        path: 'profile'
      },
      {
        text: 'Settings',
        icon: 'cog',
        path: 'settings'
      }
    ]

    const {
      anchorEl
    } = this.state;

    const myAccountButton = (
      <div>
        {
          userData &&
            <Grid
              className={classes.avatarButton}
            >
              <AvatarButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  userData={userData}
                  onClickHandler={e => this.handleOpen(e)}
              />
            </Grid>
        }
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {
            options.map( (value, index) => (
              <MenuItem
                key={`${value.text}${index}`}
                onClick={() => this.handleClick(value)}
              >
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={value.icon as IconProp}
                  />
                </ListItemIcon>
                <ListItemText primary={value.text}/>
              </MenuItem>

            ))
          }

        </Menu>
      </div>
    )

    const logoutButton = isLoggedIn && (
      <Button
        variant='outlined'
        color='primary'
        onClick={this.logOutHandler}
      >
        Log Out
      </Button>)

    const addUserButton = isAdmin && (
      <Button
        variant='outlined'
        color='secondary'
        onClick={this.createNewUser}
      >
        Add User
      </Button>
    )

    const createProjectButton = isAdmin && (
      <CreateProjectContext.Consumer>
        {({setIsCreateProjectOpen}) => (
          <Button
            onClick={() => setIsCreateProjectOpen(true)}
            variant='outlined'
            color='primary'
          >
            Create A New Project
          </Button>
        )}
      </CreateProjectContext.Consumer>
    )

    return (
      <Grid
        container={true}
        direction='row-reverse'
      >
        {myAccountButton}
        {logoutButton}
        {addUserButton}
        {createProjectButton}
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  isAdmin: makeSelectIsAdmin(),
  loggedInUserId: makeSelectLoggedInUserId(),
  userData: makeSelectCurrentUserProperty(['avatar', 'firstName', 'lastName'])
})

export function mapDispatchToProps(dispatch: React.Dispatch<any>) {
  return {
    dispatch,
    logOut: () => { dispatch(SignOutAction()) }

  };
}
export default compose<React.ComponentClass<IAppNavBarComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AppNavBar);
