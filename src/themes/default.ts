import base from './base';
import {
  mergeDeep,
} from 'immutable';

const theme = mergeDeep({}, base, {
  palette: {
  },
});

export default theme;
