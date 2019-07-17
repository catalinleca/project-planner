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
import Dropzone from "react-dropzone";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  uploadPicture: {
    marginLeft: '8px'
  }
});

interface IUploadPictureComponentProps {
  onFilesDrop: any;
  label: string | React.ReactElement;
  input?: any;
}

//from state
interface IUploadPictureProps extends IUploadPictureComponentProps {
}

type UploadPictureType = IUploadPictureProps & WithStyles<keyof ReturnType<typeof styles>>;

const UploadPicture: React.FC<UploadPictureType> = ({onFilesDrop, label, classes, input}) => {
  // don t forget to take the meta as well

  const formProps = (input) => {
    if (!input) {
      return
    }

    const {
      value: omitValue, onChange, onBlur, ...inputProps
    } = input

    return {
      onChange: (e) => adaptFileEventToValue(onChange(e)),
      onBlur: (e) => adaptFileEventToValue(onBlur(e))
    }
  }

  const adaptFileEventToValue = delegate => e => delegate(e.target.files);

  return (
    <Grid>
      <Dropzone onDrop={onFilesDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} {...formProps(input)} />
              {
                React.isValidElement(label)
                  ? label
                  : <Button
                    variant='contained'
                    color='primary'
                  >
                    <Typography color='inherit' variant='caption'>{label}</Typography>
                    <FontAwesomeIcon icon='upload' className={classes.uploadPicture}/>
                  </Button>
              }
            </div>
          </section>
        )}
      </Dropzone>
    </Grid>

  );
}

export default compose<React.ComponentClass<IUploadPictureComponentProps>>(
  withStyles(styles),
)(UploadPicture);