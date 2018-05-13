import React from 'react';
import {Modal, Table,
  Message, Button, Icon} from 'semantic-ui-react';

import { getChatSession, updatePayment,
  getAccountBalance } from '../../../lib/room/chatsession';
import * as Time from '../../../lib/time';
import { formatMoney } from '../../../lib/money';

import * as translate from 'counterpart';
import * as constant from '../../constants';

import '../../../assets/styles/common/chatSession.css';

class ChatSessionList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      currentUser: null,
      currentRoomId: null,
      modalOpen: false,
      modalSuccessOpen: false,
      modalFailedOpen: false,
      balance: 0,
      element : null,
    };
  }

  componentWillMount(){
    this.setState({currentUser: this.props.currentUser,
      currentRoomId : this.props.currentRoomId})
  }

  componentDidMount(){
    var tmp = [];
    var component = this;
    getChatSession(this,{}, (event, data) =>{
      switch(event){
        case 'child_added':
          var item = data.val();
          item.id = data.key;
          tmp.push(item);
          component.setState({list : tmp});
          break;
        case 'child_changed':
          tmp.every((element, index) =>{
            if(element.id === data.key){
              tmp[index] = data.val();
              tmp[index].id = data.key;
              component.setState({list: tmp})
              return false;
            }    
            return true;
          })
          break;
        case 'child_removed':
          break;
        default:
          break;
      }
    })
  }

  onClickPaymentButton(element){
    var component = this;
    getAccountBalance((success, response) => {
      if (success) {
        component.setState({
          modalOpen : true,
          balance: response.data.balance,
          element: element
        });
      }
      else {
        console.log(response);
      }
    });
  }

  payment(){
    var component = this;
    if(this.state.balance > this.state.element.cart){
      updatePayment(this, this.state.element, (success, response) => {
        if (success) {
          component.setState({
            modalOpen: false,
            modalSuccessOpen: true,
            modalFailedOpen: false
          });    
        }
        else {
          component.setState({
            modalOpen: false,
            modalSuccessOpen: false,
            modalFailedOpen: true
          });
        }
      });
    }
    else{
      this.setState({ modalOpen: false })
    }
  }

  renderSessionList(){
    return(
      this.state.list.map(element =>{
        if (element.cart > 0) {
          return(
            <div className='item-content'>
              <div className='time-start'>
                <img alt='start' src={constant.openIcon}/>
                {Time.convertDateToDay(element.startTime) +
                  ' - ' + Time.convertDateToHour(element.startTime)}
              </div>
              <div className='time-close'>
                <img alt='close' src={constant.closeIcon}/>
                {Time.convertDateToDay(element.closeTime) +
                  ' - ' + Time.convertDateToHour(element.closeTime)}
              </div>
              <div className='time-total'>
                <div className='icon-container'>
                  <i className='fa fa-clock-o' aria-hidden='true'></i>
                </div>
                {Time.convertDateToUTCSecond(element.totalTime)}
              </div>
              <div className='cart'>
                <img alt='cart' src={constant.cartIcon}/>
                {formatMoney(element.cart, 0, '.', ',')}
              </div>
              {
                !element.payment ?
                (
                  <button className='session-button payment'
                    onClick={this.onClickPaymentButton.bind(this, element)}>
                      {translate('app.chat.pay')}
                  </button>
                )
                :
                (
                  <button className='session-button paid'>
                    {translate('app.chat.paid')}
                  </button>
                )
              }
            </div>
          )
        }
      })
    )
  }

  renderModal(){
    return(
      <div>
      <Modal className='modal-confirm'
        onClose={ () =>{
          this.setState({modalOpen: false});
        }}
        open={this.state.modalOpen}
        closeIcon={false}>
        <Modal.Header>
          {translate('app.chat.pay')}
        </Modal.Header>
        <Modal.Content>
          {this.state.balance < this.state.element.cart ? 
            <Message negative>
              <Message.Header className='fix-font'>
                {translate('app.modal.error')}
              </Message.Header>
            </Message> : 
            <div></div>}
          <Table basic='very'>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <b>{translate('app.chat.account_owner')}</b>
                </Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell textAlign='center'>
                  {this.state.currentUser.displayName}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><b>{translate('app.modal.account')}</b></Table.Cell>
                <Table.Cell>{translate('app.modal.available')}</Table.Cell>
                <Table.Cell textAlign='center'>
                  {formatMoney(this.state.balance, 0, '.', ',') +
                    translate('app.modal.money_unit')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell>{translate('app.modal.payment')}</Table.Cell>
                <Table.Cell textAlign='center'>
                  {formatMoney(this.state.element.cart, 0, '.',',') +
                    translate('app.modal.money_unit')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell>{translate('app.modal.last')}</Table.Cell>
                <Table.Cell textAlign='center'>
                  {formatMoney(this.state.balance - this.state.element.cart, 0, '.', ',') +
                    translate('app.modal.money_unit')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><b>{translate('app.modal.note')}</b></Table.Cell>
                <Table.Cell className='wrap-word-table-cell'
                  colSpan='3'>{translate('app.chat.chat_session_list.phrase_1') +
                    Time.convertDateToUTCSecond(this.state.element.totalTime) +
                    ' giây ' + translate('app.chat.chat_session_list.phrase_2') +
                    Time.convertDateToDay(this.state.element.startTime) + '-' +
                    Time.convertDateToSecond(this.state.element.startTime) +
                    translate('app.chat.chat_session_list.phrase_3') +
                    Time.convertDateToDay(this.state.element.closeTime) + '-' +
                    Time.convertDateToSecond(this.state.element.closeTime)}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Content>
        {this.state.balance < this.state.element.cart ?
          <Modal.Actions>
            <Button color='red' inverted onClick={()=>{
              this.setState({modalOpen : false})}}>
              <Icon name='remove' /> {translate('app.chat.cancel')}
            </Button>
          </Modal.Actions>
          :
          <Modal.Actions>
            <Button className='fix-font' color='red' inverted onClick={()=>{
              this.setState({modalOpen : false})}}>
              <Icon name='remove' /> {translate('app.chat.cancel')}
            </Button>
            <Button className='fix-font' color='green' inverted onClick={this.payment.bind(this)}>
              <Icon name='checkmark' /> {translate('app.chat.pay')}
            </Button>
          </Modal.Actions>
        }
      </Modal>
      <Modal className='modal-confirm' size='small' onClose={() => {
        this.setState({modalSuccessOpen:false, modalOpen: false, modalFailedOpen: false});}}
        open={this.state.modalSuccessOpen}
        closeIcon={false}>
          <Modal.Content>
            {translate('app.chat.chat_session_list.process_succ')}
          </Modal.Content>
          <Modal.Actions>
            <Button className='fix-font' color='green' inverted onClick={()=>{
              this.setState({ modalSuccessOpen: false, modalOpen: false, modalFailedOpen: false })}}>
              <Icon name='checkmark' /> {translate('app.dashboard.submit_des')}
            </Button>
          </Modal.Actions>
      </Modal>
      <Modal className='modal-confirm' size='small' onClose={() => {
        this.setState({modalFailedOpen:false, modalOpen: false, modalSuccessOpen: false});}}
        open={this.state.modalFailedOpen}
        closeIcon={false}>
          <Modal.Content>
            {translate('app.chat.chat_session_list.process_failed')}
          </Modal.Content>
          <Modal.Actions>
            <Button className='fix-font' color='red' inverted onClick={()=>{
              this.setState({ modalFailedOpen: false, modalOpen: false, modalSuccessOpen: false })}}>
              <Icon name='checkmark' /> {translate('app.dashboard.submit_des')}
            </Button>
          </Modal.Actions>
      </Modal>
      </div>
    )
  }

  render(){    
    return(
      <div className='shared session-infor'>
        <button className='collapsed content-title'
          data-toggle='collapse'
					data-target='#session-chat-content'>
          {translate('app.chat.chat_session_list.title')}
        </button>
        <div className='items-list collapse'
          id='session-chat-content'>
            {this.renderSessionList()}
        </div>
        {this.state.element ? this.renderModal() : <div></div>}
      </div>
    )  
  }
}

export default ChatSessionList;
