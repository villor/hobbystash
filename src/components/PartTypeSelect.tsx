import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import type { PartType } from '../data/part-type';
import { PART_TYPES } from '../data/part-type';

const styles = createStyles({
  root: {
    width: 200,
  },
  option: {
    fontSize: 15,
    '& > img': {
      marginRight: 10,
      width: 30,
      height: 30,
    },
  },
});

interface PartTypeSelectProps extends WithStyles<typeof styles> {
  value: PartType | null;
  onChange: (partType: PartType | null) => void;
  autoFocus: boolean;
}

const PartTypeSelect: React.FunctionComponent<PartTypeSelectProps> = ({ value, onChange, classes, autoFocus }) => 
  <Autocomplete
    className={classes.root}
    options={PART_TYPES}
    classes={{
      option: classes.option,
    }}
    autoHighlight
    getOptionLabel={option => option.name}
    renderOption={option =>
      <React.Fragment>
        <img src="/logo192.png" alt=''></img>
        {option.name}
      </React.Fragment>
    }
    renderInput={params =>
      <TextField
        {...params}
        label="Part type"
        variant="outlined"
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password'
        }}
        autoFocus={autoFocus}
      />
    }
    value={value}
    onChange={(_e, value) => onChange(value)}
  />

export default withStyles(styles)(PartTypeSelect);
