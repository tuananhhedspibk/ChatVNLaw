import React, { Component } from 'react';
import Nav from '../homepage/nav';
import Footer from '../homepage/footer';

import { checkDeposit, loadCurrentUserProfile } from '../../lib/user/users';

import * as constant from '../constants';
import * as translate from 'counterpart';

import '../../assets/styles/common/payment.css';

const queryString = require('query-string');

class PaymentProcess extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: '',
            responseCode: '',
            amount: 0,
            type: '',
            beforeBalance: 0,
            trueData: false,
            loading: true   
        }
        this.getCurrentAccount = this.getCurrentAccount.bind(this);
        this.getAccountBalance = this.getAccountBalance.bind(this);
    }

    componentWillMount(){
        var component = this
        var properties = {params: queryString.parse(this.props.location.search)}
        checkDeposit(properties, (success,response) => {
            if (success) {
                component.getCurrentAccount(response.data)
            }
        });
    }

    getCurrentAccount(data) {
        var component = this;
        component.setState({ trueData: (data.true),currentUser: (data.uid)});
        if(component.state.currentUser!='' && data.true) {
            loadCurrentUserProfile((success,response) => {
                if (success) {
                    component.getAccountBalance(response.data.user_info.mn_acc.ammount);    
                }
            })
        }
        else {
            component.setState({responseCode: (queryString.parse(this.props.location.search)).vpc_TxnResponseCode,
                loading: false})
        }
    }

    getAccountBalance(data) {
        let urlParams = queryString.parse(this.props.location.search); 
        this.setState({})
        this.setState({
            responseCode: urlParams.vpc_TxnResponseCode,
            amount: parseInt(urlParams.vpc_Amount)/100,
            type: urlParams.vpc_CurrencyCode,
            beforeBalance: parseInt(data),
            loading: false          
            });
    }

    renderView(){
        if (this.state.trueData) {
            return(
                <div className='result-notification'>
                    <div className='notification-icon' id='noti-success'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                            <g className='svg'>
                                <circle cx='-250.5' cy='249.5' r='12'/>
                                <path d='M-256.46 249.65l3.9 3.74 8.02-7.8'/>
                            </g>
                        </svg>
                    </div>
                    <p className='notification-mess'>{translate('app.payment.success_deposit')} {this.state.amount} {this.state.type}</p>
                </div>
                );                        
        }
        switch(this.state.responseCode){
            case '0' :{
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite')}</p>
                    </div>
                )
                break
            }
            case '1':{
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_1')}</p>
                    </div>
                )   
                break
            }
            case '3': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_3')}</p>
                    </div>
                )
                break
            }
            case '4': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_4')}</p>
                    </div>
                )
                break
            }
            case '5': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_5')}</p>
                    </div>
                )
                break
            }
            case '6': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_6')}</p>
                    </div>
                )
                break
            }
            case '7': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_7')}</p>
                    </div>
                )
                break
            }
            case '8': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_8')}</p>
                    </div>
                )
                break
            }
            case '9': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_9')}</p>
                    </div>
                )
                break
            }
            case '10': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_10')}</p>
                    </div>
                )
                break
            }
            case '11': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_11')}</p>
                    </div>
                )
                break
            }
            case '12': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_12')}</p>
                    </div>
                )
                break
            }
            case '13': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_13')}</p>
                    </div>
                )
                break
            }
            case '21': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_21')}</p>
                    </div>                )
                break
            }
            case '99': {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_99')}</p>
                    </div>
                )
                break
            }
            default: {
                return(
                    <div className='result-notification'>
                        <div className='notification-icon' id='noti-error'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='-263.5 236.5 26 26'>
                                <g className='svg'>
                                    <circle cx='-250.5' cy='249.5' r='12'/>
                                    <path d='M-256.5 243.5 L-244.5 255.5'/>
                                    <path d='M-256.6 255.5 L-244.5 243.5'/>
                                </g>
                            </svg>
                        </div>
                        <p className='notification-mess'>{translate('app.payment.fail_deposite_default')}</p>
                    </div>
                )
            }
        }
    }

    render(){
        var view = null;
        if(this.state.loading) {
            view = (
                <div className='notification-waiting'>
                    <div className='waiting-icon'>
                        <img alt='hammer' className='hammer' src={constant.hammerIcon} />
                        <img alt='anvil' className='anvil' src={constant.anvilIcon} />
                        <img alt='ting' className='ting' src={constant.tingIcon} />
                    </div>
                    <p>{translate('app.payment.wait')}</p>
                </div>);
        }
        else {
            view = this.renderView();
        }
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
