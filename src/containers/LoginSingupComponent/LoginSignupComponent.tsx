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
import {doTheThingAction, SignInAction} from "../../store/action";

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
}

//from state
interface ILoginSignupComponentProps extends ILoginSignupComponentComponentProps {
  handleSubmit?: any;
  signIn?: any;
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
    console.log('handleLogin: ', values)
    this.props.signIn(values)
  }

  public handleSignup = ( values ) => {
    console.log('handleSingup: ', values)
  }

  render() {
    const {
      classes
    } = this.props;

    return (
      <Grid>
        <Modal
          open={true}
        >
          <Grid style={this.getModalStyle()} className={classes.paper}>
            <LoginComponent
              onHandleSubmit={this.props.handleSubmit}
              onSubmit={this.handleLogin}
            />
          </Grid>
        </Modal>

      </Grid>
    );
  }
}

const mapStateToProps = (state) => {

  return {

  }
}

export function mapDispatchToProps(dispatch: React.Dispatch<any>) {
  return {
    signIn: (creds) => { dispatch(SignInAction(creds)) }
};
}

export default compose<React.ComponentClass<ILoginSignupComponentComponentProps>>(
  withStyles(styles),
  reduxForm({
    form: 'loginSignupForm'
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginSignupComponent);