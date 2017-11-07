import React, { Component } from 'react';
import Nav from '../../components/homepage/nav' ;
import Content from './Content'
import Footer from '../../components/homepage/footer';
import Find from '../homepage/find';
class Attorney extends Component {
  constructor(props){
    super(props);   
    this.state={
      name: null
    } 
  }
  componentWillMount(){
    var params = new URLSearchParams(this.props.location.search);
    var name = params.get('name');
    this.setState({name: name});
  }
  renderContent(){
    if(!!this.state.name){
      return(
        <Content 
          name={this.state.name}/>
      )
    }
  }
  render() {
    return (
      <div>
        <Nav navStyle='inverse' />
        <Find/>
        {this.renderContent()}
        <Footer />
      </div>
    );
  }
}

export default Attorney;
