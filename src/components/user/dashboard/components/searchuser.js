import React, {Component} from 'react';
import $ from 'jquery';

const firebase = require('firebase');

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
<<<<<<< HEAD
            targetUser:''
=======
            targetUser:'',
            result: []
>>>>>>> search username
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
                    var item = {};
                    item['uid'] = y;
                    for(var z in data.val()[y]){
                        item[z] = data.val()[y][z]
                    }
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
        console.log(data);
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