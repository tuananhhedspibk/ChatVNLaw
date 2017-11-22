import React, { Component } from 'react';
import $ from 'jquery';

class EditerInline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			text: this.props.text
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}
	componentDidUpdate() {
		var component = this;
		if (this.state.editing) {
			$('.editer-inline').find('input').keyup(function(e) {
	     	   if (e.keyCode === 27) {
						component.handleCancel();
		        }
			});
		}
	}
	handleSave(event) {
		event.preventDefault();
		this.props.handleUpdate(this.props.name, this.refs.newText.value)
		this.setState({editing: false,
			text: this.refs.newText.value})
	}
	handleEdit() {
		this.setState({editing:true})
	}
	handleCancel(event) {
		event.preventDefault();
		this.setState({editing:false})
	}
	renderForm() {
		return (
			<div className="editer-inline">
				<form  onSubmit={this.handleSave}>
					<div className="form-group">
					    <input ref="newText" defaultValue={this.state.text} type="text" className="form-control" autoFocus/>
					</div>
					<button title="Lưu" type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
					<p className='noti-cancel'>Nhấn 'ESC' để <a href='' onClick={this.handleCancel}>hủy</a></p>
				</form>
			</div>
			);
		
	}
	renderNomarl() {
		return (
			<div className="editer-inline">
				<div className="editer-name">{this.state.text}<i className="fa fa-pencil-square-o" title="Chỉnh sửa" aria-hidden="true" onClick={this.handleEdit}></i>
				</div>
			</div>
			);
	}
	render() {
		if (this.state.editing) {
			return this.renderForm();
		}
		else{
			return this.renderNomarl();

		}
	}
}
export default EditerInline;
