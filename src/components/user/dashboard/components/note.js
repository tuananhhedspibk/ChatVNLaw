import React, { Component } from 'react';
import ReactStickies from 'react-stickies';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      showTape: true,
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

  onSave () {
    const notes = this.state.notes;
    notes.map(note => {
      delete note.editorState;
    })
  }
  
  onChange (notes) {
    this.setState({
      notes
    })
  }

  render() {
    return (
      <ReactStickies
        notes={this.state.notes}
        onChange={this.onChange} />
    );
  }
}

export default Note;
