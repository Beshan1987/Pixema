import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as IconCancel } from '~/assets/icons/IconCancel.svg';
import { switchFilterState } from '~/features/states/filterSlice/filterSlice';
import { Button } from '~/shared/Button/Button';
import { ButtonStyleAppearance } from '~/shared/Button/Button.types';
import { type RootState } from '~/store/store';

import styleFilterPanel from './FilterPanel.module.scss';

export const FilterPanel = () => {
  const isFilterState = useSelector(
    (state: RootState) => state.filterSwitch.isOpen
  );
  const dispatch = useDispatch();
  return (
    <div
      className={styleFilterPanel.container}
      data-open={isFilterState}
    >
      <div className={styleFilterPanel.btnCancel}>
        <Button
          icon={<IconCancel />}
          appearance={ButtonStyleAppearance.chevron}
          onClick={() => dispatch(switchFilterState())}
        />
      </div>
    </div>
  );
};
