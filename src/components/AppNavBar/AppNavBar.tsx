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
import CreateNewProject from "../../containers/CreateNewProject/CreateNewProject";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  buttonSpacing: {
    marginLeft: '6px',
    marginRight: '6px'
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
    anchorEl: null,
    isOpen: false
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

    console.log('value: ', value);
    value.path
      ? dispatch(push(`${USER_DETAILS}/${loggedInUserId}/${value.path}`))
      : value.action()

    this.handleClose();
  }


  public handleClose = () => {
    this.setState({anchorEl: null});
  }

  public setOpen = (value) => {
    this.setState({isOpen: value})
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
      },
      {
        text: 'Logout',
        icon: 'sign-out-alt',
        action: () => this.props.logOut()
      }

    ]

    const {
      anchorEl
    } = this.state;

    const myAccountButton = (
      <div>
        {
          userData &&
            <AvatarButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                userData={userData}
                onClickHandler={e => this.handleOpen(e)}
            />
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

    const addUserButton = isAdmin && (
      <Button
        variant='outlined'
        color='secondary'
        onClick={this.createNewUser}
        className={classes.buttonSpacing}

      >
        Add User
      </Button>
    )
    // 5fa544

    const createNewProjectButton = isAdmin && (
      <Button
        onClick={() => this.setState({isOpen: true})}
        variant='outlined'
        color='primary'
      >
        Create A New Project
      </Button>
    )

    return (
      <Grid
        container={true}
        direction='row-reverse'
      >
        <CreateNewProject
          isOpen={this.state.isOpen}
          setOpen={this.setOpen}
        />
        {myAccountButton}
        {addUserButton}
        {createNewProjectButton}
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
