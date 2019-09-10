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
import {minLength, required} from "../../utils/validators/validators";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface ISignupComponentComponentProps {
  onHandleSubmit?: any;
  onSubmit?: any;
  isLoggedIn?: any;
}

//from state
interface ISignupComponentProps extends ISignupComponentComponentProps {
}

type SignupComponentType = ISignupComponentProps & WithStyles<keyof ReturnType<typeof styles>>;

const SignupComponent: React.FC<SignupComponentType> = (props) => {
  return (
    <form onSubmit={props.onHandleSubmit(props.onSubmit)}>
      <Grid>
        <Grid
          container={true}
          justify='center'
        >
          <Grid
            item={true}
            xs={6}
            container={true}
            direction='column'
          >

            <Field
              name='username'
              component={FieldTextField}
              label='Username'
              props={{
                required: true
              }}
              validate={[required]}
            />
            <Field
              name='password'
              component={FieldTextField}
              label='Password'
              type='password'
              props={{
                type: 'password',
                required: true
              }}
              validate={[required, minLength]}
            />
            <Field
              name='confirmedPassword'
              component={FieldTextField}
              label='Confirm Your Password'
              type='password'
              props={{
                type: 'password',
                required: true
              }}
              validate={[required, minLength]}
            />
            <Field
              name='email'
              component={FieldTextField}
              label='Mail'
              type='mail'
              props={{
                type: 'mail',
                required: true
              }}
              validate={[required]}
            />
            <Grid
              item={true}
              container={true}
              direction='row'
              justify='space-between'
            >
              <Grid
                item={true}
                xs={12}
                md={5}
              >
                <Field
                  name='firstName'
                  component={FieldTextField}
                  label='First Name'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  props={{
                    required: true
                  }}
                  validate={[required]}
                />
              </Grid>
              <Grid
                item={true}
                xs={12}
                md={5}
              >
                <Field
                  name='lastName'
                  component={FieldTextField}
                  label='Last Name'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  props={{
                    required: true
                  }}
                  validate={[required]}
                />
              </Grid>
            </Grid>
            <Grid
              item={true}
              container={true}
              direction='row'
              justify='space-between'
            >
              <Grid
                item={true}
                xs={12}
                md={5}
              >
                <Field
                  name='jobTitle'
                  component={FieldTextField}
                  label='Job Title'
                  type='text'
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </Grid>
              <Grid
                item={true}
                xs={12}
                md={5}
              >
                <Field
                  name='mobilePhone'
                  component={FieldTextField}
                  label='Mobile Phone'
                  type='number'
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </Grid>
            </Grid>
            {
              !props.isLoggedIn &&
              <Field
                name='adminPassword'
                component={FieldTextField}
                label='Admin Password'
                type='number'
                formControlProps={{
                  fullWidth: true,
                }}
                props={{
                  type: 'password',
                  required: true
                }}
                validate={[required, minLength]}
              />
            }
            <Grid
              item={true}
              style={{
                margin: '16px auto'
              }}
            >
              <Button
                type='submit'
                variant='outlined'
                color='primary'
              >
                Sign Up
              </Button>
            </Grid>

          </Grid>

        </Grid>
      </Grid>
    </form>
  );
}

export default compose<React.ComponentClass<ISignupComponentComponentProps>>(
  withStyles(styles),
)(SignupComponent);
