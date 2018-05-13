import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';
import $ from 'jquery';

import * as translate from 'counterpart';

class StickyHighlight extends Component {
	constructor(props) {
		super(props);
    this.handleDef = this.handleDef.bind(this);
    this.handleModified = this.handleModified.bind(this);
    this.handleModify = this.handleModify.bind(this);
	}

	handleDef() {
		if($('.checked.sticky-def').length) {
			$('.definition-popover').css('color','#212529');
			$('.definition-popover').attr('data-toggle','');
		}
		else {
			$('.definition-popover').css('color','#00cc00');
			$('.definition-popover').attr('data-toggle','popover');
		}
	}

	handleModified() {
		if($('.checked.sticky-modified').length) {
			$('*[data-target="#modify-modal"]').css('background-color','white');
		}
		else {
			$('*[data-target="#modify-modal"]').css('background-color', '#FFF9C4');
		}
	}

	handleModify() {
		if($('.checked.sticky-modify').length) {
			$('#modify-box').css('background-color','white');
		}
		else {
			$('#modify-box').css('background-color','#E1F5FE');
		}
	}

	render() {
		return (
			<div className='sticky-col'>
				<div className='sticky-title'>
					{translate('app.article.sticky.title')}
				</div>
				<Checkbox className="sticky-def" onChange={this.handleDef} defaultChecked label={
					<label className="form-check-label"> 
            <div className="color-box" style={{backgroundColor: '#00cc00'}}>
						</div>
						{translate('app.article.sticky.determine')}
          </label>
				} />
        <Checkbox defaultChecked className="sticky-modified" onChange={this.handleModified} label={
					<label className="form-check-label"> 
            <div className="color-box" style={{backgroundColor: '#FFF9C4'}}>
						</div>
						{translate('app.article.sticky.is_editted')}
          </label>} />
        <Checkbox defaultChecked className="sticky-modify" onChange={this.handleModify} label={
					<label className="form-check-label"> 
            <div className="color-box" style={{backgroundColor: '#E1F5FE'}}>
						</div>
						{translate('app.article.sticky.edit')}
          </label>} />
			</div>
		)
	}
}

export default StickyHighlight;
