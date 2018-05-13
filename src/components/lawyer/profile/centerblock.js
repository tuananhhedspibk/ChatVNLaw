import React, { Component } from 'react';
import ReactStars from 'react-stars';
import { Modal, Button, Header } from 'semantic-ui-react';

import ReadMore from '../../shared/readmore';
import * as Review from '../../../lib/user/getreviewlawyer';

import * as constant from '../../constants';
import * as translate from 'counterpart';

class CenterBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      modalOpen: false
    }
  }

  loadDataFromServer() {
    var component = this;
    Review.getReview(this.props.userName, (success, response) => {
      if (success) {
        component.setState({reviews: response.data.reviews});
      }
      else {

      }
    })
  }

  componentWillMount(){
    this.loadDataFromServer();
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
            if(index % 2 !== 0){
              return (
                <div className='customer-review'>
                  <img className='user-ava' alt={'ava' + index}
                    src={constant.DEFAULT_AVATAR_URL}/>
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
                  <img className='user-ava' alt={'ava' + index}
                    src={constant.DEFAULT_AVATAR_URL}/>
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
    if (this.state.reviews) {
      if (Object.keys(this.state.reviews).length > 6) {
        return(
          <Modal trigger={
            <Button className='content-block center-block'>
              {translate('app.profile.view_all') + ' ' +
              Object.keys(this.state.reviews).length + ' ' +
                translate('app.profile.review')}
            </Button>}>
            <Modal.Header>
              {translate('app.profile.user_review')}
            </Modal.Header>
            <Modal.Content scrolling>
              <Header>
                <div className='number'>
                  {Object.keys(this.state.reviews).length}
                </div>
                <div className='char'>
                  {translate('app.profile.review')}
                </div>
              </Header>
              {
                this.state.reviews.map((review, index) => {
                  return (
                    <div className='customer-review'>
                      <img className='user-ava' alt={'ava' + index}
                        src={constant.DEFAULT_AVATAR_URL}/>
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
                Object.keys(this.state.reviews).length > this.state.reviews.length ?
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
                this.props.user.lawyer_profile.intro)}
            </ReadMore>
          </div>
          <hr/>
          <div className='title'>
            {translate('app.lawyer.achievement')}
          </div>
          <div className='content'>
            <ReadMore>
              {this.props.convertContent(
                this.props.user.lawyer_profile.achievement)}
            </ReadMore>
          </div>
          <hr/>
          <div className='title'>
            {translate('app.lawyer.education')}
          </div>
          <div className='content'>
            <ReadMore>
              {this.props.convertContent(
                this.props.user.lawyer_profile.education)}
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
