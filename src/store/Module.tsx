/*
 * AccountModule
 * Put this component somewhere in your tree to include project appReducer / sagas
 *
 */

import * as React from 'react';
import {
  connect,
} from 'react-redux';
import {
  selectReducerState,
} from './selectors';
import {
  createStructuredSelector
} from 'reselect';
import {
  compose
} from 'redux';
import appReducer, { ISpecification } from './appReducer';
import saga from './sagas';

import {
  IAction,
  IMap,
} from '../interfaces';
// import {
//   safeStringify,
// } from 'ats-utils/src';

interface IAccountModuleComponentProps {

}

interface IAccountModuleProps extends IAccountModuleComponentProps {
  reducerState: IMap<ISpecification>;
  dispatch: React.Dispatch<IAction>;
}

type AccountModuleProps = IAccountModuleProps;

class Module extends React.Component<AccountModuleProps> {

  public render() {
    const {
      // reducerState,
    } = this.props;
    return (
      <div style={{display: 'none'}}>
        I REALLY HOPE YOU DO NO SEE THIS
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch: React.Dispatch<IAction>) {
  return {
    dispatch,
  };
}

const mapStateToProps = (originalState: any, originalOwnProps: IAccountModuleComponentProps) => {
  return createStructuredSelector({
    reducerState: selectReducerState(),
  })(originalState);
};

export default compose<React.ComponentClass<IAccountModuleComponentProps>>(
  connect(mapStateToProps, mapDispatchToProps),
)(Module);
