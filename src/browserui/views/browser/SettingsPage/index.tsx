import * as React from "react";
import * as ReactDOM from "react-dom";
import { observer } from 'mobx-react-lite';
import { SettingsHeader, Box1, Box2, Header1 ,LearnMoreButton, OptionLabel, OptionLabel2, Topic1, RadioButton } from './style';


export const handleOnClick = () => {
  alert("That button got clicked");
}

export const SettingsPage = observer(({visible}: {visible: boolean}) => {

  var pageStyle: any = {
    display: visible ? "block" : "none"
  }

  return (
    <div style={pageStyle}>
      <SettingsHeader>
        Settings
      </SettingsHeader>
      <Box1>
        Domain
        <Box2>
          <LearnMoreButton onClick={handleOnClick}>
              Learn More
          </LearnMoreButton>
          <Header1>  
            Resolve domain via
          </Header1>

          <div>
            <div>
              <RadioButton type="radio" name="domain" value="1" />
              <OptionLabel>Unstoppable.com API -</OptionLabel> <OptionLabel2> Non-parnoid + fast response times</OptionLabel2>
            </div>
            <div>
              <RadioButton type="radio" name="domain" value="2" />
              <OptionLabel>Zilliqua API -</OptionLabel> <OptionLabel2> Non-parnoid + fast response times</OptionLabel2>
            </div>
            <div>
              <RadioButton type="radio" name="domain" value="3" />
              <OptionLabel>Direct blockchain lookup -</OptionLabel> <OptionLabel2> Non-parnoid + slow response times</OptionLabel2>
            </div>
            <Topic1>
              <OptionLabel>Read address from - </OptionLabel><input type="text" name="firstname" />
            </Topic1>
          </div>
        </Box2>

      </Box1>
      <Box1>
        IPFS Content
        <Box2>
          <LearnMoreButton>
              Learn More
          </LearnMoreButton>
          <Header1>  
            Download IPFS content via
          </Header1>
          
          <div>
            <div>
              <RadioButton type="radio" name="content" value="1" />
              <OptionLabel>Cloudlare CDN -</OptionLabel> <OptionLabel2> Non-parnoid + fast response times</OptionLabel2>
            </div>
            <div>
              <RadioButton type="radio" name="content" value="2" />
              <OptionLabel>Infura API -</OptionLabel> <OptionLabel2> Non-parnoid + fast response times</OptionLabel2>
            </div>
            <div>
              <RadioButton type="radio" name="content" value="3" />
              <OptionLabel>Designted IPFS Node -</OptionLabel> <OptionLabel2> Non-parnoid + slow response times</OptionLabel2>
            </div>
            <Topic1>
              <div>
                <RadioButton type="radio" name="content" value="4" />
                <OptionLabel> Specify a node - </OptionLabel><input type="text" name="firstname" />
              </div>
              <div>
                <RadioButton type="radio" name="content" value="5" />
                <OptionLabel> Run your own local node (use more internet bandwidth) </OptionLabel>
              </div>
            </Topic1>
            
          </div>
        </Box2>
          

      </Box1>
    </div >
    

    
  );
});

