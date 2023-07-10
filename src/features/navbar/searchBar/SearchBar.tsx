import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as FilterIcon } from '~/assets/icons/Filter.svg';
import { ReactComponent as IconFilterOpened } from '~/assets/icons/IconFilterOpened.svg';
import { switchFilterState } from '~/features/states/filterSlice/filterSlice';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { type RootState } from '~/store/store';

import { type SearchState } from './Search.types';
import styleSearch from './SearchBar.module.scss';
import { getDefaultFormValues } from './SearchUtils';
import { FilterPanel } from '../FilterPanel/FilterPanel';

export const SearchBar = () => {
  const [formState, setFormState] = useState<SearchState>(
    getDefaultFormValues()
  );

  const navigate = useNavigate();

  const isFilterState = useSelector(
    (state: RootState) => state.filterSwitch.isOpen
  );

  const dispatch = useDispatch();

  return (
    <>
      <div className={styleSearch.wrapper}>
        <form
          className={styleSearch.container}
          onSubmit={(event) => {
            event.preventDefault();
            navigate(`/searchResult/${formState.request}`);
            setFormState(getDefaultFormValues);
          }}
        >
          <input
            placeholder="Search"
            value={formState.request}
            onChange={({ target: { value } }) =>
              setFormState({ request: value })
            }
          />
        </form>
        <Button
          icon={isFilterState ? <IconFilterOpened /> : <FilterIcon />}
          appearance={ButtonStyleAppearance.filter}
          onClick={() => dispatch(switchFilterState())}
        ></Button>
        <FilterPanel />
      </div>
    </>
  );
};
