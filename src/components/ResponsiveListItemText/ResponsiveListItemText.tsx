import {isWidthDown} from "@material-ui/core/withWidth";
import {ANIMATION_SPEED} from "../CustomMenuItem/CustomMenuItem";
import {ListItemText} from "@material-ui/core";
import * as React from "react";
import styledj from 'styled-jss';

const ListItemTextInterceptor = (props) => {
  const {
    // pull inputRef out of props that <Input> passes in
    responsive, // eslint-disable-line no-unused-vars, react/prop-types
    widthBreakpoint,
    ...rest
  } = props;

  return <ListItemText {...rest} />;
};

export const ResponsiveListItemText = styledj(ListItemTextInterceptor)(({theme, widthBreakpoint, responsive}) => {
  return {
    transition: `all ${ANIMATION_SPEED}s`,
    marginLeft: theme.spacing.unit,
    opacity: 1,
    height: 'auto',
    flex: 'auto',
    width: '100%',
    ...responsive
      ? {
        ...isWidthDown('sm', widthBreakpoint)
          ? {
            opacity: 0,
            width: 0,
            height: 0,
            margin: 0,
            padding: 0,
            flex: '0 1 0',
          }
          : {
            padding: `0 ${theme.spacing.unit * 2}px`,
          }
      }
      : {
        opacity: 1,
      }
  };
});
