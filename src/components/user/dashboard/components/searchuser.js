import React, {Component} from 'react';
import $ from 'jquery';

const firebase = require('firebase');

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            targetUser:''
        }
    }

    handleInputChange(evt){
        var component = this;
        const target = evt.target;
        const value = target.value;
        this.setState({
            userName: value
        })
    }

    handleSubmit(evt) {
        var component = this;
        evt.preventDefault();
        var ref = firebase.database().ref(`users`).orderByChild('displayName').equalTo(this.state.userName).once('value', (data)=> {
            if(data.val() !== null){
                for(var y in data.val()){
                    // console.log(data.val()[y].photoURL)
                    $('.error-search-name').css('display', 'none');
                    $('.img-user-search').css('display', 'block');
                    $('.img-user-search').attr("src", data.val()[y].photoURL);
                    $('.img-user-search').attr("title", data.val()[y].displayName);
                    $('.img-user-search').click(function(){
                        let item = {};
                        item['uid'] = y;
                        for(var z in data.val()[y]){
                            item[z] = data.val()[y][z]
                        }
                        
                        component.clickUser(item);
                    });
                }
            }
            else{
                $('.error-search-name').css('display', 'block');
                $('.img-user-search').css('display', 'none');
                $('.error-search-name').text("Không tìm thấy người dùng nào!");
            }
           
        });
    }

    clickUser(data){
        console.log(data);
        var component = this;
        component.setState({
            targetUser: data
        })
        this.props.emitter.emit('getUserSearch',data)
    }

    render(){
        return (
            <div >
                <h1>search user</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" onInput={this.handleInputChange.bind(this)} />
                    <button type='submit'>Search</button>
                </form>
                <div className='chat-user-search active-link'>
                    <img className='img-user-search' />
                    <p className='error-search-name'></p>
                </div>
            </div>
        )
    }
}
export default SearchUser;