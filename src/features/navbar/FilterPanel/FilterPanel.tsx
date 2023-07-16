import { useCallback, useEffect, useMemo, useState } from 'react';

import { type SelectChangeEvent } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { type Countries, fetchGetCountries } from '~/api/fetchGetCountries';
import { fetchGetGenres, type Genres } from '~/api/fetchGetGenres';
import { ReactComponent as IconCancel } from '~/assets/icons/IconCancel.svg';
import { useOutsideClick } from '~/features/CustomHooks/ClickOutSide';
import { MultipleSelectChip } from '~/features/SelectChip/SelectChip';
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
  getRightRequest,
  isDisabledClearButton
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
  const [genres, setGenres] = useState<Genres[]>([]);
  const [genresAPI, setGenresAPI] = useState<string[]>([]);
  const [countries, setcountries] = useState<Countries[]>([]);
  const [countriesAPI, setCountriesAPI] = useState<string[]>([]);

  const handleChange = (event: { target: HTMLInputElement }) => {
    if (event.target.checked) {
      setGenresAPI([...genresAPI, event.target.value]);
    } else {
      setGenresAPI(genresAPI.filter((item) => item !== event.target.value));
    }
  };

  const handleChangeCountries = (
    event: SelectChangeEvent<typeof countriesAPI>
  ) => {
    const {
      target: { value }
    } = event;
    setCountriesAPI(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    setFormState({ ...formState, 'genres.name': genresAPI.join(' ') });
  }, [genresAPI]);

  useEffect(() => {
    setFormState({ ...formState, 'countries.name': countriesAPI.join(' ') });
  }, [countriesAPI]);

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

  useEffect(() => {
    fetchGetGenres()
      .then((genres) => setGenres(genres))
      .catch((error: Error) => error);
    fetchGetCountries()
      .then((countries) => setcountries(countries))
      .catch((error: Error) => error);
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

  const reference = useOutsideClick(() => {
    isFilterState ? dispatch(switchFilterState()) : null;
  });

  return (
    <div
      className={styleFilterPanel.container}
      data-open={isFilterState}
      ref={reference}
    >
      <div className={styleFilterPanel.innerWrapper}>
        <p>Filters</p>
        <Button
          className={styleFilterPanel.btnCancel}
          icon={<IconCancel />}
          appearance={ButtonStyleAppearance.cancel}
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
        <MultipleSelectChip
          countries={countries}
          countriesAPI={countriesAPI}
          handleChange={handleChangeCountries}
          reference={reference}
        />
        <Input
          label={FilterFields.nameMovie}
          id={FilterFields.nameMovie}
          value={formState.enName}
          placeholder="Your text"
          onChange={({ target: { value } }) =>
            setFormState({ ...formState, enName: value, name: value })
          }
        />
        <div>
          <p>{FilterFields.genres}</p>
          <div className={styleFilterPanel.genresWrapper}>
            <div className={styleFilterPanel.containerCheckBoxes}>
              {genres.map((genres) => (
                <FormGroup key={genres.name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={genres.name}
                        color="secondary"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        checked={genresAPI.includes(genres.name)}
                      />
                    }
                    label={genres.name}
                  />
                </FormGroup>
              ))}
            </div>
          </div>
        </div>

        <div className={styleFilterPanel.containerBtn}>
          <Button
            type="button"
            className={styleFilterPanel.btnClean}
            text={ButtonNames.clearFilter}
            appearance={ButtonStyleAppearance.pagination}
            onClick={() => {
              setFormState(getDefaultFormValues);
              setIsChecked(true);
              setIsCheckedSort(true);
              setGenresAPI([]);
            }}
            disabled={
              isDisabledClearButton(formState) && isChecked && isCheckedSort
            }
          ></Button>
          <NavLink
            to={`/searchResultFilter/${getRightRequest({
              request: formState
            })}`}
            style={
              Object.keys(formErrors).length > 0
                ? {
                    pointerEvents: 'none',
                    color: '#ff5154',
                    cursor: 'not-allowed'
                  }
                : { pointerEvents: 'auto' }
            }
          >
            result
          </NavLink>
        </div>
      </form>
    </div>
  );
};
