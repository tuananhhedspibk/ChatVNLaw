import React, { Component } from 'react';
import * as Lawyers from '../../lib/helper/user/lawyers' 
import ReactLoading from 'react-loading';

class Content extends Component {
    constructor(props){
			super(props);
			this.state={
				name:null,
				isLoading: true,
				findOther: false,
				result:[]
			}
		}
		componentWillMount(){
			this.setState({name: this.props.name});
		}
		componentDidMount(){
			let properties = {}
			properties['input'] = this.state.name;
			properties['component'] = this;
			Lawyers.findLawyers(properties, () =>{

			})
		}
		renderCountNumberOfResult(){
			if(!this.state.findOther){
				return(
					<div>Có {this.state.result.length} kết quả cho {this.state.name}</div>
				)
			}else{
				return(
					<div>Không tìm thấy kết quả cho {this.state.name}, {this.state.result.length} kết quả liên quan</div>
				)
			}
		}
		renderResultArr(){
			return (
				<div>
						{this.state.result.map( (element)=>{
							
							return(	<div>
									{element.Fullname}
								</div>
							)
						})}
				</div>
			);
		}
    render() {
			if(!this.state.isLoading){
				return(
					<div>
					 {this.renderCountNumberOfResult()}
				   {this.renderResultArr()}
					</div>
				)
			}else{
				return(
					<ReactLoading type='cylon' color='#337ab7' height='150' width='150'/>					
				)
			}
    }
}

export default Content;
