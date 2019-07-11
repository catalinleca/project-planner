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

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IUserSettingsPageComponentProps {
  onClick: any;
}

//from state
interface IUserSettingsPageProps extends IUserSettingsPageComponentProps {
  onFilesDropAction?: any;
}

type UserSettingsPageType = IUserSettingsPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class UserSettingsPage extends React.Component<UserSettingsPageType, {}> {
  public onFilesDrop = files => {
    console.log(files);
    this.props.onFilesDropAction(files[0])
  }

  render() {
    const {
      children
    } = this.props;

    console.log(this.props);

    return (
      <Grid>
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
      </Grid>
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

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
