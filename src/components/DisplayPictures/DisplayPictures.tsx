import * as React from 'react';
import {
  Grid, IconButton,
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalImage from "../ModalImage/ModalImage";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  pictureItem: {
    marginRight: '8px'
  }
});

interface IDisplayPicturesComponentProps {
  pictures: any;
  removePictureItem: any;
  edit?: boolean
}

//from state
interface IDisplayPicturesProps extends IDisplayPicturesComponentProps {
}

type DisplayPicturesType = IDisplayPicturesProps & WithStyles<keyof ReturnType<typeof styles>>;

const DisplayPictures: React.FC<DisplayPicturesType> = ({pictures, removePictureItem, classes, edit = false}) => {

  return (
    <Grid
      container={true}
      direction='row'
      alignItems='center'
      style={{width: '100%', marginBottom: '8px'}}
    >
      {pictures && pictures.map( (value, index) => {
        console.log(value.name);
        return (
          <Grid
            item={true}
            key={`${index}${value}`}
          >
            <Grid
              container={true}
              direction='column'
              justify='center'
              alignItems='center'
              className={classes.pictureItem}
            >
              {
                edit && <IconButton
                    onClick={(index) => removePictureItem(index)}
                >
                    <FontAwesomeIcon
                        icon='times'
                        size='xs'
                    />
                </IconButton>
              }
              <ModalImage
                picture={value}
              />
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  );
}

export default compose<React.ComponentClass<IDisplayPicturesComponentProps>>(
  withStyles(styles),
)(DisplayPictures);