import { type RefObject } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { type Theme, useTheme } from '@mui/material/styles';

import { type Countries } from '~/api/fetchGetCountries';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProperties = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 200
    }
  }
};

function getStyles(
  country: string,
  countriesAPI: readonly string[],
  theme: Theme
) {
  return {
    fontWeight: countriesAPI.includes(country)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular
  };
}

export const MultipleSelectChip = ({
  countries,
  countriesAPI,
  handleChange,
  reference
}: {
  countries: Countries[];
  countriesAPI: string[];
  handleChange: (event: SelectChangeEvent<typeof countriesAPI>) => void;
  reference: RefObject<HTMLDivElement>;
}) => {
  const theme = useTheme();

  return (
    <div
      ref={reference}
      id="wwwww"
    >
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Select Country</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={countriesAPI}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="SelectCountry"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProperties}
        >
          {countries.map((countries) => (
            <MenuItem
              key={countries.name}
              value={countries.name}
              style={getStyles(countries.name, countriesAPI, theme)}
            >
              {countries.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
