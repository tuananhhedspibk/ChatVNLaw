import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import NotFoundPage from '../shared/notfound';

import Nav from '../homepage/nav';
import ArticleIndex from './index';
import ArticleContent from './content';
import ArticleDetail from './detail';
import StickyHighlight from './sticky';
import '../../assets/styles/common/articles.css'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import * as constant from '../constants';

const firebase = require('firebase');

class Article extends Component {
	constructor(props) {
		super(props)
		this.state = {
			article: '',
			modalOpen: false,
      painting: false,
      uid: null,
      stickies: []
		};
		this.handleSticky  = this.handleSticky.bind(this);
    this.handleOpenModal  = this.handleOpenModal.bind(this);
    this.handleCloseModal  = this.handleCloseModal.bind(this);
    this.handleSaveSticky = this.handleSaveSticky.bind(this);
    this.getNextNode = this.getNextNode.bind(this);
    this.handleCancelSticky = this.handleCancelSticky.bind(this);
    this.pushHighlight = this.pushHighlight.bind(this);
    this.extractStykies = this.extractStykies.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleStickyOff = this.handleStickyOff.bind(this);
	}


	componentWillMount() {
		var component = this;
		var instance = axios.create({
	      baseURL: constant.API_BASE_URL
	    });
		instance.get(constant.API_ARTICLES_URI+'/'+ this.props.match.params.id )
	    .then(function (response) {
	    	component.setState({article: response.data});
	    })
	    .catch(function (error) {
	    	if (error.response.status == 404) {
	    		component.setState({error: 404})
	    	}
	    	else {
	    		component.setState({error: error.response.status,errorText: error.response.statusText})
	    	}
			});
    if(!firebase.apps.length){
          firebase.initializeApp(constant.APP_CONFIG);
      }
      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        component.setState({uid: user.uid});
        component.extractStykies();
      } else {
        window.location = constant.BASE_URL + constant.SIGN_IN_URI
      }
    });
	}
  componentDidUpdate() {
    window.addEventListener('scroll',this.handleScroll);
    $(".internal_link").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();

        var hash = this.hash;
        console.log(hash);

        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 1100, function(){
      
        window.location.hash = hash;
        });
      }
    });
    $('#detail-header').on('click',function() {
      console.log(1);
      $('.index').hide();
      $('.sticky-col').hide();
    });
    $('#art-content-header').on('click',function() {
      console.log(2);
      $('.index').show();
      $('.sticky-col').show();
    });
  }

  handleScroll() {
    if (window.scrollY>= $('.nav-pills').offset().top) {
      if ($('.index').css('position') != 'fixed') {
        var defaultLeft = $('.index').offset().left;
        var defaultHeight = $('.index').offset().top -$('.nav-pills').offset().top;
        var defaultLeft1 = $('.sticky-col').offset().left;
        var defaultRight1 =$(window).width() - $('.sticky-col').offset().left - $('.sticky-col').outerWidth();
        var defaultHeight1 = $('.sticky-col').offset().top -$('.nav-pills').offset().top;
        console.log(defaultRight1)
        console.log($(window).width())
        console.log($('.sticky-col').outerWidth())
        console.log($('.sticky-col').offset().left)
        $('.index').css('position','fixed');
        $('.index').css('left',defaultLeft);  
        $('.index').css('top',defaultHeight); 
        $('.index').css('margin-top',0);
        $('.sticky-col').css('position','fixed');
        $('.sticky-col').css('left',defaultLeft1);
        $('.sticky-col').css('right',defaultRight1);  
        $('.sticky-col').css('top',defaultHeight1); 
        $('.sticky-col').css('margin-top',0);
      }
    }
    else {
      if ($('.index').css('position') == 'fixed') {
        $('.index').css('position','relative');
        $('.index').css('left','0');
        $('.index').css('top','0');
        $('.index').css('margin-top',70);
        $('.sticky-col').css('position','relative');
        $('.sticky-col').css('left','0');
        $('.sticky-col').css('right','0');
        $('.sticky-col').css('top','0');
        $('.sticky-col').css('margin-top',70);

        // $('.boundary-index').css('top','none');
      }
    }
  }
  extractStykies() {
    var component = this;
    firebase.database().ref(`stickies/${this.state.uid}/${this.props.match.params.id}`).once('value', function(data){
      var stickies = [];
      data.forEach(function(childSnapshot) {
        var data = childSnapshot.val();
        var defaultColor = data.color;
        var key = childSnapshot.key;
        var title = data.title;
        var sticky = {
          dup: data.dup,
          title: title,
          key: key,
          color: defaultColor
        };
        stickies.push(sticky);
        if(data.dup == 1) {
          var childPost = data.position;
          var element = $('.law-content');
          while (childPost.child) {
            element = element.children().eq(childPost.indexChild);
            childPost = childPost.child;
          }
          element = element.children().eq(childPost.indexHighlight);
          var htmlElement = element.html();
          htmlElement = [htmlElement.slice(0, childPost.offsetStart),'<span class="selecting-dup">', htmlElement.slice(childPost.offsetStart)].join('');
          htmlElement = [htmlElement.slice(0, childPost.offsetEnd),'</span>', htmlElement.slice(childPost.offsetEnd)].join('');
          element.html(htmlElement);
          var hightlightElement =  $('.selecting-dup');
          hightlightElement.prop('title', title);
          hightlightElement.addClass(`sticky-${key}`);
          hightlightElement.attr('id',`sticky-${key}`)
          hightlightElement.css('background',defaultColor);
          hightlightElement.removeClass('selecting-dup');
        }
        else {
          var childPost = data.positionStart;
          var element = $('.law-content');
          while (childPost.child) {
            element = element.children().eq(childPost.indexChild);
            childPost = childPost.child;
          }
          element = element.children().eq(childPost.indexHighlight);
          var htmlElement = element.html();
          htmlElement = [htmlElement.slice(0, childPost.offsetStart),'<span class="selecting-start">', htmlElement.slice(childPost.offsetStart)].join('');
          htmlElement = [htmlElement.slice(0, childPost.offsetEnd),'</span>', htmlElement.slice(childPost.offsetEnd)].join('');
          element.html(htmlElement);
          var elementHighlight =  $('.selecting-start');
          elementHighlight.prop('title', title);
          elementHighlight.addClass(`stickyS-${key}`);
          elementHighlight.attr('id',`sticky-${key}`)
          elementHighlight.css('background',defaultColor);
          elementHighlight.removeClass('selecting-start');

          var childPost = data.positionEnd;
          var element = $('.law-content');
          while (childPost.child) {
            element = element.children().eq(childPost.indexChild);
            childPost = childPost.child;
          }
          element = element.children().eq(childPost.indexHighlight);
          var htmlElement = element.html();
          htmlElement = [htmlElement.slice(0, childPost.offsetStart),'<span class="selecting-end">', htmlElement.slice(childPost.offsetStart)].join('');
          htmlElement = [htmlElement.slice(0, childPost.offsetEnd),'</span>', htmlElement.slice(childPost.offsetEnd)].join('');
          element.html(htmlElement);
          var elementHighlight =  $('.selecting-end');
          elementHighlight.prop('title', title);
          elementHighlight.addClass(`stickyE-${key}`);
          elementHighlight.css('background',defaultColor);
          elementHighlight.removeClass('selecting-end');
          var startNode = document.getElementsByClassName(`stickyS-${key}`)[0];
          var endNode = document.getElementsByClassName(`stickyE-${key}`)[0];
          var startLoop = startNode;
          while (startLoop = component.getNextNode(startLoop, false , endNode,startNode,defaultColor));
        }
      });
      component.setState({stickies:stickies});
    })
  }
  pushHighlight(newValue) {
    var ref = firebase.database().ref().child(`stickies/${this.state.uid}/${this.props.match.params.id}`).push();
    ref.set(newValue);
    return ref.key;
  }

  handleOpenModal() {
    this.setState({modalOpen: true});
  }

  handleCloseModal() {
    this.setState({modalOpen: false});
    this.handleStickyOff();
  }

  getNextNode(node, skipChildren, endNode,skipNode, defaultColor){
  
      if (endNode == node) {
        return false;
      }
      if (node.firstChild && !skipChildren) {
        return node.firstChild;
      }
      if (!node.parentNode){
        return false;
      }
      if (node != skipNode && !node.contains(skipNode)) {
        $(node).css('background', defaultColor);
      }
      return node.nextSibling 
             || this.getNextNode(node.parentNode, true, endNode, skipNode, defaultColor); 
  }
  getPositionSticky(className) {
    var dup = document.getElementsByClassName(className);
    var firstParent = $(dup).parent();
    var offsetStart = firstParent.html().indexOf(`<span class="${className}">`);
    console.log(`<span class="${className}">`)
    console.log(firstParent.html())
    console.log(offsetStart)
    var offsetEnd = firstParent.html().indexOf('</span>');
    var dupIndex = firstParent.parent().children().index(firstParent);
    var index = { indexHighlight: dupIndex,
      offsetStart: offsetStart,
      offsetEnd: offsetEnd};
    while(!firstParent.parent().is($('.law-content'))) {
      firstParent = firstParent.parent();
      var indexChild = firstParent.parent().children().index(firstParent);
      index = {
        indexChild: indexChild,
        child: index
      }
    }
    return index;
  }
  handleStickyOff() {
    this.setState({
      painting: false
    });
    $('#article_content').unbind();
    $('#article_content').css('cursor', 'default');
  }
  handleSaveSticky() {
    var defaultColor = $('input[name="opt-radio-color"]:checked').val();
    var dup = document.getElementsByClassName('selecting-dup');
    var index;
    var title = $('#exampleInputEmail1').val();
    title = title == '' ? 'Tiều đề' : title;
    var dupStatus = 0;
    if (dup.length) {
      dupStatus = 1;
      var index = this.getPositionSticky('selecting-dup');
      index = {
        title: title,
        position: index,
        color: defaultColor,
        dup: 1
      }
      var key = this.pushHighlight(index);
      $(dup).css('background',defaultColor);
      $(dup).addClass(`sticky-${key}`);
      $(dup).attr('id',`sticky-${key}`);
      $(dup).removeClass('selecting-dup');
    }
    else {
      var startNode = document.getElementsByClassName("selecting-start");
      var endNode = document.getElementsByClassName("selecting-end");
      var indexStart = this.getPositionSticky('selecting-start')
      var indexEnd = this.getPositionSticky('selecting-end')
      index = {
        title: title,
        positionStart: indexStart,
        positionEnd: indexEnd,
        color: defaultColor,
        dup: 0
      }
      var key = this.pushHighlight(index);
      
      var startLoop = startNode[0];
      $(startNode).css("background",defaultColor);
      $(endNode).css("background",defaultColor);
      while (startLoop = this.getNextNode(startLoop, false , endNode[0],startNode[0],defaultColor));
      $(startNode).attr('id',`sticky-${key}`);
      $(startNode).addClass(`stickyS-${key}`);
      $(startNode).removeClass("selecting-start");
      $(endNode).addClass(`stickyE-${key}`);
      $(endNode).removeClass("selecting-end");
    }
    var stickies = this.state.stickies;
    var newStick = {
      color: defaultColor,
      dup: dupStatus,
      key: key,
      title: title
    }
    stickies.push(newStick);
    this.setState({stickies:stickies});
    this.handleCloseModal();
  }
  handleCancelSticky() {
    var dup = document.getElementsByClassName("selecting-dup");
    if (dup.length > 0) {
      var h = $(dup).parent().html();
      h = h.replace('<span class="selecting-dup">',"");
      h = h.replace('</span>',"");
      $(dup).parent().html(h);
    }
    else {
      var startNode = document.getElementsByClassName("selecting-start");
      var endNode = document.getElementsByClassName("selecting-end");
      var h = $(startNode).parent().html();
      h = h.replace('<span class="selecting-start">',"");
      h = h.replace('</span>',"");
      $(startNode).parent().html(h);
      var h = $(endNode).parent().html();
      h = h.replace('<span class="selecting-end">',"");
      h = h.replace('</span>',"");
      $(endNode).parent().html(h);
    }
    $('.container-fluid')[0].click(function(){
     }); 
    this.handleCloseModal();
  }

	handleSticky() {
    var component = this;
    this.setState({
      painting: true
    });
		$('#article_content').css('cursor', `url(${constant.pencilCursorPic}), auto`);
		$('#article_content').bind("mouseup",function(){
      var rangeSelected = window.getSelection();
      if (!rangeSelected.isCollapsed) {
        console.log(rangeSelected);
        
        var startNode = rangeSelected.anchorNode;
        var endNode = rangeSelected.focusNode;
        var startOffset = rangeSelected.anchorOffset;
        var endOffset = rangeSelected.focusOffset;
        // var endEl;
        // if (endOffset == 0)
        //   endEl = $(endNode).prev();
        // else 
        //   endEl = $(endNode).parent()
        // var startEl = $(startNode).parent();
        var startLoop = startNode;
        // if (endOffset == 0) {
        //   console.log("test")
        //   console.log(endNode)
        //   endNode = endNode.previousElementSibling;
        //   endOffset = endNode.textContent.length;
        //   console.log(startNode)
        //   console.log(endNode)
        //   console.log(startNode == endNode)
        //   console.log(endNode.contains(startNode))
        //   console.log("test")

        //   }
        if (endNode != startNode) {
          var range = document.createRange();
          range.setStart(startNode,startOffset);
          range.setEnd(startNode,startNode.textContent.length);
          var extractSelected =range.extractContents();
          var span = document.createElement("span");
          span.className = "selecting-start";
          span.appendChild(extractSelected);
          range.insertNode(span);

          var range = document.createRange();
          range.setStart(endNode,0);
          range.setEnd(endNode, endOffset);         
          var extractSelected =range.extractContents();
          var span = document.createElement("span");
          span.className = "selecting-end";
          span.appendChild(extractSelected);
          range.insertNode(span);
        }
        else {
          var range = document.createRange();
          range.setStart(startNode,startOffset);
          range.setEnd(startNode,endOffset);
          var extractSelected =range.extractContents();
          var span = document.createElement("span");
          span.className = "selecting-dup";
          span.appendChild(extractSelected);
          range.insertNode(span);
        }
          // var r =  rangeSelected.getRangeAt(0)
          // var extractSelected =r.extractContents();
          // var span = document.createElement("span");
          // span.style.backgroundColor = "green";
          // span.className = "selecting-sticky";
          // span.appendChild(extractSelected);
          // r.insertNode(span);
          // startEl.wrapInner( "<span class='start-hl'></span>" );
          // endEl.wrapInner( "<span class='end-hl'></span>" );
        component.handleOpenModal();
      }
		});
	}
	

	render() {
		if (this.state.error != null) {
			console.log(this.state)
			if (this.state.error == 404) {
				return (<NotFoundPage />);
      }
			else { 
        return (
				<div>
					<Nav navStyle='inverse'/>
					<h1 className="error-notification">{this.state.errorText}</h1>
				</div>
				);
      }
		}
		else if (this.state.article != '')
			return(
				<div className='article-page'>
					<Nav navStyle='inverse'/>
					<div className="row">
						<div className="col-md-2 col-md-index">
					    <ArticleIndex index_html={this.state.article.index_html}/>
						</div>
						<div className="col-md-8">
							<div className="container-fluid">
								<ul className="nav nav-pills">
								    <li>
								    	<a id='art-content-header' href="#article_content" data-toggle="tab" className="active" >Toàn văn</a>
								    </li>
								    <li >
								    	<a id='detail-header' href="#article_detail" data-toggle="tab">Thuộc tính</a>
								    </li>
								</ul>
							</div>
							<div className="tab-content">
								<div id="article_content" className="tab-pane active">
									<ArticleContent art_html={this.state.article.full_html} />
								</div>
								<div id="article_detail" className="tab-pane">
									<ArticleDetail detail={this.state.article.detail}/>
								</div>
							</div>
						</div>
						<div className="col-md-2 col-md-sticky">
							<StickyHighlight stickies={this.state.stickies} painting={this.state.painting} handleSticky={this.handleSticky} handleStickyOff={this.handleStickyOff}/>
						</div>
					</div>
					<Modal 
            onClose={this.handleCloseModal}
            open={this.state.modalOpen}
            closeOnDimmerClick={false}
            id='confirm-sticky' basic size='small'>
            <Header icon='pin' content="Thêm đánh dấu"/>
            <Modal.Content>
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Tiêu đề</label>
                  <input type="text" className="form-control" id="exampleInputEmail1" autoFocus placeholder="Tiêu đề ..." required/>
                  <div className="radio">
                    <label><input type="radio" defaultChecked name="opt-radio-color" value="#d5ffb3"/><div style={{background : '#d5ffb3'}} className="opt-color"></div></label>
                  </div>
                  <div className="radio">
                    <label><input type="radio" name="opt-radio-color" value="#ffff99"/><div style={{background : '#ffff99'}} className="opt-color"></div></label>
                  </div>
                  <div className="radio">
                    <label><input type="radio" name="opt-radio-color" value="#FFCDD2"/><div style={{background : '#FFCDD2'}} className="opt-color"></div></label>
                  </div>
                </div>
              </form>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='red' inverted onClick={this.handleCancelSticky}>
                <Icon name='remove' /> Hủy
              </Button>
              <Button color='green' inverted onClick={this.handleSaveSticky}>
                <Icon name='checkmark' /> Lưu
              </Button>
            </Modal.Actions>
          </Modal>
				</div>
			);
		else
			return(
				<div>
				</div>
				);

	}
}

export default Article;
