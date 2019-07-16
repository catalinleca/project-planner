import * as React from 'react';
import {
  Theme,
  ListItemIcon,
  withStyles,
  WithStyles, Typography, Grid, ListItemText,
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import {ListItem} from "@material-ui/core";
import {
  Link,
} from 'react-router-dom';
import {
  FontAwesomeIcon,
  Props as FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

import {
  isObject,
} from 'lodash';
import { isWidthDown } from '@material-ui/core/withWidth';
import classnames from 'classnames';
import {ResponsiveListItemText} from "../ResponsiveListItemText/ResponsiveListItemText";

export const HEADER_HEIGHT_UNIT_MULTIPLIER = 7;
export const SM_HEADER_HEIGHT_UNIT_MULTIPLIER = 8;
export const SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER = 30;
export const MD_SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER = 12;
export const SM_SIDEBAR_THEME_SPACING_UNIT_MULTIPLIER = 0;
export const ANIMATION_SPEED = 0.5;

const styles = (theme: Theme): StyleRules => ({
  menuItem: {
    justifyContent: 'center',
    height: theme.spacing.unit * 8,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
  },
  listItemTextColor: {
    color: theme.palette.primary.contrastText,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  listItemIcon: {
    width: 'auto',
    height: 'auto',
    opacity: 0.8,
    margin: 0,
    color: theme.palette.primary.main
  },
  listItemIconWidth: {
    width: theme.spacing.unit * 2.5,
    display: 'flex',
    justifyContent: 'center',
  },
});


interface ICustomMenuItemComponentProps {
  to: string;
  iconProps: FontAwesomeIconProps;
  label: string;
  width: any
}

//from state
interface ICustomMenuItemProps extends ICustomMenuItemComponentProps {
}

type CustomMenuItemType = ICustomMenuItemProps & WithStyles<keyof ReturnType<typeof styles>>;

class CustomMenuItem extends React.Component<CustomMenuItemType, {}> {
  render() {
    const {
      to,
      iconProps,
      label,
      width: widthBreakpoint,
      classes
    } = this.props;

    let linkProps = { };

    linkProps = {
      component: Link,
      to,
    };

    return (
      <ListItem
        button={true}
        disableGutters={true}
        {...linkProps}
        classes={{ root: classes.menuItem }}
      >
        <Grid className={classes.listItemIconWidth}>
          <ListItemIcon>
            <Grid className={classnames(classes.listItemTextColor, classes.listItemIcon)}>
              <FontAwesomeIcon {...iconProps}/>
            </Grid>
          </ListItemIcon>
        </Grid>
        <ResponsiveListItemText
          widthBreakpoint={widthBreakpoint}
          primary={label}
          primaryTypographyProps={{
            variant: 'body1',
          }}
          responsive={true}
        />
      </ListItem>
    );
  }
}

export default compose<React.ComponentClass<ICustomMenuItemComponentProps>>(
  withStyles(styles),
)(CustomMenuItem);

