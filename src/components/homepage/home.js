import React, { Component } from 'react';

import Header from './header';
import Content from './content';
import Footer from './footer';
import $ from 'jquery'
import '../../assets/styles/common/home.css';

class App extends Component {
	componentDidMount() {
		window.addEventListener('scroll',this.handleScroll);
		this.handleScroll();
	}

	handleScroll() {
		if (window.scrollY >= $('.find').offset().top) {
			$('.nav-hidden').show();
			$('.nav-hidden').height($('.find').offset().top);
		}
		else {
			$('.nav-hidden').fadeOut(200);
			$('.nav-hidden').height(0);
		}
	}

  render() {
    return (
      <div className='home-page'>
        <Header/>
        <Content/>
        <Footer/>
      </div>
    );
  }
}

export default App;
