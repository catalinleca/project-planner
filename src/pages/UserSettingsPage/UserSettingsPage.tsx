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
import {UploadFileAction} from "../../store/action";
import {makeSelectDataById, makeSelectIsAdmin, makeSelectLoggedInUserId} from "../../store/selectors";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IUserSettingsPageComponentProps {
  onClick: any;
}

//from state
interface IUserSettingsPageProps extends IUserSettingsPageComponentProps {
  onFilesDropAction?: any
  loggedInUserId: string
  currentUserId: string
}

type UserSettingsPageType = IUserSettingsPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class UserSettingsPage extends React.Component<UserSettingsPageType, {}> {
  public onFilesDrop = files => {
    console.log(files);
    this.props.onFilesDropAction(files[0])
  }

  render() {
    const {
      children,
      loggedInUserId,
      currentUserId
    } = this.props;

    console.log(this.props);

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

    return (
      <Grid>
        {profilePicUpload}
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
    onFilesDropAction: (files) => dispatch(UploadFileAction(files))
  };
}
export default compose<React.ComponentClass<IUserSettingsPageComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(UserSettingsPage);
