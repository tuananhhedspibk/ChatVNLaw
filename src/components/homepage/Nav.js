import React, { Component } from 'react';
import $ from 'jquery';
import * as constant from '../constants';

const firebase = require('firebase');
const userInfo = require('../../lib/helper/user/get_user_info');
var check = 0;
class Nav extends Component {
    handleKeyPress(target) {
        let value = $('#search-law').value;
        if(target.charCode==13){
            window.location  = 'search';
        }
    }
    componentWillMount(){
        //window.targetLocation = {target : 'home'}
        localStorage.setItem('target', 'home')
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                console.log(user.photoURL);
                $('#header-login-link').text(user.displayName); 
                $('#header-login-link').on('click', function(e){
                    e.preventDefault();
                    firebase.auth().signOut().then(function() {
                        // Sign-out successful.
                        console.log(user.displayName);
                        $('#header-login-link').attr('href','/login');
                        $('#header-login-link').prop('onclick',null).off('click');
                      }).catch(function(error) {
                        // An error happened.
                      });
                })
            }else{
                $('#header-login-link').text('Login'); 
                $('#header-login-link').attr('href','/login');
            }
        })
    }
    checkLogin() {
        localStorage.setItem('target', 'chat')
        if(!firebase.apps.length){
          firebase.initializeApp(constant.APP_CONFIG);  
        }
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            window.location = constant.BASE_URL + '/chat/' + firebase.auth().currentUser.displayName;
          } else {
            // No user is signed in.
            window.location = constant.BASE_URL + constant.SIGN_IN_URI;
            
            //window.targetLocation = {target : 'chat'}
            //window.location = constant.BASE_URL + '/chat/' + firebase.auth().currentUser.displayName;
          }
        });
    }
    renderView(){ 
            return(
                <div className="collapse navbar-collapse navigation-wrapper show-menu" id="headerNavigation">
                    <a href="/home"><img className="headerLogo" alt="justlegal.com" src={constant.logoHome} /></a>
                    <ul className="nav navbar-nav navbar-right headerNavList">
                        <li>
                            <input type="search"  id="search-law" placeholder="search" className = "form-control" onKeyPress={this.handleKeyPress} />
                        </li>
                        <li className="headerNavListItem">
                            <a className="headerNavListLink" href="/attorney">Browse Lawyers</a>
                        </li>
                        <li>
                            <a target="_blank" className="headerNavListLink" href="#">Support</a>
                        </li>
                        <li className="headerNavListItem">
                            <a className="headerNavListLink" onClick={this.checkLogin}>Chat</a>
                        </li>
                        <li className="avatar-list-item">
                            <a href="#" id="header-login-link">SignOut</a>
                        </li>
                        <li className="headerNavListItem closeButton">
                            <span className="headerNavListLink collapsed m-bot20 m-top0" data-toggle="collapse" data-target="#headerNavigation">
                                Close
                            </span>
                        </li>
                    </ul>
                </div>
            );
    }
    render() {
        return (
            <header id="lb-navbar" className="nav-down">
            <nav className="navbar navbar-default">
                <div className="section">
                    <button type="button" className="navbar-toggle collapsed m-t-1" data-toggle="collapse" data-target="#headerNavigation">
                        <i className="material-icons">menu</i>
                    </button>
                    <div className="headerLogoContainer">
                        <a href="#"><img className="headerLogoMobile" alt="justlegal.com" src="https://d3autj8d5imnos.cloudfront.net/assets/layouts_images/headerLogo-5f74627a57ed4a45cabead582481b4a41067add476bc3793faa8d96eb8685135.png" /></a>
                    </div>
                    {this.renderView()}
                </div>
            </nav>
        </header>
        );
    }
}

export default Nav;