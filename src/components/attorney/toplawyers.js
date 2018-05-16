import React, { Component } from 'react';

import ReadMore from '../shared/readmore';

import * as translate from 'counterpart';
import * as constant from '../constants';
import { ax_ins } from '../../lib/constants';

class TopLawyers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top_lawyers: []
    }
  }

  componentDidMount() {
    this.loadDataFromServer();
  }

  loadDataFromServer() {
    var component = this;

    ax_ins.get(constant.API_TOP_LAWYERS_URI)
      .then(function (response) {
        component.setState({
          top_lawyers: response.data.top_lawyers
        });
      })
      .catch(function (error) {
        component.toastError(component);
      });
  }

  toastError(component) {
    component.emitter.emit('AddNewErrorToast',
    translate('app.system_notice.error.title'),
    translate('app.system_notice.error.text.some_thing_not_work'),
    2000, ()=>{});
  }

  handleOnclickLawyer(userName){
    window.open(constant.BASE_URL + constant.LAWYER_PROFILE_URI + '/' + userName, '_blank');
	}

  render() {
    return(
      <div className='top-view'>
        <div className='title'>
          {translate('app.attorney.top_view')}
        </div>
        <hr/>
        <div className='lawyers-list'>
          {
            this.state.top_lawyers.map(lawyer => {
              return (
                <div className='item' onClick={
                  this.handleOnclickLawyer.bind(this, lawyer.userName)}>
                    <img alt='ava'
                      src={constant.API_BASE_URL + '/' + lawyer.avatar.url}/>
                    <p className='name'>{lawyer.displayName}</p>
                    <p className='intro'>
                      <ReadMore has_link={false} lines={2}>
                        {lawyer.intro}
                      </ReadMore>
                    </p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default TopLawyers;
