import * as React from 'react';
import {
  Button, Grid,
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
import FieldTextField from "../FieldTextField/FieldTextField";
import {Field} from 'redux-form';

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface ILoginComponentComponentProps {
  onHandleSubmit?: any;
  onSubmit?: any;
}

//from state
interface ILoginComponentProps extends ILoginComponentComponentProps {
}

type LoginComponentType = ILoginComponentProps & WithStyles<keyof ReturnType<typeof styles>>;

const LoginComponent: React.FC<LoginComponentType> = (props) => {
  return (
    <form onSubmit={props.onHandleSubmit(props.onSubmit)}>
      <Grid
        container={true}
        direction='column'
      >
        <Field
          name='username'
          component={FieldTextField}
          label='Username'
          formControlProps={{
            fullWidth: true,
          }}
        />
        <Field
          name='password'
          component={FieldTextField}
          label='Password'
          type='password'
        />
        <Button type='submit'>
          Login
        </Button>
      </Grid>
    </form>

  );
}

export default compose<React.ComponentClass<ILoginComponentComponentProps>>(
  withStyles(styles),
)(LoginComponent);