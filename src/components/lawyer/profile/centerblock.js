import React, { Component } from 'react';
import firebase from 'firebase';
import ReactStars from 'react-stars';
import { Modal, Button, Header } from 'semantic-ui-react';
import $ from 'jquery';

import ReadMore from '../../shared/readmore';
import * as Review from '../../../lib/user/getreviewlawyer';

let translate = require('counterpart');

class CenterBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      reviews: [],
      modalOpen: false
    }
  }

  componentWillMount(){
    var component = this;
    let properties = {};
    properties['limit'] = 6;
    properties['ts'] = (new Date()).getTime();
    properties['lawyerId'] = this.props.userId;
    properties['component'] = this;
    Review.getReviewLawyer(properties);
  }

  handleOpenModal() {
    this.setState({modalOpen: true});
  }

  handleCloseModal() {
    this.setState({modalOpen: false});
  }

  renderViewReview(){
    var component = this;
    if(component.state.reviews.length > 0){
      return(
        component.state.reviews.map((review, index) => {
          if(index < 6) {
            if(index % 2 != 0){
              return (
                <div className='customer-review'>
                  <img className='user-ava' src={review.img}/>
                  <p className='review-content'>
                    {review.content}
                  </p>
                  <div className='rate'>
                    <ReactStars
                      count={5}
                      value={review.star}
                      edit={false}
                      size={20}
                      color2={'#ffd700'} />
                  </div>
                </div>
              )
            }
            else {
              return (
                <div className='customer-review review-grey'>
                  <img className='user-ava' src={review.img}/>
                  <p className='review-content'>
                    {review.content}
                  </p>
                  <div className='rate'>
                    <ReactStars
                      count={5}
                      value={review.star}
                      edit={false}
                      size={20}
                      color2={'#ffd700'} />
                  </div>
                </div>
              )
            }
          }
        })
      )
    }
    else {
      return (
        <div className='no-review'>
          {translate('app.identifier.no_review')}
        </div>
      )
    }
  }

  renderModalTemplate() {
    if (this.props.profile.reviews) {
      if (Object.keys(this.props.profile.reviews).length > 6) {
        return(
          <Modal trigger={
            <Button className='content-block center-block'>
              {translate('app.profile.view_all') + ' ' +
              Object.keys(this.props.profile.reviews).length + ' ' +
                translate('app.profile.review')}
            </Button>}>
            <Modal.Header>
              {translate('app.profile.user_review')}
            </Modal.Header>
            <Modal.Content scrolling>
              <Header>
                <div className='number'>
                  {Object.keys(this.props.profile.reviews).length}
                </div>
                <div className='char'>
                  {translate('app.profile.review')}
                </div>
              </Header>
              {
                this.state.reviews.map((review, index) => {
                  return (
                    <div className='customer-review'>
                      <img className='user-ava' src={review.img}/>
                      <p className='review-content'>
                        {review.content}
                      </p>
                      <div className='rate'>
                        <ReactStars
                          count={5}
                          value={review.star}
                          edit={false}
                          size={20}
                          color2={'#ffd700'} />
                      </div>
                    </div>
                  )
                })
              }
              {
                Object.keys(this.props.profile.reviews).length > this.state.reviews.length ?
                (
                  <div className='load-more-sec'>
                    <button className='modal-btn' onClick={this.loadMoreReviews.bind(this)}>
                      {translate('app.profile.load_more')}
                    </button>
                  </div>
                )
                :
                (
                  <div className='load-more-sec'>
                  </div>
                )
              }
            </Modal.Content>
          </Modal>
        )
      }
    }
  }

  loadMoreReviews() {
    let properties = {};
    let currentReviewsCt = this.state.reviews.length;
    properties['limit'] = 6;
    properties['component'] = this;
    properties['lawyerId'] = this.props.userId;
    properties['ts'] =  (parseInt(
      this.state.reviews[currentReviewsCt - 1].created_at) - 1);
    Review.getReviewLawyer(properties);
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
        <br/>
        <div className='content-block center-block review-block'>
          <div className='title'>
            {translate('app.lawyer.review')}
          </div>
          <div className='content'>
            {this.renderViewReview()}
          </div>
        </div>
        {this.renderModalTemplate()}
      </div>
    )
  }
}

export default CenterBlock;
