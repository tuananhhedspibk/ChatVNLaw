import React, { Component } from 'react';

import Header from './components/header';
import Sidebar from './components/sidebar';
import Aside from './components/aside';
import Footer from './components/footer';
import DashBoard from './components/dashboard';
import {Container} from 'reactstrap';

import '../../../assets/styles/dashboard/style.css';

class UserDashBoard extends Component {  
  render() {
    return(
      <div className='app'>
        <Header/>
        <div className='app-body'>
          <Sidebar {...this.props}/>
          <main className='main'>
            <Container fluid>
              <DashBoard/>
            </Container>
          </main>
          <Aside/>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default UserDashBoard;
