import styled from 'styled-components';
import { icons, transparency } from '~/browserui/resources/constants';
import { centerIcon } from '~/browserui/mixins';

export const EmptyTabContainer = styled('div')`
    background-color: red;
`;

export const Container = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const SearchBar = styled('div')`
    border: 1px solid rgba(33,33,33,.2);
    border-radius: 30px;
    margin: auto;
    float: center;
    padding: 15px;
    margin-top: 300px;
    height: 20px;
    width: 650px;
    :hover{
        box-shadow: 0 0 5px rgba(33,33,33,.2); 
    }
`;

export const SearchIcon = styled('div')`
    ${centerIcon()};
    background-image: url(${icons.search});
    height: 24px;
    min-width: 22px;
    margin: auto;
    float: left;
    margin-left: 10px;
    margin-right: 10px;
    line-height: 20px;
`;

export const Input = styled('input')`
    background: white;
    border: none;
    width: 90%;
    outline: none;
    line-height: 20px;
`;

export const ButtonArea = styled('div')`
    box-sizing: border-box;
    border: 1px solid white;
    background-color: green;
    border-radius: 10px;
    width: 450px;
    margin: auto;
    margin-top: 100px;
    display: flex;
    flex-direction: row;
`;

export const Button1 = styled('div')`
    border: 1px solid rgba(33,33,33,.2);
    border-radius: 1px;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    margin: auto;
    margin-top: 10px;
    :hover{
        box-shadow: 0 0 5px rgba(33,33,33,.2); 
    };
`;

export const TextLabel1 = styled('div')`
    background-color: yellow;
    font-size: 10px;
`;
