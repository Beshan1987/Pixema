import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as IconCancel } from '~/assets/icons/IconCancel.svg';
import { switchFilterState } from '~/features/states/filterSlice/filterSlice';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { Input } from '~/shared/inputForm/Input';
import { type RootState } from '~/store/store';

import {
  ButtonNames,
  FilterFields,
  SortByYearRate,
  SortUpDown
} from './constants';
import { type SearchState } from './Filter.types';
import {
  getDefaultFormValues,
  getFormErrors,
  getRightRequest
} from './filter.utils';
import styleFilterPanel from './FilterPanel.module.scss';

export const FilterPanel = () => {
  const isFilterState = useSelector(
    (state: RootState) => state.filterSwitch.isOpen
  );
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<SearchState>(getDefaultFormValues);
  const [isChecked, setIsChecked] = useState(true);
  const [isCheckedSort, setIsCheckedSort] = useState(true);

  const [touchedFields, setTouchedFields] = useState<Set<string>>(
    () => new Set()
  );

  const updateFormValues = useCallback((newFormValue: Partial<SearchState>) => {
    setFormState((previousFields) => ({ ...previousFields, ...newFormValue }));
    setTouchedFields(
      (previousFields) =>
        new Set([...previousFields.values(), ...Object.keys(newFormValue)])
    );
  }, []);

  const formErrors = useMemo(() => getFormErrors(formState), [formState]);

  const chengeCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const chengeCheckBoxSort = () => {
    setIsCheckedSort(!isCheckedSort);
  };

  useEffect(() => {
    if (isChecked) {
      setFormState({ ...formState, sortField: `${SortByYearRate.sortYear}` });
    } else
      setFormState({ ...formState, sortField: `${SortByYearRate.sortRate}` });
  }, [isChecked]);

  useEffect(() => {
    if (isCheckedSort) {
      setFormState({ ...formState, sortType: `${SortUpDown.sortUp}` });
    } else setFormState({ ...formState, sortType: `${SortUpDown.sortDown}` });
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
        <div className={styleFilterPanel.containerSortByYear}>
          <Input
            label={FilterFields.years}
            id={FilterFields.years}
            type="number"
            inputMode="numeric"
            value={formState.yearFrom}
            placeholder="from"
            error={
              touchedFields.has('yearFrom') ? formErrors['yearFrom'] : undefined
            }
            onChange={({ target: { value } }) =>
              updateFormValues({ yearFrom: value })
            }
          />
          <Input
            id={FilterFields.years}
            type="number"
            inputMode="numeric"
            value={formState.yearTo}
            placeholder="to"
            error={
              touchedFields.has('yearTo') ? formErrors['yearTo'] : undefined
            }
            onChange={({ target: { value } }) =>
              updateFormValues({ yearTo: value })
            }
          />
        </div>
        <div className={styleFilterPanel.containerSortByYear}>
          <Input
            label={FilterFields.rating}
            id={FilterFields.rating}
            type="number"
            inputMode="numeric"
            value={formState.rateFrom}
            placeholder="from"
            error={
              touchedFields.has('rateFrom') ? formErrors['rateFrom'] : undefined
            }
            onChange={({ target: { value } }) =>
              updateFormValues({ rateFrom: value })
            }
          />
          <Input
            id={FilterFields.rating}
            type="number"
            inputMode="numeric"
            value={formState.rateTo}
            placeholder="to"
            error={
              touchedFields.has('rateTo') ? formErrors['rateTo'] : undefined
            }
            onChange={({ target: { value } }) =>
              updateFormValues({ rateTo: value })
            }
          />
        </div>
        <Input
          label={FilterFields.nameMovie}
          id={FilterFields.nameMovie}
          value={formState.enName}
          placeholder="Your text"
          onChange={({ target: { value } }) =>
            setFormState({ ...formState, enName: value })
          }
        />
        <div className={styleFilterPanel.containerBtn}>
          <Button
            type="button"
            className={styleFilterPanel.btnClean}
            text={ButtonNames.clearFilter}
            appearance={ButtonStyleAppearance.pagination}
            onClick={() => setFormState(getDefaultFormValues)}
            disabled={
              !formState.yearFrom && !formState.enName && !formState.yearTo
            }
          ></Button>
          <Link
            to={`/searchResultFilter/${getRightRequest({
              request: formState
            })}`}
          >
            <Button
              type="submit"
              text={ButtonNames.showResult}
              appearance={ButtonStyleAppearance.pagination}
              disabled={
                formState.enName.length < 3 ||
                Object.keys(formErrors).length > 0
              }
            ></Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
