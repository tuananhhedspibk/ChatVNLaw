import React, { Component } from 'react';
import ReadMore from '../../shared/readmore';
import firebase from 'firebase';
import ReactStars from 'react-stars';
import * as Review from '../../../lib/user/getreviewlawyer';

let translate = require('counterpart');

class CenterBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      review: []
    }
  }

  componentWillMount(){
    var component = this
    for(let i in this.props.user.review){
      component.state.review.push({
        img: component.props.user.review[i].photoURL,
        comment: component.props.user.review[i].comment,
        star: component.props.user.review[i].star
      })
    }
    // let properties = {}
    // properties['listReview'] = this.props.user.review
    // properties['component'] = this
    // Review.getReviewLawyer(properties)
  }

  renderViewReview(){
    var component = this
    var img 
    if(component.state.review.length > 0){
      return(
        component.state.review.map((review, index) => {
          return (
            <div>
              <img className='user-ava' src={review.img}/>
              <p>{review.comment}</p>
              <p className='rate'>
                <ReactStars
                  count={5}
                  value={review.star}
                  edit={false}
                  size={20}
                  color2={'#ffd700'} />
              </p>
              <hr />
            </div>
          )
        })
      )
    }
  }

  render() {
    return(
      <div>
        <div className='content-block center-block'>
          <div className='title'>
            {translate('app.lawyer.intro')}
          </div>
          <div className='content'>
            <ReadMore>
              {this.props.convertContent(
                this.props.profile.intro)}
            </ReadMore>
          </div>
          <hr/>
          <div className='title'>
            {translate('app.lawyer.achievement')}
          </div>
          <div className='content'>
            <ReadMore>
              {this.props.convertContent(
                this.props.profile.achievement)}
            </ReadMore>
          </div>
          <hr/>
          <div className='title'>
            {translate('app.lawyer.education')}
          </div>
          <div className='content'>
            <ReadMore>
              {this.props.convertContent(
                this.props.profile.education)}
            </ReadMore>
          </div>
        </div>
        <br /> 
        <br />
        <div className='content-block center-block'>
          <div className='title'>
            {translate('app.lawyer.review')}
          </div>
          <div className='content'>
            {this.renderViewReview()}
          </div>
        </div>
      </div>
    )
  }
}

export default CenterBlock;
