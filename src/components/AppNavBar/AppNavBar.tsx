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
import {makeSelectIsAdmin, makeSelectIsLoggedIn, makeSelectLoggedInUserId} from "../../store/selectors";
import {SignOutAction, toggleTaskDrawerAction} from "../../store/action";
import {push} from "connected-react-router";
import {ADD_USER, USER_DETAILS} from "../../utils/constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, LinkProps} from "react-router-dom";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const styles = (theme: Theme): StyleRules => ({
  root: {}
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
      loggedInUserId
    } = this.props;

   dispatch(push(`${USER_DETAILS}/${loggedInUserId}/${value.path}`))
  }


  public handleClose = () => {
    this.setState({anchorEl: null});
  }

  render() {
    const {
      isLoggedIn,
      isAdmin
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
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={e => this.handleOpen(e)}>
          Open Menu
        </Button>
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

    return (
      <Grid
        container={true}
        direction='row-reverse'
      >
        {myAccountButton}
        {logoutButton}
        {addUserButton}
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  isAdmin: makeSelectIsAdmin(),
  loggedInUserId: makeSelectLoggedInUserId()
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
