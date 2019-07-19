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
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {ButtonProps} from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
import {
  ChangeUserCredentialsAction,
  UploadUserAvatarAction
} from "../../store/action";
import {
  makeSelectDataById,
  makeSelectIsAdmin,
  makeSelectLoggedInUserId
} from "../../store/selectors";
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import FieldTextField from "../../components/FieldTextField/FieldTextField";
import {NewCredentials} from "../../utils/types/types";
import { SubmissionError } from 'redux-form'
import {min} from "moment";
import {push} from "connected-react-router";
import {pick, USER_DETAILS, USER_SETTINGS_PATH} from "../../utils/constants";
import UploadPicture from "../../components/UploadPicture/UploadPicture";
import {required, minLength} from "../../utils/validators/validators";
import AvatarButton from "../../components/AvatarButton/AvatarButton";


const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IUserSettingsPageComponentProps {
  onClick: any;
}

// type DataShape = {[fieldName:string]: any};
//
// type FormErrors<FormData extends DataShape> = FormData & { _error?: string };

//from state
interface IUserSettingsPageProps extends IUserSettingsPageComponentProps {
  uploadUserAvatar?: any
  loggedInUserId: string
  currentUserId: string
  handleSubmit: any
  changeUserCredentials: any
  checkCurrentPasswordAction: any
  dispatch: any
  currentUser: any
}

type UserSettingsPageType = IUserSettingsPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class UserSettingsPage extends React.Component<UserSettingsPageType, {}> {
  public onFilesDrop = files => {
    console.log(files);
    this.props.uploadUserAvatar(files[0])
  }


  public submit = values => {
    const {
      changeUserCredentials
    } = this.props;

    console.log('values: ', values);

    return changeUserCredentials(values)
  }

  public static validateForm = (values: NewCredentials) => {
    const errors: NewCredentials = {};
    if(values.newPassword !== values.confirmedNewPassword) {
      errors.confirmedNewPassword = 'New Passwords Does Not Match'
    }
    if(!values.newMail && !values.newPassword && !values.confirmedNewPassword) {
      errors.newMail = 'You have to change the password or the mail!'
    }

    return errors;
  }

  componentDidMount() {
    const {
      loggedInUserId,
      currentUserId,
      dispatch
    } = this.props

    if (loggedInUserId !== currentUserId ) {
     dispatch(push(`${USER_DETAILS}/${loggedInUserId}/settings`))
    }
  }


  render() {
    const {
      loggedInUserId,
      currentUserId,
      currentUser,
      handleSubmit
    } = this.props;

    console.log(this.props);
    console.log('this.state: ', this.state);


    const showUserAvatar = currentUser && (
      <Grid
        style={{marginBottom: '8px'}}
      >
        <AvatarButton
          userData={pick(currentUser, ['avatar', 'firstName', 'lastName'])}
        />
      </Grid>

    )

    const profilePicUpload = (loggedInUserId === currentUserId) && (
      <Grid
        container={true}
        direction='column'
        alignItems='center'
      >
        {showUserAvatar}
        <UploadPicture
          onFilesDrop={this.onFilesDrop}
          label='Upload Picture'
        />
      </Grid>
    )

    const changePassword = (
      <form onSubmit={handleSubmit(this.submit)}>
        <Grid
          container={true}
          justify='center'
        >
          <Grid
            item={true}
            xs={8}
            container={true}
            direction='column'
            justify='space-evenly'
            alignItems='center'
          >
            <Field
              name='currentPassword'
              component={FieldTextField}
              label='Current Password'
              formControlProps={{
                fullWidth: true,
              }}
              props={{
                type: 'password',
                required: true
              }}
              validate={[required, minLength]}
            />
            <Field
              name='newPassword'
              component={FieldTextField}
              label='New Password'
              formControlProps={{
                fullWidth: true,
              }}
              props={{
                type: 'password',
              }}
              validate={[minLength]}
            />
            <Field
              name='confirmedNewPassword'
              component={FieldTextField}
              label='Confirm New Password'
              formControlProps={{
                fullWidth: true,
              }}
              props={{
                type: 'password',
              }}
              validate={[minLength]}
            />
            <Field
              name='newMail'
              component={FieldTextField}
              label='New Mail'
              formControlProps={{
                fullWidth: true,
              }}
              props={{
                type: 'mail',
              }}
            />
            <Button
              type='submit'
            >
              Button
            </Button>
          </Grid>
        </Grid>
      </form>
    )

    return (
      <Grid>
        {profilePicUpload}
        {changePassword}
      </Grid>
    )
  }
}

const mapStateToProps = (state: any, ownProps) => {
  const currentUserId = ownProps.match.params.id;

  // doesn't use ownProps so technically there is no need for memoization
  // if the arguments do not change then the function will return the previous value
  // the argument is the state, that means each time the selector is called, that state is changed
  // because otherwise mapStateToProps wouldn't have been called in the first place, but but but,
  // if memoization keeps only the last value then, YES indeed there is no need for memoization
  //, but if the memoization will do it's job for all the values that the function was called in the past
  // then, considering the change of rerunning the selector with the same state values again will lead
  // to increase performance because of the memoization

  const {
    loggedInUserId,
    currentUser
  } =  createStructuredSelector({
    loggedInUserId: makeSelectLoggedInUserId(),
    currentUser: makeSelectDataById('users', currentUserId)
  })(state);

  return {
    loggedInUserId,
    currentUserId,
    currentUser
  }

};

export function mapDispatchToProps(dispatch: React.Dispatch<any>) {
  return {
    dispatch,
    uploadUserAvatar: (files) => dispatch(UploadUserAvatarAction(files)),
    changeUserCredentials: (values) => dispatch(ChangeUserCredentialsAction(values)),
  };
}
export default compose<React.ComponentClass<IUserSettingsPageComponentProps>>(
  reduxForm({
    form: 'changePassword',
    validate: UserSettingsPage.validateForm
  }),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(UserSettingsPage);
