import React, { Component } from 'react';
import Nav from '../../components/homepage/nav' ;
import Content from './content'
import Footer from '../../components/homepage/footer';
import Find from '../homepage/find';

import '../../assets/styles/common/attorney.css';

const SEARCH_PARAM = 'name';

class Attorney extends Component {
  constructor(props){
    super(props);   
    this.state={
      name: null
    } 
  }

  componentWillMount(){
    var params = new URLSearchParams(this.props.location.search);
    var name = params.get(SEARCH_PARAM);
    this.setState({name: name});
  }

  renderContent(){
    if(!!this.props.location.search){
      if(!!this.state.name){
        return(
          <Content name={this.state.name}/>
        )
      }
    }else{
      return(
        <Content name=''/>
      )
    }
  }

  render() {
    return (
      <div>
        <Nav navStyle='inverse'/>
        <div className='attorney'>
          <div className='row justify-content-center'>
            <div className='col-md-9'>
              <Find sloganStyle='none'/>
              <hr/>
              <div className='attorney-result-content'>
                {this.renderContent()}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Attorney;
