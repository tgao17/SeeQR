import React from 'react';
import { ButtonGroup, Button } from '@mui/material';
import Box from '@mui/material/Box';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {useReactFlow} from 'reactflow';
import styled from 'styled-components';
import {
  selectedColor,
  textColor,
  defaultMargin,
} from '../../../style-variables';
import type { ValidTabs } from '../../../types';

const ViewBtnGroup = styled(ButtonGroup)`
  margin: ${defaultMargin} 0;
`;

interface ViewButtonProps {
  $isSelected: boolean;
}

const ViewButton = styled(Button)`
  background: ${({ $isSelected }: ViewButtonProps) =>
    $isSelected ? selectedColor : textColor};
  &:hover {
    background: ${({ $isSelected }: ViewButtonProps) =>
      $isSelected ? selectedColor : textColor};
  }
`;

interface TabSelectorProps {
  selectedTab: ValidTabs;
  select: (tab: ValidTabs) => void;
}

const TabSelector = ({ selectedTab, select }: TabSelectorProps) => {
  const { fitView } = useReactFlow();

  const handleSelect = (tabName: ValidTabs) => () => {
    // fit view whenever execution plan view is selected
    if (tabName === 'Execution Plan') fitView({ padding: 0.2 });
    select(tabName);
  };
  return (
    <Box>
      <ViewBtnGroup variant="contained">
        <ViewButton
          $isSelected={selectedTab === 'Results'}
          onClick={handleSelect('Results')}
          startIcon={<FormatListBulletedIcon />}
        >
          Results
        </ViewButton>
        <ViewButton
          $isSelected={selectedTab === 'Execution Plan'}
          onClick={handleSelect('Execution Plan')}
          startIcon={<AccountTreeIcon />}
        >
          Execution Plan
        </ViewButton>
      </ViewBtnGroup>
    </Box>
  );
};

export default TabSelector;
