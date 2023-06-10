
import { ReactComponent as FilterIcon } from '~/assets/icons/FilterIcon.svg';


import styleSearch from './SearchBar.module.scss';
import { useState } from 'react';
import { SearchState } from './Search.types';
import { getDefaultFormValues } from './SearchUtils';

export const SearchBar = () => {
    const [formState, setFormState] = useState<SearchState>(getDefaultFormValues());
  return (
    
    <form className={styleSearch.container}
    onSubmit={(event)=>{
        event.preventDefault();
    }}
    >
      <input
        placeholder="Search"
        value={formState.t}
        onChange={({ target: { value } }) =>
          setFormState({t: value })
        }
      />
      <button><FilterIcon/></button>
      
    </form>
  );
};
