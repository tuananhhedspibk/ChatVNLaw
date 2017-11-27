import React, { Component } from 'react';
import ReactLoading from 'react-loading';

import * as Lawyers from '../../lib/user/lawyers' 

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
			properties['component'] = this;			
			if(!!this.state.name){
				properties['input'] = this.state.name;
				Lawyers.findLawyers(properties, () =>{
	
				})
			}else{
				Lawyers.findLawyersWithoutInput(properties,()=>{

				})
			}
		}
		renderCountNumberOfResult(){
			if(!this.state.findOther){
				if(!!this.state.name){
					return(
						<div>Có {this.state.result.length} kết quả cho {this.state.name}</div>
					)
				}else{
					return(
						<div>Có {this.state.result.length} kết quả</div>
					)
				}
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
						
						return(	
							<div className='lawyer'>
									<img className='ava' src={element.photoURL} />
									<div className='infor'>
										<div className='name' title={element.fullname}>
											{element.fullname}
										</div>
									</div>
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
