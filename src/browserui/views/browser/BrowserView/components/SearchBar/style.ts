import styled, { css } from 'styled-components';

import { icons, transparency } from '~/browserui/resources/constants';
import { ITheme } from '~/browserui/interfaces';
import { centerIcon } from '~/browserui/mixins';
import { platform } from 'os';

export const StyledSearchBar = styled('div')`
  position: relative;
  z-index: 100;
  display: flex;
  flex-flow: row;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  border-bottom: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  
`;

export const StyledSearchBox = styled('div')`
  margin-top: 5px;
  z-index: 2;
  border-radius: 23px;
  margin-bottom: 5px;
  display: flex;
  overflow: hidden;
  flex-flow: column;
  flex: 1;
  min-height: 28px;
  transition: 0.2s height;
  position: relative;
  background-color: #eeeeee;
`;

export const SearchIcon = styled('div')`
  ${centerIcon()};
  background-image: url(${icons.search});
  height: 16px;
  min-width: 16px;
  margin-left: 10px;
  ${({ theme }: { theme?: ITheme }) => css`
    filter: ${theme['overlay.foreground'] === 'light'
      ? 'invert(100%)'
      : 'none'};
  `}
`;

export const Form = styled('form')`
  width: 100%;
  flex: 1
`

export const Input = styled('input')`
  height: 100%;
  flex: 1;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 16px;
  ${({ theme }: { theme?: ITheme }) => css`
    color: ${theme['overlay.foreground'] === 'light'
      ? 'white'
      : `rgba(0, 0, 0, ${transparency.text.high})`};
    &::placeholder {
      color: rgba(255, 255, 255, 0.54);
      color: ${theme['overlay.foreground'] === 'light'
        ? `rgba(255, 255, 255, ${transparency.text.medium})`
        : `rgba(0, 0, 0, ${transparency.text.medium})`};
    }
  `}
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 28px;
  height: 28px;
`;

export const UpdateButtonToolTip = styled('div')`
  position: relative;
`;

export const UpdateButtonToolTipText = styled('span')`
  width: 120px;
  right: 105%;
  background - color: #555;
  color: #fff;
  text - align: center;
  border - radius: 6px;
  padding: 5px 0;
  position: absolute;
  z - index: 1;
  bottom: 125 %;
  left: 50 %;
  margin - left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
`;
