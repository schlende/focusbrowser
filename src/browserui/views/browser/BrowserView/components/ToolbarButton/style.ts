import styled, { css } from 'styled-components';
import { centerIcon } from '~/browserui/mixins';

// Toolbar
export const TOOLBAR_HEIGHT = 38;
export const TOOLBAR_BUTTON_WIDTH = 36;

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
    ${centerIcon(size)};
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