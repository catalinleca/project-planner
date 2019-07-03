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
import {makeSelectIsLoggedIn} from "../../store/selectors";
import {SignOutAction, toggleTaskDrawerAction} from "../../store/action";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IAppNavBarComponentProps {
}

//from state
interface IAppNavBarProps extends IAppNavBarComponentProps {
  isLoggedIn: boolean
  logOut: any;
}

type AppNavBarType = IAppNavBarProps & WithStyles<keyof ReturnType<typeof styles>>;

class AppNavBar extends React.Component<AppNavBarType, {}> {
  public logOutHandler = () => {
    this.props.logOut();
  }
  render() {
    const {
      isLoggedIn
    } = this.props;

    return (
      <Grid
        container={true}
        direction='row-reverse'
      >
        <Button>
          sugi puliica
        </Button>
        {
          isLoggedIn &&
            <Button
              variant='outlined'
              color='primary'
              onClick={this.logOutHandler}
            >
              Log Out
            </Button>

        }
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn()
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