import React, { Component } from 'react';
import $ from 'jquery';
import * as translate from 'counterpart';

class ArticleContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			full_html: ''
		}
	}

	componentDidMount() {
		var full_html = this.props.art_html;
		var component = this;
		if (this.props.modified_arr) { 
      this.props.modified_arr.map((passage, index) => {
        var startNode = document.getElementsByName(passage.modified_post)[0];
        var endNode = document.getElementsByName(passage.nxt_post)[0];
        var startLoop = startNode;
        if(startNode && endNode)
          while (startLoop = component.getNextNode(startLoop, false,
            endNode, startNode, '#FFF9C4', passage.modify_laws));
        });
    }
    if (this.props.modify_arr) {
      this.props.modify_arr.map((passage, index) => {
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
        $(this).prev().css('display', 'block');
      }
      else {
        $(this).prev().css('display', 'none');
        $(this).parent().css('width', '0px');
        $(this).css('transform' , 'rotate(180deg)');
      }
    })
		var abc = $('#article-script script').html();
    eval(abc);
    setTimeout(function(){
      var abc = $('#article-script script').html();
      eval(abc); 
      console.log("DONE")
     }, 4000);
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

  renderModal() {
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

	render() {
		return (
			<div className='article-content'>
				{this.renderModal()}
				<div className='law-content'
					dangerouslySetInnerHTML={{ __html: this.props.art_html}} />
	          <div id='article-script'>
	            <script type='text/javascript'>
	              $('[data-toggle="popover"]').popover();   
	              $('[data-toggle="tooltip"]').tooltip(); 
	            </script>
          </div>
			</div>
		);	
	}
}

export default ArticleContent;
