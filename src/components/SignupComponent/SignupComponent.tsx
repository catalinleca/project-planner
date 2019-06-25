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
import { Field } from 'redux-form';

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface ISignupComponentComponentProps {
  onHandleSubmit?: any;
  onSubmit?: any;
}

//from state
interface ISignupComponentProps extends ISignupComponentComponentProps {
}

type SignupComponentType = ISignupComponentProps & WithStyles<keyof ReturnType<typeof styles>>;

const SignupComponent: React.FC<SignupComponentType> = (props) => {
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
        <Field
          name='confirmedPassword'
          component={FieldTextField}
          label='Confirm Your Password'
          type='password'
        />
        <Field
          name='mail'
          component={FieldTextField}
          label='Mail'
          type='mail'
        />
        <Field
          name='jobTitle'
          component={FieldTextField}
          label='Job Title'
          type='text'
        />
        <Field
          name='mobilePhone'
          component={FieldTextField}
          label='Mobile Phone'
          type='number'
        />
        <Button type='submit'>
          Sign Up
        </Button>
      </Grid>
    </form>
  );
}

export default compose<React.ComponentClass<ISignupComponentComponentProps>>(
  withStyles(styles),
)(SignupComponent);