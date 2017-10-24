import React, { Component } from 'react';
import ReactStickies from 'react-stickies';
import $ from 'jquery';

const firebase = require('firebase');

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      notes: [],
      showTape: false,
      showOutput: false,
      showTitle: true,
      showFooter: true,
      output: '',
      colors: ['#FFFFFF'],
      showCustomColors: false,
      showMock: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentWillMount(){
    var component = this;
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        component.setState({currentUser: user});
      }
    })
  }

  componentDidMount() {
    $('main.main').removeClass('main-customer');
  }

  componentWillUpdate(nextProps, nextStates){
    if(this.state.currentUser !== nextStates.currentUser){
      firebase.database().ref(`notes/${nextStates.currentUser.uid}`).once('value', (data) => {
        if(data){
          let values = data.val()
          if (values) {
            for (let val of values) {
              if (val.grid.y === -1) {
                val.grid.y = Infinity
              }
            }
            this.setState({
              notes: values
            })
          }
        }
      })
    }
  }
  componentWillUnmount(){
    this.onSave();
  }

  onSave () {
    var note = this.state.notes.text;
    var component = this;
    const notes = this.state.notes;
    notes.map(note => {
      delete note.editorState;
    })
    let noteRefs = notes.reduce((result, cur, i)=> {
      if (cur.grid.y == Infinity){
        cur.grid.y = -1
      }
      delete cur.grid.isDraggable
      delete cur.grid.isResizable 
      delete cur.grid.maxH 
      delete cur.grid.maxW 
      delete cur.grid.minH 
      delete cur.grid.minW 
      result[i] = cur
      return result
    }, {})
    firebase.database().ref(`notes/${this.state.currentUser.uid}`).set(notes);
  }
  
  onChange (notes) {
    this.setState({
      notes
    });
  }

  render() {
    return (
      <div>
      <ReactStickies
        notes={this.state.notes}
        onChange={this.onChange} />
        <button onClick={this.onSave}>Ok</button>
      </div>
    );
  }
}

export default Note;
