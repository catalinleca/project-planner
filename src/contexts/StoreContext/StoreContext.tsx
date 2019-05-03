import * as React from 'react';
import {ComponentType} from "react";

const StoreContext = React.createContext(undefined);

export const withStore = () => (Component: ComponentType) => function ThemedComponent(props: any) { // TBC should be store props
  return (
    <StoreContext.Consumer>
      {(store) => <Component {...props} store={store} />}
    </StoreContext.Consumer>
  );
};

export default StoreContext;
