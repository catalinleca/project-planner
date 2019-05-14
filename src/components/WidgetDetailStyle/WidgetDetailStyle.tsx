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

const styles = (theme: Theme): StyleRules => ({
  widgetStyle: {
    display: 'block',
    overflow: 'auto',
    height: '100%',
  },
  flexVertical: {
    height: '100%',
    minHeight: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
  },
  flexHorizontal: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-end',
  },
  widgetContentContainer: {
    overflow: 'auto',
    overflowX: 'hidden',
    width: '100%',
    height: '100%',
    flex: '1 1 0',
    display: 'flex',
  },
  widgetContentStyle: {
    flex: '1 1 auto',
    width: '100%',
  }
});

interface IWidgetDetailStyleComponentProps {
  header: JSX.Element;
}

//from state
interface IWidgetDetailStyleProps extends IWidgetDetailStyleComponentProps {
}

type WidgetDetailStyleType = IWidgetDetailStyleProps & WithStyles<keyof ReturnType<typeof styles>>;

const WidgetDetailStyle: React.FC<WidgetDetailStyleType> = (props) => {
  const {
    children,
    header,
    classes
  } = props;
  return (
    <Grid className={classes.widgetStyle}>
      <Grid className={classes.flexVertical}>
        <Grid className={classes.flexHorizontal}>
          {header}
        </Grid>
        <Grid className={classes.widgetContentContainer}>
          <Grid className={classes.widgetContentStyle}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default compose<React.ComponentClass<IWidgetDetailStyleComponentProps>>(
  withStyles(styles),
)(WidgetDetailStyle);