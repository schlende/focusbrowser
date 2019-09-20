
import styled, { css } from 'styled-components';

export const BrowserContainer = styled('div')`
  display: ${({ visible }: {visible: boolean}) => visible ? 'visible' : 'none'}
`;


