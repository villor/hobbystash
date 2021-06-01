import React, { useState, useRef } from 'react';
import { createStyles, Paper, WithStyles, withStyles, TextField, Button } from '@material-ui/core';

import type { AttributeValue, PartType } from 'hobbystash-shared';
import PartTypeSelect from './PartTypeSelect';
import AttributeSelect from './AttributeSelect';

const styles = createStyles({
  root: {
    padding: '15px',
    display: 'flex',
  },
  attributes: {
    flex: 1,
  },
  count: {
    width: 100,
  },
});

interface QuickPartProps extends WithStyles<typeof styles> {
  partTypes: PartType[];
}

const QuickPart: React.FunctionComponent<QuickPartProps> = ({ partTypes, classes }) => {
  const [partType, setPartType] = useState<PartType | null>(null);
  const [attributeValues, setAttributeValues] = useState<AttributeValue[]>([]);
  const [count, setCount] = useState<number>(0);

  const attrInput = useRef<HTMLInputElement>();
  const countInput = useRef<HTMLInputElement>();

  const onPartTypeChange = (newPartType: PartType | null) => {
    const oldPartType = partType;
    setPartType(newPartType);

    if (newPartType === null) {
      setAttributeValues([]);
      return;
    } else if (oldPartType !== null) {
      setAttributeValues(
        attributeValues.filter(av => newPartType.attributes.includes(av.attribute)),
      );
    }

    setTimeout(() => {
      attrInput.current && attrInput.current.focus();
    }, 0);
  };

  return (
    <form>
      <Paper className={classes.root}>
        <PartTypeSelect
          partTypes={partTypes}
          value={partType}
          onChange={onPartTypeChange}
          autoFocus={true}
        />
        <AttributeSelect
          partType={partType}
          attributeValues={attributeValues}
          onChange={setAttributeValues}
          className={classes.attributes}
          inputRef={attrInput}
        />
        <TextField
          label="Count"
          variant="outlined"
          value={count}
          type="number"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setCount(e.target.valueAsNumber)}
          className={classes.count}
          inputRef={countInput}
          disabled={partType === null}
        />
        <Button variant="contained" color="primary" disableElevation disabled={partType === null}>
          OK
        </Button>
      </Paper>
    </form>
  );
};

export default withStyles(styles)(QuickPart);
