import React, {Component} from 'react';
import {storeLawyerData} from '../../../lib/user/lawyers';

let translate = require('counterpart');

class DetailInfoSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: null,
      achievements: null,
      education: null,
      workPlace: null
    }
  }

  componentWillMount() {
    this.setState({intro: this.props.profile.intro});
    this.setState({achievements: this.props.profile.achievement});
    this.setState({education: this.props.profile.education});
    this.setState({workPlace: this.props.profile.workPlace});
  }

  handleInputChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  editProfile() {
    var component = this;
    var properties = {}
    properties.curentUser = this.props.user;
    properties.intro = this.state.intro;
    properties.achievements = this.state.achievements;
    properties.education = this.state.education
    properties.workPlace = this.state.workPlace
    
    console.log(properties);
    storeLawyerData(properties, (issuccess) =>{
      if(issuccess){
        component.props.emitter.emit('AddNewSuccessToast', '',translate('app.system_notice.success.text.success_update_profile'),5000, ()=>{})
      }else{
        component.props.emitter.emit('AddNewErrorToast', '',translate('app.system_notice.error.text.some_thing_not_work'),5000, ()=>{})        
      }
    })
  }

  render() {
    return(
      <div className='detail-info-settings'>
        <div className='info-block'>
          <div className='intro ui form'>
            <div className='title'>
              {translate('app.settings.intro')}
            </div>
            <textarea name='intro' 
              onChange={this.handleInputChange.bind(this)}
              value={this.state.intro}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='achievements ui form'>
            <div className='title'>
              {translate('app.settings.achievements')}
            </div>
            <textarea 
              name='achievements'
              onChange={this.handleInputChange.bind(this)}
              value={this.state.achievements}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='education ui form'>
            <div className='title'>
              {translate('app.settings.education')}
            </div>
            <textarea 
              name='education'
              onChange={this.handleInputChange.bind(this)}
              value={this.state.education}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='work-place ui form'>
            <div className='title'>
              {translate('app.settings.work_place')}
            </div>
            <textarea 
              name='workPlace'
              onChange={this.handleInputChange.bind(this)}
              value={this.state.workPlace}/>
          </div>
        </div>
        <button onClick={this.editProfile.bind(this)}
          className='save-btn'>
          <i className='fa fa-floppy-o' aria-hidden='true'></i>
          {translate('app.settings.save')}
        </button>
      </div>
    )
  }
}

export default DetailInfoSettings;
