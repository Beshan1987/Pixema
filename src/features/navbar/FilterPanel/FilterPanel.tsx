import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as IconCancel } from '~/assets/icons/IconCancel.svg';
import { switchFilterState } from '~/features/states/filterSlice/filterSlice';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Input } from '~/shared/inputForm/Input';
import { type RootState } from '~/store/store';

import { ButtonNames, FilterFields } from './constants';
import { type SearchState } from './Filter.types';
import { getDefaultFormValues, getRightRequest } from './filter.utils';
import styleFilterPanel from './FilterPanel.module.scss';

export const FilterPanel = () => {
  const isFilterState = useSelector(
    (state: RootState) => state.filterSwitch.isOpen
  );
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<SearchState>(getDefaultFormValues);
  const [isChecked, setIsChecked] = useState(true);
  const [isCheckedSort, setIsCheckedSort] = useState(true);

  const chengeCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const chengeCheckBoxSort = () => {
    setIsCheckedSort(!isCheckedSort);
  };

  useEffect(() => {
    if (isChecked) {
      setFormState({ ...formState, sortField: 'year' });
    } else setFormState({ ...formState, sortField: 'rating.imdb' });
  }, [isChecked]);

  useEffect(() => {
    if (isCheckedSort) {
      setFormState({ ...formState, sortType: -1 });
    } else setFormState({ ...formState, sortType: 1 });
  }, [isCheckedSort]);

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
      <div className={styleFilterPanel.BtnGroupSwitch}>
        <Button
          data-open={isChecked}
          text={FilterFields.sortYear}
          appearance={ButtonStyleAppearance.system}
          onClick={chengeCheckBox}
        ></Button>
        <Button
          data-open={!isChecked}
          text={FilterFields.sortRating}
          appearance={ButtonStyleAppearance.system}
          onClick={chengeCheckBox}
        ></Button>
      </div>
      <div className={styleFilterPanel.BtnGroupSwitch}>
        <Button
          data-open={isCheckedSort}
          text={FilterFields.sortDown}
          appearance={ButtonStyleAppearance.system}
          onClick={chengeCheckBoxSort}
        ></Button>
        <Button
          data-open={!isCheckedSort}
          text={FilterFields.sortUp}
          appearance={ButtonStyleAppearance.system}
          onClick={chengeCheckBoxSort}
        ></Button>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setFormState(getDefaultFormValues);
        }}
      >
        <Input
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
          label={FilterFields['Full or short movie name']}
          id={FilterFields['Full or short movie name']}
          value={formState.enName}
          onChange={({ target: { value } }) =>
            setFormState({ ...formState, enName: value })
          }
        />
        <div className={styleFilterPanel.containerBtn}>
          <Button
            type="button"
            className={styleFilterPanel.btnClean}
            text={ButtonNames['Clear filter']}
            appearance={ButtonStyleAppearance.pagination}
            onClick={() => setFormState(getDefaultFormValues)}
            disabled={!formState.enName && !formState.year}
          ></Button>
          <Link
            to={`/searchResultFilter/${getRightRequest({
              request: formState
            })}`}
          >
            <Button
              type="submit"
              text={ButtonNames['Show results']}
              appearance={ButtonStyleAppearance.pagination}
              disabled={formState.enName.length < 3}
            ></Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
