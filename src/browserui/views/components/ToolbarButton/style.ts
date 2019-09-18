import styled, { css } from 'styled-components';

// Toolbar
export const TOOLBAR_HEIGHT = 38;
export const TOOLBAR_BUTTON_WIDTH = 36;

// Widths
export const WINDOWS_BUTTON_WIDTH = 45;
export const MENU_WIDTH = 300;
export const MENU_SPACE = 96;
export const MENU_CONTENT_MAX_WIDTH = 640;

// Workspaces
export const WORKSPACE_FOLDER_SIZE = 96;
export const WORKSPACE_ICON_SIZE = 16;
export const WORKSPACE_MAX_ICONS_COUNT = 9;

// Address bar
export const ADDRESS_BAR_HEIGHT = 30;


export const Icon = styled('div')`
  width: 100%;
  height: 100%;
  will-change: background-image;
  transition: 0.15s background-image;
  backface-visibility: hidden;
  ${({
    size,
    disabled,
    opacity,
    autoInvert,
  }: {
    size: number;
    disabled: boolean;
    opacity: number;
    autoInvert?: boolean;
  }) => css`
    opacity: ${disabled ? 0.25 : opacity};
  `};
`;

export const Button = styled('div')`
  height: ${TOOLBAR_HEIGHT}px;
  position: relative;
  transition: 0.2s background-color;
  width: ${TOOLBAR_BUTTON_WIDTH}px;
  backface-visibility: hidden;
  ${({ disabled }: { disabled: boolean }) => css`
    pointer-events: ${disabled ? 'none' : 'inherit'};
    -webkit-app-region: ${disabled ? 'drag' : 'no-drag'};
  `};
`;

export const Circle = styled('div')`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  transition: 0.2s background-color;
`;