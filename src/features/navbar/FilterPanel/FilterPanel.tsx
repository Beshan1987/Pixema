import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchSearchFilter } from '~/api/fetchSearchFilter';
import { ReactComponent as IconCancel } from '~/assets/icons/IconCancel.svg';
import { switchFilterState } from '~/features/states/filterSlice/filterSlice';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Input } from '~/shared/inputForm/Input';
import { type RootState } from '~/store/store';

import { ButtonNames, FilterFields, ValidYearsRealese } from './constants';
import { type SearchState } from './Filter.types';
import { getDefaultFormValues } from './filter.utils';
import styleFilterPanel from './FilterPanel.module.scss';

export const FilterPanel = () => {
  const isFilterState = useSelector(
    (state: RootState) => state.filterSwitch.isOpen
  );
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<SearchState>(getDefaultFormValues);

  return (
    <div
      className={styleFilterPanel.container}
      data-open={isFilterState}
    >
      <div className={styleFilterPanel.innerWrapper}>
        <p>Filters</p>
        <Button
          className={styleFilterPanel.btnCancel}
          icon={<IconCancel />}
          appearance={ButtonStyleAppearance.chevron}
          onClick={() => dispatch(switchFilterState())}
        />
      </div>
      <div>{`found:`}</div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchSearchFilter({
            title: formState.title,
            year: formState.year,
            page: 1
          })
            .then((data) => data)
            .catch((error: Error) => error);
          setFormState(getDefaultFormValues);
        }}
      >
        <Input
          max={ValidYearsRealese.ValidYear.maxYear}
          min={ValidYearsRealese.ValidYear.minYear}
          label={FilterFields.Year}
          id={FilterFields.Year}
          type="number"
          inputMode="numeric"
          value={formState.year}
          onChange={({ target: { value } }) =>
            setFormState({ ...formState, year: value })
          }
        />
        <Input
          minLength={3}
          label={FilterFields['Full or short movie name']}
          id={FilterFields['Full or short movie name']}
          value={formState.title}
          onChange={({ target: { value } }) =>
            setFormState({ ...formState, title: value })
          }
        />
        <div className={styleFilterPanel.containerBtn}>
          <Button
            type="submit"
            text={ButtonNames['Show results']}
            appearance={ButtonStyleAppearance.pagination}
            disabled={formState.title.length < 3}
          ></Button>
          <Button
            type="button"
            className={styleFilterPanel.btnClean}
            text={ButtonNames['Clear filter']}
            appearance={ButtonStyleAppearance.pagination}
            onClick={() => setFormState(getDefaultFormValues)}
            disabled={!formState.title && !formState.year}
          ></Button>
        </div>
      </form>
    </div>
  );
};
