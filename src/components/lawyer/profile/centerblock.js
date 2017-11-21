import React, { Component } from 'react';
import ReadMore from '../../shared/readmore';

let translate = require('counterpart');

class CenterBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='content-block center-block'>
        <div className='title'>
          {translate('app.lawyer.intro')}
        </div>
        <div className='content'>
          <ReadMore>
            {this.props.convertContent(
              this.props.profile.intro)}
          </ReadMore>
        </div>
        <hr/>
        <div className='title'>
          {translate('app.lawyer.achievement')}
        </div>
        <div className='content'>
          <ReadMore>
            {this.props.convertContent(
              this.props.profile.achievement)}
          </ReadMore>
        </div>
        <hr/>
        <div className='title'>
          {translate('app.lawyer.education')}
        </div>
        <div className='content'>
          <ReadMore>
            {this.props.convertContent(
              this.props.profile.education)}
          </ReadMore>
        </div>
      </div>
    )
  }
}

export default CenterBlock;
