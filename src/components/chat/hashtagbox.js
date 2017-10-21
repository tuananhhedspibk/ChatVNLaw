import React, { Component } from 'react';

import { WithContext as ReactTags } from 'react-tag-input';

import '../../assets/styles/common/hashtag.css';

class HashTagBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [{ id: 1, text: props.id }]
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  }

  handleAddition(tag) {
    let tags = this.state.tags;
    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({tags: tags});
  }

  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;

    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    this.setState({ tags: tags });
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div>
        <ReactTags tags={tags}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag} />
      </div>
    )
  }
};

export default HashTagBox;
