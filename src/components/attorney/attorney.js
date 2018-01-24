import React, { Component } from 'react';
import * as translate from 'counterpart';

import Nav from '../../components/homepage/nav' ;
import Content from './content'
import Footer from '../../components/homepage/footer';
import Find from '../homepage/find';
import ReadMore from '../shared/readmore';
import * as constant from '../constants';

import '../../assets/styles/common/attorney.css';

const SEARCH_PARAM = 'name';

let listSpecializes = [
  'field_1', 'field_2', 'field_3',
  'field_4', 'field_5', 'field_6',
  'field_7', 'field_8'
];

class Attorney extends Component {
  constructor(props){
    super(props);   
    this.state={
      name: null
    } 
  }

  componentWillMount(){
    var params = new URLSearchParams(this.props.location.search);
    var name = params.get(SEARCH_PARAM);
    this.setState({name: name});
  }

  renderContent(){
    if(!!this.props.location.search){
      if(!!this.state.name){
        return(
          <Content name={this.state.name}/>
        )
      }
    }else{
      return(
        <Content name=''/>
      )
    }
  }

  renderFilterSpecialize() {
    return(
      <div className='items'>
        {listSpecializes.map(item => {
          return(
            <div className='item'>
              <div className='pretty p-default p-curve p-fill'>
                <input type='checkbox' />
                <div className='state p-primary'>
                  <label>
                    {translate('app.home.search_law.' + item
                      + '.title')}
                  </label>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Nav navStyle='inverse'/>
        <div className='attorney'>
          <div className='row justify-content-center'>
            <div className='col-md-3'>
              <div className='filter-section'>
                <div className='label'>
                  {translate('app.attorney.filter')}
                </div>
                <hr/>
                <div className='specialize'>
                  <div className='title'>
                    {translate('app.attorney.specialize')}
                  </div>
                  {this.renderFilterSpecialize()}
                </div>
              </div>
            </div>
            <div className='col-md-9'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='search-section'>
                    <input className='search-box'
                      placeholder={translate('app.attorney.search_placeholder')}/>
                    <button>
                      <i className='fa fa-search'
                        aria-hidden='true'></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-8'>
                  <div className='attorney-result-content'>
                    {this.renderContent()}
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='top-view'>
                    <div className='title'>
                      {translate('app.attorney.top_view')}
                    </div>
                    <hr/>
                    <div className='lawyers-list'>
                      <div className='item'>
                        <img src={constant.avaLawyerPic}/>
                        <p className='name'>
                          Bùi Tiến Dũng
                        </p>
                        <p className='intro'>
                          <ReadMore has_link={false} lines={2}>
                            Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào
                            việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được
                            sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những
                            năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để
                            tạo thành một bản mẫu văn bản. Đoạn văn bản này không những đã tồn tại
                            năm thế kỉ, mà khi được áp dụng vào tin học văn phòng, nội dung của nó
                            vẫn không hề bị thay đổi. Nó đã được phổ biến trong những năm 1960 nhờ 
                            việc bán những bản giấy Letraset in những đoạn Lorem Ipsum,
                            và gần đây hơn, được sử dụng trong các ứng dụng dàn trang,
                            như Aldus PageMaker.
                          </ReadMore>
                        </p>
                      </div>
                      <div className='item'>
                        <img src={constant.avaLawyerPic}/>
                        <p className='name'>
                          Bùi Tiến Dũng
                        </p>
                        <p className='intro'>
                          <ReadMore has_link={false} lines={2}>
                            Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào
                            việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được
                            sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những
                            năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để
                            tạo thành một bản mẫu văn bản. Đoạn văn bản này không những đã tồn tại
                            năm thế kỉ, mà khi được áp dụng vào tin học văn phòng, nội dung của nó
                            vẫn không hề bị thay đổi. Nó đã được phổ biến trong những năm 1960 nhờ 
                            việc bán những bản giấy Letraset in những đoạn Lorem Ipsum,
                            và gần đây hơn, được sử dụng trong các ứng dụng dàn trang,
                            như Aldus PageMaker.
                          </ReadMore>
                        </p>
                      </div>
                      <div className='item'>
                        <img src={constant.avaLawyerPic}/>
                        <p className='name'>
                          Bùi Tiến Dũng
                        </p>
                        <p className='intro'>
                          <ReadMore has_link={false} lines={2}>
                            Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào
                            việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được
                            sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những
                            năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để
                            tạo thành một bản mẫu văn bản. Đoạn văn bản này không những đã tồn tại
                            năm thế kỉ, mà khi được áp dụng vào tin học văn phòng, nội dung của nó
                            vẫn không hề bị thay đổi. Nó đã được phổ biến trong những năm 1960 nhờ 
                            việc bán những bản giấy Letraset in những đoạn Lorem Ipsum,
                            và gần đây hơn, được sử dụng trong các ứng dụng dàn trang,
                            như Aldus PageMaker.
                          </ReadMore>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Attorney;
