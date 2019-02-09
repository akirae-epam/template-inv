import React from 'react';
import mobilebg from 'media/mobilebg.jpg';
/*https://www.publicdomainpictures.net/es/view-image.php?image=151151&picture=orion-nebulas-biggest-stars*/

class MobileBackground extends React.Component{
  render(){
    const backgroundStyle = {
      backgroundImage: 'url('+mobilebg+')',
    };
    return(
      <div className="mobile_background" style={backgroundStyle}/>
    );
  }
}

export default MobileBackground;
