import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Input } from './style';
import { SearchBar, SearchIcon } from './style';
import { ButtonArea, Button1, TextLabel1 } from './style';


export const EmptyTab = observer(() => {

  return (
    <div>
      <Container>
        <SearchBar>
          <Input type="text" placeholder="Please tell me how to..." />
          <SearchIcon />
        </SearchBar>
        <ButtonArea>
          <div>
            <Button1 />
            <TextLabel1>Description1</TextLabel1>
          </div>
          <div>
            <Button1 />
            <TextLabel1>Description2</TextLabel1>
          </div>
          <div>
            <Button1 />
            <TextLabel1>Description3</TextLabel1>
          </div>
          <div>
            <Button1 />
            <TextLabel1>Description4</TextLabel1>
          </div>
        </ButtonArea>
      </Container>
    </div>

  )
})