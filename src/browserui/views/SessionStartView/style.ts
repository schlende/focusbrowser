import styled, { css } from 'styled-components';

export const SessionStartViewContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightblue
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${({ visible }: {visible: boolean}) => visible ? 'visible' : 'none'}
`;