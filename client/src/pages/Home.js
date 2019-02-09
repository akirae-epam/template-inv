import React from 'react';
import Canvas from 'components/Canvas';
import Title from 'components/Title';
import MobileBackground from 'components/MobileBackground';
import StreamOnline from 'components/StreamOnline';

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mobileSize: false,
    };
  }

  componentDidMount() {
    this.getWindowSize();
    window.addEventListener('resize', this.getWindowSize);
  }

  getWindowSize = () => {
    if (window.innerWidth < 768) {
      this.setState({
        mobileSize: true,
      });
    }
    else {
      this.setState({
        mobileSize: false,
      });
    }
  }

  render(){
    return(
      <div className="component_38">
        {this.state.mobileSize ?
          null
          :
          <Canvas/>
        }
        <MobileBackground/>
        <Title/>
        <StreamOnline/>
      </div>
    );
  }
}

export default Home;
