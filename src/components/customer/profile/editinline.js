import React, { Component } from 'react';

class EditerInline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			text: this.props.text
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.handleSave = this.handleSave.bind(this);

	}
	handleSave(event) {
		this.props.handleUpdate(this.props.name, this.refs.newText.value)
		event.preventDefault()
		this.setState({editing: false,
			text: this.refs.newText.value})
	}
	handleEdit() {
		this.setState({editing:true})
		console.log(this.state)
	}
	renderForm() {
		return (
			<div className="editer-inline">
				<form  onSubmit={this.handleSave}>
					<div className="form-group">
					    <input ref="newText" type="text" className="form-control" value={this.props.text}/>
					</div>
					<button type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
				</form>
			</div>
			);
	}
	renderNomarl() {
		return (
			<div className="editer-inline">
				{this.state.text}<i className="fa fa-pencil-square-o" aria-hidden="true" onClick={this.handleEdit}></i>
			</div>
			);
	}
	render() {
		if (this.state.editing) {
			console.log("1111")
			return this.renderForm();
		}
		else{
			console.log("22222")
			return this.renderNomarl();
		}
	}
}
export default EditerInline;
