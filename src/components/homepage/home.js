import React, { Component } from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';
import $ from 'jquery'
import Toast from '../notification/toast';
import {EventEmitter} from 'fbemitter';

import * as translate from 'counterpart';

import '../../assets/styles/common/home.css';

class App extends Component {
	constructor(props){
		super(props);
    this.emitter = new EventEmitter();
	}
	componentDidMount() {
		this.emitter.emit('AddNewSuccessToast','',translate('app.system_notice.success.text.welcome'),5000, ()=>{} )
		
		window.addEventListener('scroll',this.handleScroll);
		this.handleScroll();
	}

	handleScroll() {
		if (window.scrollY >= $('.find').offset().top) {
			$('.nav-hidden').fadeIn(500);
		}
		else {
			$('.nav-hidden').fadeOut(500);
		}
	}

  render() {
    return (
      <div className='home-page'>
				<Toast emitter = {this.emitter}/>
        <Header/>
        <Content/>
        <Footer/>
      </div>
    );
  }
}

export default App;
