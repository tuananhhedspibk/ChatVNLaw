import React, { Component } from 'react';
import firebase from 'firebase';
import ReactStars from 'react-stars';
import { Modal, Button, Header } from 'semantic-ui-react';

import ReadMore from '../../shared/readmore';
import * as Review from '../../../lib/user/getreviewlawyer';

let translate = require('counterpart');

class CenterBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      review: [],
      modalOpen: false
    }
  }

  componentWillMount(){
    var component = this
    let properties = {}
    properties['listReview'] = this.props.user.review
    properties['component'] = this
    Review.getReviewLawyer(properties)
  }

  handleOpenModal() {
    this.setState({modalOpen: true});
  }

  handleCloseModal() {
    this.setState({modalOpen: false});
  }

  renderViewReview(){
    var component = this;
    if(component.state.review.length > 0){
      return(
        component.state.review.map((review, index) => {
          if(index % 2 != 0){
            return (
              <div className='customer-review'>
                <img className='user-ava' src={review.img}/>
                <p className='review-content'>
                  {review.comment}
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
                  {review.comment}
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
        })
      )
    }
  }

  renderModalTemplate() {
    return(
      <Modal trigger={
        <Button className='content-block center-block'>
          {translate('app.profile.view_all') + ' 12,333 ' +
            translate('app.profile.review')}
        </Button>}>
        <Modal.Header>
          {translate('app.profile.user_review')}
        </Modal.Header>
        <Modal.Content scrolling>
          <Header>
            <div className='number'>
              15,200
            </div>
            <div className='char'>
              {translate('app.profile.review')}
            </div>
          </Header>
          {
            this.state.review.map((review, index) => {
              return (
                <div className='customer-review'>
                  <img className='user-ava' src={review.img}/>
                  <p className='review-content'>
                    {review.comment}
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
          <div className='media'>
            <div className='media-img'></div>
            <div className='media-desc'>
              <div className='bar'></div>
            </div>
            <div className='media-star'>
              <div className='bar'></div>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    )
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
