import * as React from 'react';
import {
  Button, Grid,
  Theme, Typography,
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

interface ILoginComponentComponentProps {
  onHandleSubmit?: any;
  onSubmit?: any;
  loginError?: any;
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
            label='Mail'
            formControlProps={{
              fullWidth: true,
            }}
            validate={[required]}
          />
          <Field
            name='password'
            component={FieldTextField}
            label='Password'
            type='password'
            validate={[required, minLength]}
          />
          {
            props.loginError &&
              <Grid>
                <Typography
                  variant='h6'
                  style={{
                    color: 'red'
                  }}
                >
                  Wrong Email or Password
                </Typography>
              </Grid>
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
              Login
            </Button>
          </Grid>

        </Grid>
      </Grid>
    </form>

  );
}

export default compose<React.ComponentClass<ILoginComponentComponentProps>>(
  withStyles(styles),
)(LoginComponent);