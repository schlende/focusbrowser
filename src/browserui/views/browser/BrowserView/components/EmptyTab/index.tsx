import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Input } from './style';
import { SearchBar, SearchIcon } from './style';
import { ButtonArea, Button1, TextLabel1 } from './style';


/*
Instructions for the day

1. Make the UI look beatuful...
* Hand cursor on hover
* Size buttons correctly... just make it look nice
2. Build out the structured data for the bookmarks
3. Drive the UI using the structured data (if there are 6 bookmark elements... you should see them in the display... 
should be laid out nicely)
4. Make the buttons clickable...

*/


const clickHandler = () => {
  console.log("Clicked!!!!");
}

var bookmarksData = [
  { "name": "something", "url": "http://somethingelse.com" }
]

var array = [{
  "name": "joe",
  "age": 10,
  "education": {
    "highschool": "Fairview"
  }
},
{
  "name": "walt",
  "age": 36,
  "education": {
    "highschool": "Fairview"
  }
}
]

console.log(array[1].education.highschool);


const BookMarkButtons = () => {
  var bookmarks = [];

  for (var i = 0; i < bookmarksData.length; i++) {
    console.log(bookmarksData[i].name);
    bookmarks.push(
      <div onClick={clickHandler}>a</div>
    )
  }

  return bookmarks;
}

export const EmptyTab = observer(() => {

  return (
    <div>
      <Container>
        <SearchBar>
          <Input type="text" placeholder="Please tell me how to..." />
          <SearchIcon />
        </SearchBar>
        <ButtonArea>
          {BookMarkButtons()}
          <div>
            <Button1 />
            <TextLabel1>Description1</TextLabel1>
          </div>
        </ButtonArea>
      </Container>
    </div>

  )
})