import * as React from 'react';
import {
  Button,
  Grid,
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
import {ADD_USER} from "../../utils/constants";

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
}

type AppNavBarType = IAppNavBarProps & WithStyles<keyof ReturnType<typeof styles>>;

class AppNavBar extends React.Component<AppNavBarType, {}> {
  public logOutHandler = () => {
    this.props.logOut();
  }

  public createNewUser = () => {
    this.props.dispatch(push(ADD_USER))
  }

  render() {
    const {
      isLoggedIn,
      isAdmin
    } = this.props;

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
        <Button>
          sugi puliica
        </Button>
        {logoutButton}
        {addUserButton}
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  isAdmin: makeSelectIsAdmin(),
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