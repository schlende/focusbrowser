
import styled, { css } from 'styled-components';

export const BrowserContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ visible }: {visible: boolean}) => visible ? 'visible' : 'none'}
`;


