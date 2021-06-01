import React, { FunctionComponent, useState, useEffect } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import type { Attribute, AttributeValue, PartType } from 'hobbystash-shared';

function attributeSearch(attributes: Attribute[], query: string): AttributeValue[] {
  // TODO: Improvements
  //  - Fuzzy search
  //  - AValueType.parse() return more than one possible value?
  //  - Scoring somehow
  //     (Resistance most likely for a number on a resistor, capacitance on a capacitor etc)
  //  - OR ability to just pick an attribute, and then get a Chip with an input for the value

  query = query.trim().toLowerCase();

  const parseResults =
    query.length === 0
      ? []
      : attributes.reduce((results, attribute) => {
          const value = attribute.type.parse(query);
          if (value) {
            results.push({ attribute, value });
          }
          return results;
        }, [] as AttributeValue[]);

  const suggestionResults = attributes.flatMap(attribute =>
    attribute.suggestions
      .filter(suggestion =>
        (attribute.name + ' ' + suggestion.format()).toLowerCase().includes(query),
      )
      .map(suggestion => ({ attribute, value: suggestion })),
  );

  return parseResults.concat(suggestionResults);
}

interface AttributeSelectProps {
  partType: PartType | null;
  attributeValues: AttributeValue[];
  onChange?: (value: AttributeValue[]) => void;
  className?: string;
  inputRef?: React.Ref<any>;
}

const AttributeSelect: FunctionComponent<AttributeSelectProps> = ({
  partType,
  attributeValues,
  onChange,
  className,
  inputRef,
}) => {
  const [searchResult, setSearchResult] = useState<AttributeValue[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (partType === null) {
      setSearchResult([]);
    } else {
      setSearchResult(
        attributeSearch(
          partType.attributes.filter(a => attributeValues.findIndex(b => b.attribute === a) === -1),
          searchQuery,
        ),
      );
    }
  }, [partType, searchQuery, attributeValues]);

  return (
    <Autocomplete
      className={className}
      multiple
      value={attributeValues}
      onChange={(_e, value) => onChange && onChange(value)}
      options={[...attributeValues, ...searchResult]}
      filterOptions={_ => searchResult}
      getOptionLabel={pav => pav.attribute.name + ': ' + pav.value.format()}
      autoHighlight
      disabled={partType === null}
      onInputChange={(_e, value) => setSearchQuery(value)}
      renderInput={params => (
        <TextField {...params} variant="outlined" label="Attributes" inputRef={inputRef} />
      )}
    />
  );
};

export default AttributeSelect;
