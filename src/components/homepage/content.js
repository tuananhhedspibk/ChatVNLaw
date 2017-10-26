import React, { Component } from 'react';
import $ from 'jquery';

import * as constant from '../constants';

let translate = require('counterpart');

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'Hanoi',
      area: '',
    };
  }
    
  handleAreaChange = (event) => {
    this.setState({area: event.target.value});
  };

  handleLocateChange = (event) => {
    this.setState({location : event.target.value});
  }

  render() {
    return(
      <div>
        <section className='o-a-v'>
          <div className='vh90'>
            <div id='particles-js'></div>
            <div className='home-hero p-x-0'>
              <div className='col-md-12 auto-block-center md-p-t-8 p-b-20'>
                <div className='home-header'>
                  <div className='content'>
                    <div className='b-t-87'>
                      <strong>
                        {translate('app.home.find_lawyer')}
                      </strong>
                      <strong>
                        {translate('app.home.find_law')}
                      </strong>
                    </div>
                    <h2 id='home-subheader'>
                      {translate('app.home.slogan')}
                    </h2>
                  </div>
                </div>
                <div className='container'>
                  <div className='row m-x-0'>
                    <div className='col-md-4 text-center'>
                      <div className='CliHomeGraphic1'>
                        <img src={constant.findLogoPic} alt="Find logo" />
                      </div>
                    </div>
                    <div className='col-md-4 text-center'>
                      <div className='CliHomeGraphic2'>
                        <img src={constant.scheduleLogoPic} alt="Schedule logo" />
                      </div>
                    </div>
                    <div className='col-md-4 text-center'>
                      <div className='CliHomeGraphic3'>
                        <img src={constant.connectLogoPic} alt="Connect logo" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row m-x-0 p-b-2'>
                  <div className='col-md-4 skinny-text'>
                    <div className='text-center CliHomeHeaderText b-t-87'>
                      <h2>{translate('app.home.find')}</h2>
                    </div>
                    <p className='p-t-2 text-center'>{translate('app.home.find_content')}</p>
                  </div>
                  <div className='col-md-4 skinny-text'>
                    <div className='text-center CliHomeHeaderText b-t-87'>
                      <h2>{translate('app.home.schedule')}</h2>
                    </div>
                    <p className='p-t-2 text-center'>{translate('app.home.schedule_content')}</p>
                  </div>
                  <div className='col-md-4 skinny-text'>
                    <div className='text-center CliHomeHeaderText b-t-87'>
                      <h2>{translate('app.home.connect')}</h2>
                    </div>
                    <p className='p-t-2 text-center'>{translate('app.home.connect_content')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Content;
