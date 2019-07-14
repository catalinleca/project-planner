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
  ChangeUserPasswordAction,
  UploadFileAction
} from "../../store/action";
import {
  makeSelectDataById,
  makeSelectIsAdmin,
  makeSelectLoggedInUserId
} from "../../store/selectors";
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import FieldTextField from "../../components/FieldTextField/FieldTextField";
import {NewPassword} from "../../utils/types/types";
import { SubmissionError } from 'redux-form'
import {min} from "moment";


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
  onFilesDropAction?: any
  loggedInUserId: string
  currentUserId: string
  handleSubmit: any
  changeUserPassword: any
  checkCurrentPasswordAction: any
}

type UserSettingsPageType = IUserSettingsPageProps & WithStyles<keyof ReturnType<typeof styles>>;

const required = value => value ? undefined : 'Required'
const minLength = value => value && value.length < 6 ? `Password must have minimum 6 charaters` : undefined

class UserSettingsPage extends React.Component<UserSettingsPageType, {}> {
  public onFilesDrop = files => {
    console.log(files);
    this.props.onFilesDropAction(files[0])
  }


  public submit = values => {
    const {
      changeUserPassword
    } = this.props;

    console.log('values: ', values);

    return changeUserPassword(values.currentPassword, values.newPassword)
  }

  public static validateNewPassword = (values: NewPassword) => {
    const errors: NewPassword = {};
    if(values.newPassword !== values.confirmedNewPassword) {
      errors.confirmedNewPassword = 'New Passwords Does Not Match'
    }

    return errors;
  }

  render() {
    const {
      children,
      loggedInUserId,
      currentUserId,
      handleSubmit
    } = this.props;

    console.log(this.props);
    console.log('this.state: ', this.state);


    const profilePicUpload = (loggedInUserId === currentUserId) && (
      <Dropzone onDrop={this.onFilesDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
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
                required: true
              }}
              validate={[required, minLength]}
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
                required: true
              }}
              validate={[required, minLength]}
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
  } =  createStructuredSelector({
    loggedInUserId: makeSelectLoggedInUserId(),
  })(state);

  return {
    loggedInUserId,
    currentUserId
  }

};

export function mapDispatchToProps(dispatch: React.Dispatch<any>) {
  return {
    dispatch,
    onFilesDropAction: (files) => dispatch(UploadFileAction(files)),
    changeUserPassword: (currentPassword, newPassword) => dispatch(ChangeUserPasswordAction(currentPassword, newPassword)),
  };
}
export default compose<React.ComponentClass<IUserSettingsPageComponentProps>>(
  reduxForm({
    form: 'changePassword',
    validate: UserSettingsPage.validateNewPassword
  }),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(UserSettingsPage);
