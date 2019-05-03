import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from '../../themes/default'

const ptTheme = createMuiTheme(theme);

class ThemeProvider extends React.PureComponent<any> {
  public render() {
    const {
      children
    } = this.props;

    return(
      <MuiThemeProvider theme={ptTheme}>
        {React.Children.only(children)}
      </MuiThemeProvider>
    )
  }
}

export default ThemeProvider;