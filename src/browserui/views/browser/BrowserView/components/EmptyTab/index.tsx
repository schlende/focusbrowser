import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Input } from './style';
import { SearchBar, SearchIcon, Microphone } from './style';
import { BookMarkArea, BookMarkButtonBox1, BookMarkButton1, TextLabel1 } from './style';


/*
Instructions for the day

1. Make the UI look beatuful...
* Hand cursor on hover
* Size buttons correctly... just make it look nice
2. Build out the structured data for the bookmarks
3. Drive the UI using the structured data (if there are 6 bookmark elements... you should see them in the display... 
should be laid out nicely)
4. Make the buttons clickable...

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

var error = [{ "fvalue": 12},{ "fvalue": 21}];

var ftoc = (fvalue:number) => {
  return 5/9*fvalue+32;
}

          {ftoc(error[1].fvalue)}

*/


const clickHandler = () => {
  console.log("Clicked!!!!");
}

var bookmarksData = [
  { "name": "something1toolongfortheavailablespace", "thumb": "https://sjc5.discourse-cdn.com/sitepoint/community/user_avatar/www.sitepoint.com/ryanreese/45/54672_2.png", "url": "https://www.w3schools.com/" },
  { "name": "some", "thumb": "https://www.w3schools.com/images/colorpicker.png", "url": "http://somethingelse1.com" },
  { "name": "something", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse1.com" },
  { "name": "something", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse1.com" },
  { "name": "something", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse1.com" },
  { "name": "something2toolongfortheavailablespace", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse1.com" },
  { "name": "something3toolongfortheavailablespace", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse1.com" },
  { "name": "something4toolongfortheavailablespace", "thumb": "https://www.w3schools.com/images/colorpicker.gif", "url": "http://somethingelse1.com" }
];


var BookMarkButtons = () => {
  var bookmarks = [];

  for (var i = 0; i < bookmarksData.length; i++) {
    console.log(bookmarksData[i].name);
    bookmarks.push(
      <BookMarkButtonBox1>
        <BookMarkButton1>
          <img style={{"width": "100%", "height": "100%"}} src={bookmarksData[i].thumb} /><a href={bookmarksData[i].url} />
        </BookMarkButton1>
        <TextLabel1>{bookmarksData[i].name}{i}</TextLabel1>
      </BookMarkButtonBox1>
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
          <Microphone />
        </SearchBar>
        <BookMarkArea>
          {BookMarkButtons()}
        </BookMarkArea>
      </Container>
    </div>
  )
})