import styled, { css } from 'styled-components';

export const SessionStartViewContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightblue
  justify-content: center;
  align-items: center;
  display: ${({ visible }: {visible: boolean}) => visible ? 'flex' : 'none'}
  flex-flow: row;
`;

export const StyledWorkOnContainer = styled('div')`
  display: flex;
  flex: 1;
  background-color: white;
  height: 60px;
  z-index: 2;
  border-radius: 30px;
  display: flex;
  overflow: hidden;
  padding-left: 30px;
  padding-right: 30px;
  transition: 0.2s height;
  position: relative;
  background-color: #eeeeee;
  margin-top: 30px;
  margin-bottom: 30px;
`

export const StyledWorkOnInput = styled('input')`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 2em;
`

export const GoButton = styled('button')`
  display: inline-block;
  border-radius: 30px;
  text-align: center;
  vertical-align: middle;
  line-height: 60px;
  height: 60px;
  font-size: 2em;
  user-select: none;
  outline: none;
  cursor: pointer;
  width: 60%;
  background: transparent;
  color: black;
  background-color: white;
  :disabled {
    opacity: 0.4;
  }
  :hover:not([disabled]){
    box-shadow: 0 0 10px white;
  }
`