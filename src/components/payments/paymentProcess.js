import React, { Component } from 'react';
import $ from 'jquery';
import firebase from 'firebase';
import { log } from 'util';
import Nav from '../homepage/nav';
import Footer from '../homepage/footer';

const queryString = require('query-string');

class PaymentProcess extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: '',
            responseCode: '',
            amount: '',
            type: ''
        }
    }

    componentWillMount(){
        var component = this
        firebase.auth().onAuthStateChanged(function(user) {
            if(user){
                component.setState({
                    currentUser: user
                })
            }
        })
    }

    componentDidMount(){
        var component = this
        let urlParams = queryString.parse(this.props.location.search); 
        component.setState({
            responseCode: urlParams.vpc_TxnResponseCode,
            amount: urlParams.vpc_Amount,
            secureHash: urlParams.vpc_SecureHash,
            type: urlParams.vpc_CurrencyCode          
        })
    }

    renderView(){
        var component = this
        switch(this.state.responseCode){
            case "0" :{
                if(!!component.state.currentUser){
                    firebase.database().ref(`moneyAccount/${component.state.currentUser.uid}`).set({
                        amount: component.state.amount,
                        type: component.state.type
                    })
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
        return(
            <div>
                <Nav navStyle='inverse'/>
                {this.renderView()}
                <Footer />
            </div>
        )
    }
}

export default PaymentProcess;