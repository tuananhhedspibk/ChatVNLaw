import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem} from 'reactstrap';
import classNames from 'classnames';
import nav from './_nav';
import firebase from 'firebase';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';

import * as constant from '../../../constants';
import * as translate from 'counterpart';

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current_user: '',
      sideBarHeight: 0
    }
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName, props) {
    return props.location.pathname.indexOf(routeName) > -1 ?
      'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  componentWillMount() {
    console.log("sidebar")
    console.log(this.props.currentUser)
    this.setState({current_user: this.props.currentUser});
  }

  setHeight(component) {
    var vh = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);
    component.setState({sideBarHeight: vh - 55});
  }

  componentDidMount() {
    var component = this;
    this.setHeight(this);
    $(window).resize(function() {
      component.setHeight(component);
    })
  }

  render() {
    const props = this.props;
    const activeRoute = this.activeRoute;
    const handleClick = this.handleClick;

    const badge = (badge) => {
      if (badge) {
        const classes = classNames( badge.class );
        return (<Badge className={ classes } color={ badge.variant }>
          { badge.text }</Badge>)
      }
    };

    const wrapper = item => { return (!item.wrapper ? item.name :
      (React.createElement(item.wrapper.element,
        item.wrapper.attributes, item.name))) };

    const title =  (title, key) => {
      const classes = classNames( 'nav-title', title.class);
      return (<li key={key} className={ classes }>{wrapper(title)} </li>);
    };

    const divider = (divider, key) => (<li key={key} className='divider'></li>);

    const navItem = (item, key) => {
      const classes = classNames( 'nav-link', item.class);
      return (
        <NavItem key={key}>
          <NavLink to={item.url} className={ classes } activeClassName='active'>
            <i className={item.icon}></i>{translate(item.name)}{badge(item.badge)}
          </NavLink>
        </NavItem>
      )
    };

    const navDropdown = (item, key) => {
      return (
        <li key={key} className={activeRoute(item.url, props)}>
          <a className='nav-link nav-dropdown-toggle' href='#'
            onClick={handleClick.bind(this)}>
              <i className={item.icon}></i> {translate(item.name)}
          </a>
          <ul className='nav-dropdown-items'>
            {navList(item.children)}
          </ul>
        </li>)
    };

    const navLink = (item, idx) =>
      item.title ? title(item, idx) :
      item.divider ? divider(item, idx) :
      item.children ? navDropdown(item, idx)
                    : navItem(item, idx) ;

    const navList = (items) => {
      return items.map( (item, index) => navLink(item, index) );
    };
    return (
      <div className='sidebar'>
        <Scrollbars
          style={{
          height: this.state.sideBarHeight}}
          autoHide={true}
          hideTracksWhenNotNeeded={true}
          autoHideTimeout={1500}
          thumbSize={50}
          renderView={
            props =>
            <div {...props} className='custom-content'/>
          }>
          <nav className='sidebar-nav'>
            <Nav>
              <div className='user-info'>
                <img className='ava' src={constant.API_BASE_URL + this.state.current_user.avatar.url}/>
                <p className='user-name'>{this.state.current_user.displayName}</p>
              </div>
              {navList(nav.items)}
            </Nav>
          </nav>
        </Scrollbars>
      </div>
    )
  }
}

export default Sidebar;
