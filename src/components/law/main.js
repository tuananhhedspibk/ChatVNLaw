import React, { Component } from 'react';
import $ from 'jquery';

import Loading from '../shared/loading';
import NotFoundPage from '../shared/notfound';
import Nav from '../homepage/nav';
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
      error: false
		};
    // this.getNextNode = this.getNextNode.bind(this);
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
        component.setState({
          error: true,
          loading: false
        });
     });
  }
  componentDidUpdate() {
    var component = this;
    console.log(this.state)
    if (this.state.article !== '') {
      window.addEventListener('scroll',this.handleScroll);

      if(this.props.location.hash !== '') {
        var hash_position = this.props.location.hash.replace('#','');
        if ($(`a[name="${hash_position}"`).length > 0) {
          window.scrollTo(0, $(`a[name="${hash_position}"`).offset().top)
        }
      }
      $('#detail-header').on('click',function() {
        $('.article-index').hide();
        $('.sticky-col').hide();
        $('.recommend-articles').hide();
      });
      $('#art-content-header').on('click',function() {
        $('.article-index').show();
        $('.sticky-col').show();
        $('.recommend-articles').show();
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

  }

  handleScroll() {
    if (window.scrollY>= $('.nav-pills').offset().top) {
      if ($('.article-index').css('position') !== 'fixed') {
        var defaultLeft = $('.article-index').offset().left;
        var defaultHeight = $('.article-index').offset().top -$('.nav-pills').offset().top;
        var defaultWidth = $('.article-index').width() + 2;

        var defaultLeft1 = $('.sticky-col').offset().left;
        var defaultRight1 = $(window).width() - $('.sticky-col').offset().left - $('.sticky-col').outerWidth();
        var defaultHeight1 = $('.sticky-col').offset().top -$('.nav-pills').offset().top;

        var defaultLeft2 = $('.recommend-articles').offset().left;
        var defaultRight2 = $(window).width() - $('.recommend-articles').offset().left - $('.recommend-articles').outerWidth();
        var defaultHeight2 = $('.recommend-articles').offset().top -$('.nav-pills').offset().top;

        $('.article-index').css('position','fixed');
        $('.article-index').css('left', defaultLeft);  
        $('.article-index').css('top', defaultHeight); 
        $('.article-index').css('margin-top', 0);
        $('.article-index').css('width', defaultWidth);

        $('.sticky-col').css('position','fixed');
        $('.sticky-col').css('left', defaultLeft1);
        $('.sticky-col').css('right', defaultRight1);  
        $('.sticky-col').css('top', defaultHeight1);
        $('.sticky-col').css('margin-top', 0);
        $('.sticky-col').css('width', defaultWidth);

        $('.recommend-articles').css('position','fixed');
        $('.recommend-articles').css('left', defaultLeft2);
        $('.recommend-articles').css('right', defaultRight2);  
        $('.recommend-articles').css('top', defaultHeight2);
        $('.recommend-articles').css('margin-top', 0);
        $('.recommend-articles').css('width', defaultWidth);
      }
    }
    else {
      if ($('.article-index').css('position') === 'fixed') {
        $('.article-index').css('position', 'relative');
        $('.article-index').css('left', '0');
        $('.article-index').css('top', '0');
        $('.article-index').css('margin-top', 45);

        $('.sticky-col').css('position', 'relative');
        $('.sticky-col').css('left', '0');
        $('.sticky-col').css('right', '0');
        $('.sticky-col').css('top', '0');
        $('.sticky-col').css('margin-top', 45);

        $('.recommend-articles').css('position', 'relative');
        $('.recommend-articles').css('left', '0');
        $('.recommend-articles').css('right', '0');
        $('.recommend-articles').css('top', '0');
        $('.recommend-articles').css('margin-top', 20);
      }
    }
  }


	render() {
    if (this.state.loading) {
      return (<Loading />)
    }
		else if (this.state.article !== '')
			return(
				<div className='article-page'>  
					<Nav navStyle='inverse'/>
          <div className='article-page-content'>
            <div className='row'>
              <div className='col-sm-0 col-md-2 col-md-index'>
                <ArticleIndex index_html={this.state.article.index_html}/>
              </div>
              <div className='col-sm-12 col-md-8'>
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
                    <ArticleContent art_html={this.state.article.full_html} modify_arr={this.state.article.modify_arr} modified_arr={this.state.article.modified_arr} />
                  </div>
                  <div id='article_detail' className='tab-pane'>
                    <ArticleDetail detail={this.state.article.detail}/>
                  </div>
                </div>
              </div>
              <div className='col-sm-0 col-md-2 col-md-sticky'>
                <StickyHighlight />
                <Recommend articles={this.state.article.neighbors}/>
              </div>
            </div>
          </div>
				</div>
			);
		else {
      if (this.state.error) {
        return (<NotFoundPage />);
      }
	  }
  }
}

export default Article;
