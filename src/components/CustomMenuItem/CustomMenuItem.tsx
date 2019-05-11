import * as React from 'react';
import {
  Theme,
  ListItemIcon,
  withStyles,
  WithStyles, Typography, Grid,
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

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface ICustomMenuItemComponentProps {
  to: string;
  iconProps: FontAwesomeIconProps;
  label: string;
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
      label
    } = this.props;

    let linkProps = { };

    linkProps = {
      component: Link,
      to,
    };

    return (
      <ListItem
        button={true}
        {...linkProps}
      >
        <ListItemIcon>
          <FontAwesomeIcon {...iconProps}/>
        </ListItemIcon>
        <Typography>
          {label}
        </Typography>
      </ListItem>
    );
  }
}

export default compose<React.ComponentClass<ICustomMenuItemComponentProps>>(
  withStyles(styles),
)(CustomMenuItem);

