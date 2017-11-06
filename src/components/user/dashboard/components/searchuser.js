import React, {Component} from 'react';
import $ from 'jquery';

const firebase = require('firebase');

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            targetUser:'',
            result: []
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
                var arr = [];
                for(var y in data.val()){
                    var item = {
                        username: data.val()[y]['username'],
                        displayName: data.val()[y]['displayName'],
                        uid : y,
                        status: data.val()[y]['status'],
                        photoURL: data.val()[y]['photoURL']
                    };
                    arr.push(item);
                }
                component.setState({result: arr})
                
            }
            else{
                component.setState({result: []})
                $('.error-search-name').css('display', 'block');
                $('.error-search-name').text("Không tìm thấy người dùng nào!");
            }
           
        });
    }

    clickUser(data){
        
        var component = this;
        component.setState({
            targetUser: data
        })
        this.props.emitter.emit('getUserSearch',data)
    }
    renderResult(){
        if(this.state.result.length > 0){
            return(
                <div>
                    {this.state.result.map(element=>{
                        return(
                            <div>
                                <img src={element.photoURL} title={element.displayName} onClick={this.clickUser.bind(this,element)}/>
                                {/* <a onClick={this.clickUser.bind(this,element)}>{element.displayName}</a> */}
                            </div>
                        )
                    })}
                </div>             
            )
           
        }else{
            return(
                <div>
                    <p className = 'error-search-name'></p>
                </div>
            )
        }
    }

    render(){
        return (
            <div >
                <h1>search user</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" onInput={this.handleInputChange.bind(this)} />
                    <button type='submit'>Search</button>
                </form>
                {this.renderResult()}
            </div>
        )
    }
}

export default SearchUser;
