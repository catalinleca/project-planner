import * as React from 'react';
import {
  Button, Grid, Modal,
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
import FieldTextField from "../../components/FieldTextField/FieldTextField";
import { Field, reduxForm } from 'redux-form';
import LoginComponent from "../../components/LoginComponent/LoginComponent";
import SignupComponent from "../../components/SignupComponent/SignupComponent";
import {connect} from "react-redux";
import {IAction} from "../../utils/interfaces";
import {doTheThingAction, SignInAction, SignUpAction} from "../../store/action";
import {createStructuredSelector} from "reselect";
import {makeSelectIsLoggedIn} from "../../store/selectors";
import {push} from "connected-react-router";
import {HOME_PATH} from "../../utils/constants";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '32px',
    outline: 'none',
  },
});

interface ILoginSignupComponentComponentProps {
  admin?: boolean
}

//from state
interface ILoginSignupComponentProps extends ILoginSignupComponentComponentProps {
  dispatch?: any;
  handleSubmit?: any;
  signIn?: any;
  signUp?: any;
  isLoggedIn?: boolean;
}

type LoginSignupComponentType = ILoginSignupComponentProps & WithStyles<keyof ReturnType<typeof styles>>;

class LoginSignupComponent extends React.Component<LoginSignupComponentType, {}> {
  public getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  public handleLogin = ( values ) => {
    const {
      signIn,
      dispatch
    } = this.props;

    console.log('handleLogin: ', values)
    signIn(values)
    dispatch(push(HOME_PATH))
  }

  public handleSignup = ( values ) => {

    const {
      signUp,
      dispatch
    } = this.props;


    console.log('handleSingup: ', values)
    signUp({
      ...values,
      isAdmin: true
    });
    dispatch(push(HOME_PATH))
  }

  render() {
    const {
      classes,
      isLoggedIn,
      admin
    } = this.props;

    return (
      <Grid>
        {/*<Grid style={this.getModalStyle()} className={classes.paper}>*/}
        <Grid>
          {/*<Typography>*/}
          {/*  {*/}
          {/*    loggingIn*/}
          {/*      ? 'No Account? Sign up'*/}
          {/*      : 'Go back to Log In'*/}
          {/*  }*/}
          {/*</Typography>*/}
          {/*<Button*/}
          {/*  variant='text'*/}
          {/*  color='primary'*/}
          {/*  onClick={this.changeComponent}*/}
          {/*>*/}
          {/*  {*/}
          {/*    loggingIn*/}
          {/*      ? 'Sign Up'*/}
          {/*      : 'Log In'*/}
          {/*  }*/}
          {/*</Button>*/}
        </Grid>
        <Grid>
          {
            !admin
              ?
              <LoginComponent
                onHandleSubmit={this.props.handleSubmit}
                onSubmit={this.handleLogin}
              />
              :
              <SignupComponent
                onHandleSubmit={this.props.handleSubmit}
                onSubmit={this.handleSignup}
              />
          }
        </Grid>

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
    signIn: (creds) => { dispatch(SignInAction(creds)) },
    signUp: (newUser) => { dispatch(SignUpAction(newUser)) }
};
}

export default compose<React.ComponentClass<ILoginSignupComponentComponentProps>>(
  withStyles(styles),
  reduxForm({
    form: 'loginSignupForm'
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginSignupComponent);
