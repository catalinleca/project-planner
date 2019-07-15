import * as React from 'react';
import {
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

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IAddNewAdminPageComponentProps {
}

//from state
interface IAddNewAdminPageProps extends IAddNewAdminPageComponentProps {
}

type AddNewAdminPageType = IAddNewAdminPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class AddNewAdminPage extends React.Component<AddNewAdminPageType, {}> {
  render() {
    return (
      <Grid>
        asd

      </Grid>
    );
  }
}

export default compose<React.ComponentClass<IAddNewAdminPageComponentProps>>(
  withStyles(styles),
)(AddNewAdminPage);