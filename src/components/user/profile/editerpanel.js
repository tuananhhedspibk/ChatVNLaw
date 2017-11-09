import React, { Component } from 'react';
import $ from 'jquery';
import autosize from 'autosize';
class EditerPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			text: this.props.text
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.renderDefault = this.renderDefault.bind(this);
		this.renderNomarl = this.renderNomarl.bind(this);
		this.renderForm = this.renderForm.bind(this);

	}
	componentDidUpdate() {
		autosize($('textarea'));
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
	renderDefault() {
		return (
			<div className="prof-panel-heading">
				<a  data-toggle="collapse"
					href={"#collapse"+this.props.keyID} aria-expanded="true" >
						<h4>{this.props.title}</h4><i className="fa fa-chevron-right" aria-hidden="true"></i>
				</a>
			</div>
			);
	}
	renderForm() {
		return	(
		 	<div className="editer-panel">
		 		{this.renderDefault()}
				<div id={"collapse"+this.props.keyID} className="panel-collapse collapse show">
					<form  onSubmit={this.handleSave}>
						<div className="form-group">
						    <textarea ref="newText" defaultValue={this.state.text} className="form-control" rows='5' autoFocus/>
						</div>
						<div className="action-grp">
							<button type="submit" title="Lưu"><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
							<button onClick={this.handleCancel} title="Hủy"><i className="fa fa-times" aria-hidden="true"></i></button>
						</div>
					</form>
				</div>
			</div>
			);
	}
	renderNomarl() {
		return (
			<div className="editer-panel">
				{this.renderDefault()}
				<div id={"collapse"+this.props.keyID} className="panel-collapse collapse show">
					<div className='collapse-content'>
						{this.state.text}
					</div>
						<i className="fa fa-pencil-square-o" title="Chỉnh sửa" aria-hidden="true" onClick={this.handleEdit}></i>
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
export default EditerPanel;
