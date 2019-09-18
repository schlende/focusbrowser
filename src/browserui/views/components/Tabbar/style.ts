import styled from 'styled-components';

import { ToolbarButton } from '../ToolbarButton';

export const StyledTabbar = styled('div')`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: 0.3s opacity, 0.3s transform;
  margin-left: 8px;
  margin-right: 32px;
  display: flex;
`;

export const TabsContainer = styled('div')`
  height: 100%;
  width: calc(100% - 100px);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const AddTab = styled(ToolbarButton)`
  position: absolute;
  left: 0;
  top: 0;
`;