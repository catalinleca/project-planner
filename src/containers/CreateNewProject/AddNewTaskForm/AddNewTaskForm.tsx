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

interface IAddNewTaskFormComponentProps {
}

//from state
interface IAddNewTaskFormProps extends IAddNewTaskFormComponentProps {
}

type AddNewTaskFormType = IAddNewTaskFormProps & WithStyles<keyof ReturnType<typeof styles>>;

const AddNewTaskForm: React.FC<AddNewTaskFormType> = (props) => {
  return (
    <Grid
      container={true}
      direction='row'
    >
      <Grid item={true} xs={4}> Item 1</Grid>
      <Grid item={true} xs={4}> Item 1</Grid>
      <Grid item={true} xs={4}> Item 1</Grid>
      <Grid item={true} xs={4}> Item 1</Grid>
      <Grid item={true} xs={4}> Item 1</Grid>
      <Grid item={true} xs={4}> Item 1</Grid>

    </Grid>
  );
}

export default compose<React.ComponentClass<IAddNewTaskFormComponentProps>>(
  withStyles(styles),
)(AddNewTaskForm);