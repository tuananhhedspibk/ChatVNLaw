import React from 'react';

class BaseItem extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      element: null,
      currentUser: null
    }
  }
  
  componentWillMount(){
    this.setState({element: this.props.element,
    currentUser: this.props.currentUser})
  }

  componentWillReceiveProps(nextProps){
    if(this.state.element !== nextProps.element){
      this.setState({element: nextProps.element})
    }
    if(this.state.currentUser !== nextProps.currentUser){
      this.setState({currentUser : nextProps.currentUser})
    }
  }
}

export default BaseItem;