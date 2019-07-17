import * as React from 'react';
import {
  Grid,
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
import UploadPicture from "../UploadPicture/UploadPicture";
import {connect} from "react-redux";
import {IAction} from "../../utils/interfaces";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface ITaskPicturesComponentProps {
}

//from state
interface ITaskPicturesProps extends ITaskPicturesComponentProps {
  uploadTaskPictures?: any;
}

type TaskPicturesType = ITaskPicturesProps & WithStyles<keyof ReturnType<typeof styles>>;

const TaskPictures: React.FC<TaskPicturesType> = (props) => {
  const onFilesDrop = (files) => {
  }

  return (
    <UploadPicture
      onFilesDrop={onFilesDrop}
      label='Add Pictures For A Better Understanding'
    />
  );
}

export const mapStateToProps = (state) => {
  return {

  }
}

export const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
  }
}
export default compose<React.ComponentClass<ITaskPicturesComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(TaskPictures);