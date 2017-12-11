import React, { Component } from 'react';
import axios from 'axios';
import * as constant from '../constants';

class TestPayment extends Component {
	componentDidMount() {
		var instance = axios.create({
			baseURL: constant.API_BASE_URL
		});
		var param = {
			amount: '1000000'
		}
		instance.get('/payments', { params: param 
		
		})
		.then(function (response) {
			console.log(response.data.url)
		})
		.catch(function (error) {
			console.log(error)
		});
	}
	render() {
		return(
			<div>
				
			</div>
		);
	}
}
export default TestPayment;