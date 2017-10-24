import React, { Component } from 'react';
import * as constant from '../constants';


import 'bootstrap/dist/css/bootstrap.css'
import '../../assets/styles/homepage/nav.css';


import $ from 'jquery'


const firebase = require('firebase');
const userInfo = require('../../lib/helper/user/get_user_info');
var check = 0;

class Nav extends Component {

    componentDidMount() {
        //handle search
        $('.search-link').on('click',function(){
            var input_group = $(this).next();
            $('.input-group:visible').children('input').css('width','10px');
            $('.input-group:visible').hide();
            $('.search-link:hidden').css('display','block');
            $(this).css('display','none');
            input_group.fadeIn(600);
            input_group.css('display','flex');
            $(input_group).children('input').css('width','200px');
        });
        $('.remove-btn').on('click',function(){
            var input_group = $(this).parents('.input-group');
            input_group.hide();
            $(input_group).children('input').css('width','10px');
            $(input_group).prev().css('display','block'); 
        });
    }
    componentWillMount(){
        //window.targetLocation = {target : 'home'}
        //
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
            userInfo.getUserName(user, function(result){
                  window.location = constant.BASE_URL+ '/chat/' + result;                 
              })
          } else {
            // No user is signed in.
            window.location = constant.BASE_URL + constant.SIGN_IN_URI;
          }
        });
    }
    renderView(){ 
            return(
                <nav className="navbar navbar-default">
                        <div className="navbar-header">
                            <a href="/home"><img className="navbar-brand" src={constant.logoHome} /></a>
                        </div>
                        <ul className="nav navbar-nav navbar-right headerNavList">
                            <li className="headerNavListItem search-inputgroup">
                                <a className="search-link" role="button">Browse Law</a>
                                <div className="input-group">
                                  <input type="text" className="form-control" />
                                  <div className="input-group-btn">
                                   <button className="btn btn-primary" type="submit">
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                    <button className="btn btn-primary remove-btn">
                                        <span className="glyphicon glyphicon-remove"></span>
                                    </button>
                                  </div>
                                </div>
                            </li>
                            <li className="headerNavListItem search-inputgroup">
                                <a className="search-link" role="button">Browse Lawyers</a>
                                <div className="input-group">
                                      <input type="text" className="form-control" />
                                      <div className="input-group-btn">
                                       <button className="btn btn-primary" type="submit">
                                            <span className="glyphicon glyphicon-search"></span>
                                        </button>
                                        <button className="btn btn-primary remove-btn">
                                            <span className="glyphicon glyphicon-remove"></span>
                                        </button>
                                      </div>
                                </div>
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
                        </ul>
                </nav>
            );
    }
    render() {
        return (
            <div className="header-nav">
                    {this.renderView()}
        </div>
        );
    }
}

export default Nav;
