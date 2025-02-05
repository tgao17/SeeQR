import React, { useState } from 'react';
import { useReactFlow } from 'reactflow';
import { ButtonGroup, Button, Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styled from 'styled-components';
import type { Thresholds } from '../../../../types';
import ThresholdsDialog from './ThresholdsDialog';

const SquareBtn = styled(Button)`
  padding: 5px;
`;

const Toolbar = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 5px;
  left: 5px;
`;

interface FlowControlsProps {
  toggleFullscreen: () => void;
  fullscreen: boolean;
  thresholds: Thresholds;
  setThresholds: (newThresholds: Thresholds) => void;
}

const FlowControls = ({
  toggleFullscreen,
  fullscreen,
  thresholds,
  setThresholds,
}: FlowControlsProps) => {
  const [showThresholdsDialog, setShowThresholdsDialog] = useState(false);
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const tooltipDelay = 1000;

  return (
    <>
      <Toolbar>
        <ButtonGroup orientation="vertical" variant="contained" size="small">
          <Tooltip title="Fit tree to view" enterDelay={tooltipDelay}>
            <SquareBtn onClick={() => fitView({ padding: 0.2 })}>
              <FilterCenterFocusIcon />
            </SquareBtn>
          </Tooltip>
          <Tooltip title="Fullscreen" enterDelay={tooltipDelay}>
            <SquareBtn onClick={toggleFullscreen}>
              {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </SquareBtn>
          </Tooltip>
          <Tooltip title="Zoom Out" enterDelay={tooltipDelay}>
            <SquareBtn onClick={() => zoomOut()}>
              <ZoomOutIcon />
            </SquareBtn>
          </Tooltip>
          <Tooltip title="Zoom In" enterDelay={tooltipDelay}>
            <SquareBtn onClick={() => zoomIn()}>
              <ZoomInIcon />
            </SquareBtn>
          </Tooltip>
          <Tooltip title="Set Warning Thresholds" enterDelay={tooltipDelay}>
            <SquareBtn onClick={() => setShowThresholdsDialog(true)}>
              <ErrorOutlineIcon />
            </SquareBtn>
          </Tooltip>
        </ButtonGroup>
      </Toolbar>
      <ThresholdsDialog
        open={showThresholdsDialog}
        handleClose={() => setShowThresholdsDialog(false)}
        thresholds={thresholds}
        setThresholds={setThresholds}
      />
    </>
  );
};

export default FlowControls;
