import React, { Component } from 'react';
import $ from 'jquery';
import { log } from 'util';
import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import axios from 'axios';
import * as constant from '../constants';

const queryString = require('query-string');
const firebase = require('firebase');

class PaymentProcess extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: '',
            responseCode: '',
            amount: 0,
            type: '',
            beforeBalance: 0,
            trueData: false   
        }
        this.getCurrentAccount = this.getCurrentAccount.bind(this);
        this.getAccountBalance = this.getAccountBalance.bind(this);

    }

    componentWillMount(){
        var component = this
        var instance = axios.create({
            baseURL: constant.API_BASE_URL
        });
        
        instance.get('/checkpayment', { params:  queryString.parse(this.props.location.search)
        })
        .then( function (response) {
            component.getCurrentAccount(response.data)
            return;
        })
        .catch( function (error) {
        });
        
    }
    getCurrentAccount(data) {
        var component = this;
        component.setState({ trueData: (data.true),currentUser: (data.uid)});
        if(component.state.currentUser!='') {
            firebase.database().ref(`moneyAccount/${component.state.currentUser}`).once('value', function(data){ 
                console.log(data.val())
                if(data.val() != null)
                    component.getAccountBalance(data.val().amount)
                else
                    component.getAccountBalance(0)
                })
        }
    }
    getAccountBalance(data) {
        let urlParams = queryString.parse(this.props.location.search); 
        this.setState({beforeBalance: parseInt(data)})
        this.setState({
            responseCode: urlParams.vpc_TxnResponseCode,
            amount: parseInt(urlParams.vpc_Amount)/100,
            type: urlParams.vpc_CurrencyCode          
            });
    }
    renderView(){
        var component = this
        if (!this.state.trueData) {
            return(
                <div>
                    Giao dịch không tồn tại.
                </div>
                );                        
        }
        switch(this.state.responseCode){
            case "0" :{
                if(!!component.state.currentUser){
                    firebase.database().ref(`moneyAccount/${component.state.currentUser}`).set({
                        amount: (component.state.amount + component.state.beforeBalance)
                    })
                    var ref = firebase.database().ref().child(`depositeHistory/${component.state.currentUser}`).push();
                    var d = new Date();
                    var currentTime =d.toDateString() +' '+ d.toTimeString();
                    ref.set({
                        amount: component.state.amount,
                        beforeAmount: component.state.beforeBalance,
                        type: component.state.type,
                        date: currentTime
                    });
                    return(
                        <div>
                            Chúc mừng bạn đã thanh toán thành công {this.state.amount} {this.state.type}
                        </div>
                    )
                }
                break
            }
            case "1":{
                return(
                    <div>
                        Ngân hàng từ chối giao dịch - Bank Declined
                    </div>
                )   
                break
            }
            case "3": {
                return(
                    <div>
                        Mã đơn vị không tồn tại - Merchant not exist
                    </div>
                )
                break
            }
            case "4": {
                return(
                    <div>
                        Không đúng access code - Invalid access code
                    </div>
                )
                break
            }
            case "5": {
                return(
                    <div>
                        Số tiền không hợp lệ - Invalid amount
                    </div>
                )
                break
            }
            case "6": {
                return(
                    <div>
                        Mã tiền tệ không tồn tại - Invalid currency code"
                    </div>
                )
                break
            }
            case "7": {
                return(
                    <div>
                        Lỗi không xác định - Unspecified Failure 
                    </div>
                )
                break
            }
            case "8": {
                return(
                    <div>
                        Số thẻ không đúng - Invalid card Number
                    </div>
                )
                break
            }
            case "9": {
                return(
                    <div>
                        Tên chủ thẻ không đúng - Invalid card name
                    </div>
                )
                break
            }
            case "10": {
                return(
                    <div>
                        Thẻ hết hạn/Thẻ bị khóa - Expired Card
                    </div>
                )
                break
            }
            case "11": {
                return(
                    <div>
                        Thẻ chưa đăng ký sử dụng dịch vụ - Card Not Registed Service(internet banking)
                    </div>
                )
                break
            }
            case "12": {
                return(
                    <div>
                        Ngày phát hành/Hết hạn không đúng - Invalid card date
                    </div>
                )
                break
            }
            case "13": {
                return(
                    <div>
                        Vượt quá hạn mức thanh toán - Exist Amount
                    </div>
                )
                break
            }
            case "21": {
                return(
                    <div>
                        Số tiền không đủ để thanh toán - Insufficient fund
                    </div>
                )
                break
            }
            case "99": {
                return(
                    <div>
                        Người sủ dụng hủy giao dịch - User cancel
                    </div>
                )
                break
            }
            default: {
                return(
                    <div>
                        Giao dịch thất bại - Failured
                    </div>
                )
            }
        }
    }

    render(){
        var view = null;
        if(this.state.responseCode == '')
            view = (<p>Xin đợi trong chốc lát</p>);
        else
            view = this.renderView();
        return(
            <div>
                <Nav navStyle='inverse'/>
                {view}
                <Footer />
            </div>
        )
    }
}

export default PaymentProcess;