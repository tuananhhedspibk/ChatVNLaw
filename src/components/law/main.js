import React, { Component } from 'react';
import $ from 'jquery';

import Loading from '../shared/loading';
import NotFoundPage from '../shared/notfound';
import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import ArticleIndex from './index';
import ArticleContent from './content';
import ArticleTopics from './topics';
import ArticleDetail from './detail';
import StickyHighlight from './sticky';
import Recommend from './recommend';

import { ax_ins } from '../../lib/constants';

import '../../assets/styles/common/articles.css';

import * as constant from '../constants';
import * as translate from 'counterpart';

class Article extends Component {
	constructor(props) {
		super(props)
		this.state = {
			article: '',
			modalOpen: false,
      painting: false,
      uid: null,
      stickies: [],
      loading: true,
      error: '',
      statusText: ''
		};
    this.getNextNode = this.getNextNode.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
	}

	componentWillMount() {
		var component = this;
    var instance = ax_ins;
    instance.get(constant.API_ARTICLES_URI + '/' + this.props.match.params.id )
      .then(function (response) {
        component.setState({article: response.data, loading: false});
      })
      .catch(function (error) {
        component.setState({error: error.response.status,
          statusText: error.response.statusText,
          loading: false})
     });
  }

  renderModal() {
    if (this.state.article !== '') {
      return(
        <div className='modal fade' id='modify-modal' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title'>
                  {translate('app.article.edit_his')}
                </h4>
              </div>
              <div className='modal-body'>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-default'
                  data-dismiss='modal'>
                    {translate('app.article.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderModifiedContent(content, title,date, law_id, law_pst) {
    var html = `<div class="modal-law-modify"> \
        <div class="modal-law-modify-date"> \
          <svg height="20" width="20"> \
            <circle cx="10" cy="10" r="8" stroke="#4ec885" stroke-width="2.5" fill="white" /> \
          </svg> \
          ${date} \
        </div> \
        <h4>Sửa đổi bởi \
          <a target="_blank" href="/articles/${law_id}#${law_pst}">${title}\
          </a>\
        </h4>\
        <h5>Nội dung : </h5>\
        <p class="modal-law-modify-content"> ${content} </p>\
      </div>`
    return html
  }

  custom_sort(a, b) {
    var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    var aDate = new Date(a.modify_law_date.replace(pattern,'$3-$2-$1')).getTime();
    var bDate = new Date(b.modify_law_date.replace(pattern,'$3-$2-$1')).getTime();
    return bDate - aDate;
  }

  renderModifyContent(val){
    var html = `<div class="modify-content-element"> \
        <a target="_blank" href="/articles/${val.id}#${val.position}">\
          <p>${val.position_name} của ${val.title} </p></a> \
          <div class="modify-content-detail">${val.content}</div>
        </div>`
    return html
  }

  componentDidUpdate() {
    var component = this;
    
    if (this.state.article !== '') {
      window.addEventListener('scroll',this.handleScroll);
      var abc = $('#article-script script').html();
      eval(abc);
      if (this.state.article.modified_arr) { 
        this.state.article.modified_arr.map((passage, index) => {
          var startNode = document.getElementsByName(passage.modified_post)[0];
          var endNode = document.getElementsByName(passage.nxt_post)[0];
          var startLoop = startNode;
          if(startNode && endNode)
            while (startLoop = component.getNextNode(startLoop, false,
              endNode, startNode, '#FFF9C4', passage.modify_laws));
        });
      }
      if (this.state.article.modify_arr) {
        this.state.article.modify_arr.map((passage, index) => {
          var modify_box = $(`.modify-box-${passage.post}`);
          if(modify_box.length) {
            $(`<div class="modified-content-${passage.post}"><div class="modified-content-body"><h5>Nội dung văn bản gốc:</h5></div> \
                <i class="fa fa-chevron-circle-right"></i></div>`).insertAfter($(modify_box));
            var box_body = $(`.modified-content-${passage.post} .modified-content-body`)
            passage.modified_laws.map((law,idx) => {
              box_body.append(component.renderModifyContent(law));
            })
          }
        });
      }

      if(this.props.location.hash !== '') {
        var hash_position = this.props.location.hash.replace('#','');
        if ($(`a[name="${hash_position}"`).length > 0) {
          window.scrollTo(0, $(`a[name="${hash_position}"`).offset().top)
        }
      }
      $('#detail-header').on('click',function() {
        $('.index').hide();
        $('.sticky-col').hide();
      });
      $('#art-content-header').on('click',function() {
        $('.index').show();
        $('.sticky-col').show();
      });
      $('a.internal_link').on('click', function(event) {
          if (this.hash !== '') {
            event.preventDefault();

            var hash = this.hash;
            var hash_position = hash.replace('#', '');
            $('html, body').animate({
              scrollTop: $(`a[name="${hash_position}"`).offset().top
            }, 1100, function(){
          
            window.location.hash = hash;
            });
          }
        });
    }

    $('.modify-text').on('click', function (event) {
      var val = $(this).data('whatever');
      val.sort(component.custom_sort)
      $('.modal .modal-body').html("");
      $('.modal .modal-body').append('<div class="timeline"></div>')
      val.map((article,index) => {
        $('.modal .modal-body').append(component.renderModifiedContent(article.content, article.modify_law_title,
            article.modify_law_date, article.modify_law_id, article.modify_law_pst));
      })
    })
    $('.fa-chevron-circle-right').on('click' ,function(event) {
      if($(this).prev().css('display') === 'none') {
        $(this).parent().css('width', '50%');
        $(this).css('transform' , 'rotate(0)');
        setTimeout(function(){
        }, 1000); 
        $(this).prev().css('display', 'block');
      }
      else {
        $(this).prev().css('display', 'none');
        $(this).parent().css('width', '0px');
        $(this).css('transform' , 'rotate(180deg)');
      }
    })
  }

  handleScroll() {
    if (window.scrollY>= $('.nav-pills').offset().top) {
      if ($('.index').css('position') !== 'fixed') {
        var defaultLeft = $('.index').offset().left;
        var defaultHeight = $('.index').offset().top -$('.nav-pills').offset().top;
        var defaultLeft1 = $('.sticky-col').offset().left;
        var defaultRight1 = $(window).width() - $('.sticky-col').offset().left - $('.sticky-col').outerWidth();
        var defaultHeight1 = $('.sticky-col').offset().top -$('.nav-pills').offset().top;

        $('.index').css('position','fixed');
        $('.index').css('left', defaultLeft);  
        $('.index').css('top', defaultHeight); 
        $('.index').css('margin-top', 0);
        $('.sticky-col').css('position','fixed');
        $('.sticky-col').css('left', defaultLeft1);
        $('.sticky-col').css('right', defaultRight1);  
        $('.sticky-col').css('top', defaultHeight1);
        $('.sticky-col').css('margin-top', 0);
      }
    }
    else {
      if ($('.index').css('position') === 'fixed') {
        $('.index').css('position', 'relative');
        $('.index').css('left','0');
        $('.index').css('top','0');
        $('.index').css('margin-top', 45);
        $('.sticky-col').css('position','relative');
        $('.sticky-col').css('left','0');
        $('.sticky-col').css('right','0');
        $('.sticky-col').css('top','0');
        $('.sticky-col').css('margin-top', 45);
      }
    }
  }

  getNextNode(node, skipChildren, endNode,skipNode, defaultColor, modalContent){
    if (endNode === node) {
      return false;
    }
    if (node.firstChild && !skipChildren) {
      return node.firstChild;
    }
    if (!node.parentNode){
      return false;
    }
    if (node !== skipNode && !node.contains(skipNode)) {
      $(node).css('background', defaultColor);
      $(node).attr('title','Phần văn bản được sửa đổi, bổ sung. Click để hiển thị chi tiết');
      $(node).attr('data-toggle','modal');
      $(node).attr('data-target','#modify-modal');
      $(node).data('whatever',modalContent);
      $(node).addClass('modify-text');
    }
    return node.nextSibling 
      || this.getNextNode(node.parentNode, true, endNode, skipNode, defaultColor,modalContent ); 
  }

	render() {
    if (this.state.loading) {
      return (<Loading />)
    }
		else if (this.state.article !== '')
			return(
				<div className='article-page'>
          {this.renderModal()}
					<Nav navStyle='inverse'/>
					<div className='row'>
						<div className='col-md-2 col-md-index'>
					    <ArticleIndex index_html={this.state.article.index_html}/>
						</div>
						<div className='col-md-8'>
							<div className='container-fluid'>
								<ul className='nav nav-pills'>
								    <li>
								    	<a id='art-content-header' href='#article_content'
                        data-toggle='tab' className='active' >
                          {translate('app.article.full_text')}
                      </a>
								    </li>
								    <li >
								    	<a id='detail-header' href='#article_detail'
                        data-toggle='tab'>
                          {translate('app.article.attr')}
                      </a>
								    </li>
								</ul>
							</div>
							<div className='tab-content'>
								<div id='article_content' className='tab-pane active'>
                  <ArticleTopics topics={this.state.article.detail.topics} />
									<ArticleContent art_html={this.state.article.full_html} />
								</div>
								<div id='article_detail' className='tab-pane'>
									<ArticleDetail detail={this.state.article.detail}/>
								</div>
							</div>
						</div>
						<div className='col-md-2 col-md-sticky'>
              <StickyHighlight />
              <Recommend articles={this.state.article.neighbors}/>
						</div>
					</div>
          <Footer/>
          <div id='article-script'>
            <script type='text/javascript'>
              $('[data-toggle="popover"]').popover();   
              $('[data-toggle="tooltip"]').tooltip(); 
            </script>
          </div>
				</div>
			);
		else {
      if (this.state.error === 404) {
        return (<NotFoundPage />);
      }
      else { 
        return (
        <div>
          <Nav navStyle='inverse'/>
          <h1 className='error-notification'>
            {this.state.errorText}
          </h1>
          <Footer/>
        </div>
        );
      }
	  }
  }
}

export default Article;
