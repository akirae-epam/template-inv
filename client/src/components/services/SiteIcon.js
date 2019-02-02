import React from 'react';
import icon from 'media/favicon.ico';

class SiteTitle extends React.Component{
  componentWillMount(){
    var link = document.querySelector('link[rel*="icon"]') || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  render(){
    return null;
  }
}
export default SiteTitle;