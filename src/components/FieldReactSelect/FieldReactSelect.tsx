import * as React from 'react';
import {
  FormHelperText,
  InputLabel,
  Theme,
  withStyles,
  WithStyles,
  FormControl
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import ReactSelect from 'react-select';

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IFieldReactSelectComponentProps {
}

//from state
interface IFieldReactSelectProps extends IFieldReactSelectComponentProps {
}

type FieldReactSelectType = IFieldReactSelectProps & WithStyles<keyof ReturnType<typeof styles>>;

const FieldReactSelect: React.FC<any> = (props) => {
  const {meta: {touched, error}} = props;

  console.log(props);

  return (
      <ReactSelect
        {...props}
        value={props.input.value}
        onChange={(value) => props.input.onChange(value)}
        onBlur={() => props.input.onBlur(props.input.value)}
        options={props.options}
        placeholder={props.placeholder}
      />
  );
}

export default compose<React.ComponentClass<IFieldReactSelectComponentProps>>(
  withStyles(styles),
)(FieldReactSelect);