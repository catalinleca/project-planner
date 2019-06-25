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

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IAppNavBarComponentProps {
}

//from state
interface IAppNavBarProps extends IAppNavBarComponentProps {
}

type AppNavBarType = IAppNavBarProps & WithStyles<keyof ReturnType<typeof styles>>;

class AppNavBar extends React.Component<AppNavBarType, {}> {
  render() {
    return (
      <Grid
        container={true}
        direction='row-reverse'
      >
        <Button>
          sugi puliica
        </Button>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {

  }
}

export default compose<React.ComponentClass<IAppNavBarComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps)
)(AppNavBar);