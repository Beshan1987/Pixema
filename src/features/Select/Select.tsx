import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

import { type Countries } from '~/api/fetchGetCountries';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProperties = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export const MultipleSelectCheckmarks = ({
  countries,
  countriesAPI,
  handleChange
}: {
  countries: Countries[];
  countriesAPI: string[];
  handleChange: (event: SelectChangeEvent<typeof countriesAPI>) => void;
}) => {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={countriesAPI}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProperties}
        >
          {countries.map((name) => (
            <MenuItem
              key={name.name}
              value={name.name}
            >
              <Checkbox checked={countriesAPI.includes(name.name)} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
