import React, {Component} from 'react';

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
    this.setState({achievements:
      this.props.profile.achievements});
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

  }

  render() {
    return(
      <div className='detail-info-settings'>
        <div className='info-block'>
          <div className='intro ui form'>
            <div className='title'>
              {translate('app.settings.intro')}
            </div>
            <textarea onChange={this.handleInputChange.bind(this)}
              value={this.state.intro}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='achievements ui form'>
            <div className='title'>
              {translate('app.settings.achievements')}
            </div>
            <textarea onChange={this.handleInputChange.bind(this)}
              value={this.state.achievements}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='education ui form'>
            <div className='title'>
              {translate('app.settings.education')}
            </div>
            <textarea onChange={this.handleInputChange.bind(this)}
              value={this.state.education}/>
          </div>
        </div>
        <div className='info-block'>
          <div className='work-place ui form'>
            <div className='title'>
              {translate('app.settings.work_place')}
            </div>
            <textarea onChange={this.handleInputChange.bind(this)}
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
