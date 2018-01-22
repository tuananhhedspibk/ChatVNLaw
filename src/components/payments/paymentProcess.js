import React, { Component } from 'react';
import $ from 'jquery';
import { log } from 'util';
import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import axios from 'axios';
import * as constant from '../constants';
import * as translate from 'counterpart';
import '../../assets/styles/common/payment.css';

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
                <div className="result-notification">
                    <div className="notification-icon" id="noti-error">
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                            <g className="svg">
                                <circle cx="-250.5" cy="249.5" r="12"/>
                                <path d="M-256.5 243.5 L-244.5 255.5"/>
                                <path d="M-256.6 255.5 L-244.5 243.5"/>
                            </g>
                        </svg>
                    </div>
                    <p className="notification-mess">{translate('app.payment.fail_deposite')}</p>
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
                        <div className="result-notification">
                            <div className="notification-icon" id="noti-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                    <g className="svg">
                                        <circle cx="-250.5" cy="249.5" r="12"/>
                                        <path d="M-256.46 249.65l3.9 3.74 8.02-7.8"/>
                                    </g>
                                </svg>
                            </div>
                            <p className="notification-mess">{translate('app.payment.success_deposit')} {this.state.amount} {this.state.type}</p>
                        </div>
                    )
                }
                break
            }
            case "1":{
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_1')}</p>
                    </div>
                )   
                break
            }
            case "3": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_3')}</p>
                    </div>
                )
                break
            }
            case "4": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_4')}</p>
                    </div>
                )
                break
            }
            case "5": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_5')}</p>
                    </div>
                )
                break
            }
            case "6": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_6')}</p>
                    </div>
                )
                break
            }
            case "7": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_7')}</p>
                    </div>
                )
                break
            }
            case "8": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_8')}</p>
                    </div>
                )
                break
            }
            case "9": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_9')}</p>
                    </div>
                )
                break
            }
            case "10": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_10')}</p>
                    </div>
                )
                break
            }
            case "11": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_11')}</p>
                    </div>
                )
                break
            }
            case "12": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_12')}</p>
                    </div>
                )
                break
            }
            case "13": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_13')}</p>
                    </div>
                )
                break
            }
            case "21": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_21')}</p>
                    </div>                )
                break
            }
            case "99": {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_99')}</p>
                    </div>
                )
                break
            }
            default: {
                return(
                    <div className="result-notification">
                        <div className="notification-icon" id="noti-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-263.5 236.5 26 26">
                                <g className="svg">
                                    <circle cx="-250.5" cy="249.5" r="12"/>
                                    <path d="M-256.5 243.5 L-244.5 255.5"/>
                                    <path d="M-256.6 255.5 L-244.5 243.5"/>
                                </g>
                            </svg>
                        </div>
                        <p className="notification-mess">{translate('app.payment.fail_deposite_default')}</p>
                    </div>
                )
            }
        }
    }

    render(){
        var view = null;
        if(this.state.responseCode == '')
            view = (
                <div className="notification-waiting">
                    <div className="waiting-icon">
                        <img className="hammer" src={constant.hammerIcon} />
                        <img className="anvil" src={constant.anvilIcon} />
                        <img className="ting" src={constant.tingIcon} />
                    </div>
                    <p>Xin đợi trong chốc lát</p>
                </div>);
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