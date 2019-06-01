import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Sagas } from 'react-redux-saga';
import { Provider } from 'react-redux';
import { createGenerateClassName, JssProvider, jss } from 'react-jss';
import jssCompose from 'jss-compose';
import jssExtend from 'jss-extend';
import {BrowserRouter, Link} from 'react-router-dom';
import {
  withSize,
} from 'react-sizeme';
import ThemeProvider from '../ThemeProvider/ThemeProvider';
import StoreContext from '../../contexts/StoreContext/StoreContext'

const generateClassName = createGenerateClassName();
jss.use(jssCompose(), jssExtend());

interface IAppWrapperProps {
  children?: any;
  ptStore?: object;
  history?: object;
  size: {
    width: number;
    height: number;
  };
  sagaMiddleware?: any;
}

type AppWrapperProps = IAppWrapperProps;

class AppWrapper extends React.Component<AppWrapperProps> {
  public render() {
    const {
      children,
      ptStore: store,
      sagaMiddleware: middleware,
      history,
      size,
    } = this.props;

    const wrappers = [
      { // **NOTE** ConnectedRouter MUST come first or else the other wrappers won't rerender on route changes properly
        component: ConnectedRouter,
        props: {
          history,
          // context: ReactReduxContext,
        },
      },
      {
        component: BrowserRouter,
      },
      {
        component: ThemeProvider,
      },
      {
        component: Provider,
        props: {
          store,
          // context: ReactReduxContext,
        },
      },
      {
        component: StoreContext.Provider,
        props: {
          value: store,
        },
      },
      {
        component: Sagas,
        props: {
          middleware,
        },
      },
      {
        component: JssProvider,
        props: {
          generateClassName,
          jss,
        },
      },
      // {
      //   component: AtsApiContext.Provider,
      //   props: {
      //     value: atsApi,
      //   },
      // },
      // {
      //   component: Root,
      //   props: {
      //     store,
      //   },
      // },
      // {
      //   component: LanguageProvider,
      //   props: {
      //     i18n,
      //   },
      // },
      // {
      //   component: WindowSizeContext.Provider,
      //   props: {
      //     value: size,
      //   },
      // },
    ];

    return wrappers.reduce((component, wrapper) => {
      if (wrapper.props) {
        if (Object.values(wrapper.props).filter( propValue => propValue == null).length !== 0) {
          return component;
        }
      }
      return (<wrapper.component {...(wrapper.props) || {}}>
        {component}
      </wrapper.component>);
    }, children);
  }
}

export default withSize({
  refreshRate: 60,
  monitorHeight: true,
})(AppWrapper);