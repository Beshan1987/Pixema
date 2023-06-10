import { useState } from 'react';

import { ReactComponent as FilterIcon } from '~/assets/icons/FilterIcon.svg';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';

import { type SearchState } from './Search.types';
import styleSearch from './SearchBar.module.scss';
import { getDefaultFormValues } from './SearchUtils';

export const SearchBar = () => {
  const [formState, setFormState] = useState<SearchState>(
    getDefaultFormValues()
  );
  return (
    <form
      className={styleSearch.container}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
        placeholder="Search"
        value={formState.t}
        onChange={({ target: { value } }) => setFormState({ t: value })}
      />
      <Button
        icon={<FilterIcon />}
        appearance={ButtonStyleAppearance.filter}
      ></Button>
    </form>
  );
};
