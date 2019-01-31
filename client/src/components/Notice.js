import React from 'react';

class Notice extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hoverNotice: false
    };
  }
  hoverNotice = () => {
    this.setState({
      hoverNotice: true,
    });
  }
  leaveNotice = () => {
    this.setState({
      hoverNotice: false,
    });
  }
  render(){
    const {
      hoverNotice,
    } = this.state;

    return(
      <div
        className="notice"
        onMouseEnter ={()=>this.hoverNotice()}
        onMouseLeave={()=>this.leaveNotice()}
      >
        {hoverNotice?
          <span>Destiny's #compsci discord for details.</span>
          :
          <span>?</span>
        }
      </div>
    );
  }
}

export default Notice;
