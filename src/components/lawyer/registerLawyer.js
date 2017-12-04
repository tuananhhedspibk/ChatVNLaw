import React, { Component } from 'react';
import Nav from '../homepage/nav';
import Footer from '../homepage/footer';
import $ from 'jquery';

var firebase = require('firebase');

class registerLawyer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: '',
            uploadedFile: '',
        }
        this.renderView = this.renderView.bind(this)
    }

    componentWillMount(){
        var component = this;
        firebase.auth().onAuthStateChanged(user =>{
            if(user) {
                component.setState({
                    currentUser: user
                })
            }
        })
    }

    componentDidMount() {
        var component = this;
        var upfileBtn = document.getElementById('register-lawyer-image');
        console.log(upfileBtn)
        upfileBtn.addEventListener('change', function(e){
            var checkImage = upfileBtn.value.split('.').pop().toLowerCase();
            if($.inArray(checkImage, ['gif','png','jpg','jpeg']) == -1) {
                alert('Định dạng ảnh không đúng !');
                upfileBtn.value = ""
            }
            else{
                component.setState({uploadedFile: e.target.files[0]});
            }
        })
    }

    handleSubmit(event){
        console.log(this.state.currentUser)
        var info = []
        var name = $('#register-lawyer-name').val()
        var email = $('#register-lawyer-mail').val()
        var password = $('#register-lawyer-password').val()
        var confirmPassword = $('#register-lawyer-confirm-password').val()
        var phone = $('#register-lawyer-phone').val()
        var date = $('#register-lawyer-date').val()
        var type = $('#register-lawyer-type').val()
        var organize = $('#register-lawyer-organize').val()
        var number = $('#register-lawyer-number').val()
        var certificate = $('#register-lawyer-certificate').val()
        var experience = $('#register-lawyer-experience').val()
        var address = $('#register-lawyer-address').val()
        var sex = $('#register-lawyer-sex').find(":selected").text()
        var city = $('#register-lawyer-city').find(":selected").text()
        var country = $('#register-lawyer-country').find(":selected").text()
        var messagePassword = $('#register-lawyer-message-password');
        var message = $('#register-lawyer-message');
        
        if(password != confirmPassword){
            messagePassword.html('Mật khẩu không khớp!').css('color', 'red')
        }
        else{
            if(!name || !phone || !date || !type || ! organize || !number || !certificate || !experience || ! address) {
                message.html('Bạn hãy nhập đầy đủ thông tin !').css('color', 'red')
            }
            else{
                if(!!this.state.uploadedFile){
                    console.log("push")
                    if(!this.state.currentUser){
                        var storeageRef = firebase.storage().ref(`register-lawyer/${email}`);
                        var task = storeageRef.put(this.state.uploadedFile)
                    }
                }
                info.push({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    date: date,
                    type: type,
                    organize: organize,
                    number: number,
                    certificate: certificate,
                    experience: experience,
                    address: address,
                    sex: sex,
                    city: city,
                    country: country
                })
            }
        }
    }

    renderRegisterUser(){
        if(!this.state.currentUser)
        return(
            <div>
                <div>
                    <a>Họ và tên</a>
                    <input class="register-lawyer" id="register-lawyer-name" type="text" placeholder="Nguyễn Tiến Trường" name="name"/><br />
                    <span id="register-lawyer-message-name"></span>
                </div>
                <div>
                    email : <input class="register-lawyer" id="register-lawyer-mail" type="text" name="email" placeholder="abc@gmail.com" />
                </div>
                <div>
                    Số điện thoại : <input class="register-lawyer" id="register-lawyer-phone" type="text" name="phone" placeholder="012356" />
                </div>
                <div>
                    Mật khẩu : <input class="register-lawyer" id="register-lawyer-password" type="password" name="password" name="password" />
                    Xác nhận mật khẩu : <input class="register-lawyer" id="register-lawyer-confirm-password" type="password" name="confirm-password" name="confirm-password" />
                    <span id="register-lawyer-message-password"></span>
                </div>
            </div>
        )
    }

    renderView(){
        if(!this.state.currentUser || this.state.currentUser.role === "user"){
            return(
                <div>
                    <h4>Thông tin tài khoản</h4>
                    {this.renderRegisterUser()}
                    <div>
                        Giới tính :
                        <select class="register-lawyer" id="register-lawyer-sex">
                            <option placeholder="nam">Nam</option>
                            <option placeholder="nữ">nữ</option>
                        </select>
                    </div>
                    <div>
                        Ngày sinh : 
                        <input class="register-lawyer" id="register-lawyer-date" type="date" name="date" />
                    </div>
                    <div>
                        Lĩnh vực : 
                        <input class="register-lawyer" id="register-lawyer-type" type="text" name="linh-vuc" placeholder="hôn nhân và gia đình" />
                    </div>
                    <div>
                        Thuộc đoạn luật sư :
                        <input class="register-lawyer" id="register-lawyer-organize" type="text" name="doan-luat-su" placeholder=" Đoàn luật sư tỉnh cà mau " />
                    </div>
                    <div>
                        Số thẻ hành nghề : 
                        <input class="register-lawyer" id="register-lawyer-number" type="text" />
                    </div>
                    <div>
                        Số chứng chỉ hành nghề : 
                        <input class="register-lawyer" id="register-lawyer-certificate" type="text" name="so-chung-chi-hanh-nghe" placeholder="AX12395" />
                    </div>
                    <div>
                        Số năm kinh nghiệm : 
                        <input class="register-lawyer" id="register-lawyer-experience" type="text" name="nam-kinh-nghiem" />
                    </div>
                    <div>
                        Địa chỉ liên hệ : 
                        <input class="register-lawyer" id="register-lawyer-address" type="text" name="dia-chi" placeholder=" Đội cấn, Ba Đình, Hà Nội" />
                    </div>
                    <div>
                        Tỉnh : 
                        <select class="register-lawyer" id="register-lawyer-city">
                            <option value="1">Thành phố Hà Nội</option>
                            <option value="2">Tỉnh Hà Giang</option>
                            <option value="4">Tỉnh Cao Bằng</option>
                            <option value="6">Tỉnh Bắc Kạn</option>
                            <option value="8">Tỉnh Tuyên Quang</option>
                            <option value="10">Tỉnh Lào Cai</option>
                            <option value="11">Tỉnh Điện Biên</option>
                            <option value="12">Tỉnh Lai Châu</option>
                            <option value="14">Tỉnh Sơn La</option>
                            <option value="15">Tỉnh Yên Bái</option>
                            <option value="17">Tỉnh Hoà Bình</option>
                            <option value="19">Tỉnh Thái Nguyên</option>
                            <option value="20">Tỉnh Lạng Sơn</option>
                            <option value="22">Tỉnh Quảng Ninh</option>
                            <option value="24">Tỉnh Bắc Giang</option>
                            <option value="25">Tỉnh Phú Thọ</option>
                            <option value="26">Tỉnh Vĩnh Phúc</option>
                            <option value="27">Tỉnh Bắc Ninh</option>
                            <option value="30">Tỉnh Hải Dương</option>
                            <option value="31">Thành phố Hải Phòng</option>
                            <option value="33">Tỉnh Hưng Yên</option>
                            <option value="34">Tỉnh Thái Bình</option>
                            <option value="35">Tỉnh Hà Nam</option>
                            <option value="36">Tỉnh Nam Định</option>
                            <option value="37">Tỉnh Ninh Bình</option>
                            <option value="38">Tỉnh Thanh Hóa</option>
                            <option value="40">Tỉnh Nghệ An</option>
                            <option value="42">Tỉnh Hà Tĩnh</option>
                            <option value="44">Tỉnh Quảng Bình</option>
                            <option value="45">Tỉnh Quảng Trị</option>
                            <option value="46">Tỉnh Thừa Thiên Huế</option>
                            <option value="48">Thành phố Đà Nẵng</option>
                            <option value="49">Tỉnh Quảng Nam</option>
                            <option value="51">Tỉnh Quảng Ngãi</option>
                            <option value="52">Tỉnh Bình Định</option>
                            <option value="54">Tỉnh Phú Yên</option>
                            <option value="56">Tỉnh Khánh Hòa</option>
                            <option value="58">Tỉnh Ninh Thuận</option>
                            <option value="60">Tỉnh Bình Thuận</option>
                            <option value="62">Tỉnh Kon Tum</option>
                            <option value="64">Tỉnh Gia Lai</option>
                            <option value="66">Tỉnh Đắk Lắk</option>
                            <option value="67">Tỉnh Đắk Nông</option>
                            <option value="68">Tỉnh Lâm Đồng</option>
                            <option value="70">Tỉnh Bình Phước</option>
                            <option value="72">Tỉnh Tây Ninh</option>
                            <option value="74">Tỉnh Bình Dương</option>
                            <option value="75">Tỉnh Đồng Nai</option>
                            <option value="77">Tỉnh Bà Rịa - Vũng Tàu</option>
                            <option value="79">Thành phố Hồ Chí Minh</option>
                            <option value="80">Tỉnh Long An</option>
                            <option value="82">Tỉnh Tiền Giang</option>
                            <option value="83">Tỉnh Bến Tre</option>
                            <option value="84">Tỉnh Trà Vinh</option>
                            <option value="86">Tỉnh Vĩnh Long</option>
                            <option value="87">Tỉnh Đồng Tháp</option>
                            <option value="89">Tỉnh An Giang</option>
                            <option value="91">Tỉnh Kiên Giang</option>
                            <option value="92">Thành phố Cần Thơ</option>
                            <option value="93">Tỉnh Hậu Giang</option>
                            <option value="94">Tỉnh Sóc Trăng</option>
                            <option value="95">Tỉnh Bạc Liêu</option>
                            <option value="96">Tỉnh Cà Mau</option>
                        </select>
                    </div>
                    <div>
                        Nước : 
                        <select class="register-lawyer" id="register-lawyer-country">
                        <option value="1">Andorra</option>
                            <option value="2">United Arab Emirates</option>
                            <option value="3">Afghanistan</option>
                            <option value="4">Antigua and Barbuda</option>
                            <option value="5">Anguilla</option>
                            <option value="6">Albania</option>
                            <option value="7">Armenia</option>
                            <option value="8">Angola</option>
                            <option value="9">Antarctica</option>
                            <option value="10">Argentina</option>
                            <option value="11">American Samoa</option>
                            <option value="12">Austria</option>
                            <option value="13">Australia</option>
                            <option value="14">Aruba</option>
                            <option value="15">Åland</option>
                            <option value="16">Azerbaijan</option>
                            <option value="17">Bosnia and Herzegovina</option>
                            <option value="18">Barbados</option>
                            <option value="19">Bangladesh</option>
                            <option value="20">Belgium</option>
                            <option value="21">Burkina Faso</option>
                            <option value="22">Bulgaria</option>
                            <option value="23">Bahrain</option>
                            <option value="24">Burundi</option>
                            <option value="25">Benin</option>
                            <option value="26">Saint Barthélemy</option>
                            <option value="27">Bermuda</option>
                            <option value="28">Brunei</option>
                            <option value="29">Bolivia</option>
                            <option value="30">Bonaire</option>
                            <option value="31">Brazil</option>
                            <option value="32">Bahamas</option>
                            <option value="33">Bhutan</option>
                            <option value="34">Bouvet Island</option>
                            <option value="35">Botswana</option>
                            <option value="36">Belarus</option>
                            <option value="37">Belize</option>
                            <option value="38">Canada</option>
                            <option value="39">Cocos [Keeling] Islands</option>
                            <option value="40">Democratic Republic of the Congo</option>
                            <option value="41">Central African Republic</option>
                            <option value="42">Republic of the Congo</option>
                            <option value="43">Switzerland</option>
                            <option value="44">Ivory Coast</option>
                            <option value="45">Cook Islands</option>
                            <option value="46">Chile</option>
                            <option value="47">Cameroon</option>
                            <option value="48">China</option>
                            <option value="49">Colombia</option>
                            <option value="50">Costa Rica</option>
                            <option value="51">Cuba</option>
                            <option value="52">Cape Verde</option>
                            <option value="53">Curacao</option>
                            <option value="54">Christmas Island</option>
                            <option value="55">Cyprus</option>
                            <option value="56">Czechia</option>
                            <option value="57">Germany</option>
                            <option value="58">Djibouti</option>
                            <option value="59">Denmark</option>
                            <option value="60">Dominica</option>
                            <option value="61">Dominican Republic</option>
                            <option value="62">Algeria</option>
                            <option value="63">Ecuador</option>
                            <option value="64">Estonia</option>
                            <option value="65">Egypt</option>
                            <option value="66">Western Sahara</option>
                            <option value="67">Eritrea</option>
                            <option value="68">Spain</option>
                            <option value="69">Ethiopia</option>
                            <option value="70">Finland</option>
                            <option value="71">Fiji</option>
                            <option value="72">Falkland Islands</option>
                            <option value="73">Micronesia</option>
                            <option value="74">Faroe Islands</option>
                            <option value="75">France</option>
                            <option value="76">Gabon</option>
                            <option value="77">United Kingdom</option>
                            <option value="78">Grenada</option>
                            <option value="79">Georgia</option>
                            <option value="80">French Guiana</option>
                            <option value="81">Guernsey</option>
                            <option value="82">Ghana</option>
                            <option value="83">Gibraltar</option>
                            <option value="84">Greenland</option>
                            <option value="85">Gambia</option>
                            <option value="86">Guinea</option>
                            <option value="87">Guadeloupe</option>
                            <option value="88">Equatorial Guinea</option>
                            <option value="89">Greece</option>
                            <option value="90">South Georgia and the South Sandwich Islands</option>
                            <option value="91">Guatemala</option>
                            <option value="92">Guam</option>
                            <option value="93">Guinea-Bissau</option>
                            <option value="94">Guyana</option>
                            <option value="95">Hong Kong</option>
                            <option value="96">Heard Island and McDonald Islands</option>
                            <option value="97">Honduras</option>
                            <option value="98">Croatia</option>
                            <option value="99">Haiti</option>
                            <option value="100">Hungary</option>
                            <option value="101">Indonesia</option>
                            <option value="102">Ireland</option>
                            <option value="103">Israel</option>
                            <option value="104">Isle of Man</option>
                            <option value="105">India</option>
                            <option value="106">British Indian Ocean Territory</option>
                            <option value="107">Iraq</option>
                            <option value="108">Iran</option>
                            <option value="109">Iceland</option>
                            <option value="110">Italy</option>
                            <option value="111">Jersey</option>
                            <option value="112">Jamaica</option>
                            <option value="113">Jordan</option>
                            <option value="114">Japan</option>
                            <option value="115">Kenya</option>
                            <option value="116">Kyrgyzstan</option>
                            <option value="117">Cambodia</option>
                            <option value="118">Kiribati</option>
                            <option value="119">Comoros</option>
                            <option value="120">Saint Kitts and Nevis</option>
                            <option value="121">North Korea</option>
                            <option value="122">South Korea</option>
                            <option value="123">Kuwait</option>
                            <option value="124">Cayman Islands</option>
                            <option value="125">Kazakhstan</option>
                            <option value="126">Laos</option>
                            <option value="127">Lebanon</option>
                            <option value="128">Saint Lucia</option>
                            <option value="129">Liechtenstein</option>
                            <option value="130">Sri Lanka</option>
                            <option value="131">Liberia</option>
                            <option value="132">Lesotho</option>
                            <option value="133">Lithuania</option>
                            <option value="134">Luxembourg</option>
                            <option value="135">Latvia</option>
                            <option value="136">Libya</option>
                            <option value="137">Morocco</option>
                            <option value="138">Monaco</option>
                            <option value="139">Moldova</option>
                            <option value="140">Montenegro</option>
                            <option value="141">Saint Martin</option>
                            <option value="142">Madagascar</option>
                            <option value="143">Marshall Islands</option>
                            <option value="144">Macedonia</option>
                            <option value="145">Mali</option>
                            <option value="146">Myanmar [Burma]</option>
                            <option value="147">Mongolia</option>
                            <option value="148">Macao</option>
                            <option value="149">Northern Mariana Islands</option>
                            <option value="150">Martinique</option>
                            <option value="151">Mauritania</option>
                            <option value="152">Montserrat</option>
                            <option value="153">Malta</option>
                            <option value="154">Mauritius</option>
                            <option value="155">Maldives</option>
                            <option value="156">Malawi</option>
                            <option value="157">Mexico</option>
                            <option value="158">Malaysia</option>
                            <option value="159">Mozambique</option>
                            <option value="160">Namibia</option>
                            <option value="161">New Caledonia</option>
                            <option value="162">Niger</option>
                            <option value="163">Norfolk Island</option>
                            <option value="164">Nigeria</option>
                            <option value="165">Nicaragua</option>
                            <option value="166">Netherlands</option>
                            <option value="167">Norway</option>
                            <option value="168">Nepal</option>
                            <option value="169">Nauru</option>
                            <option value="170">Niue</option>
                            <option value="171">New Zealand</option>
                            <option value="172">Oman</option>
                            <option value="173">Panama</option>
                            <option value="174">Peru</option>
                            <option value="175">French Polynesia</option>
                            <option value="176">Papua New Guinea</option>
                            <option value="177">Philippines</option>
                            <option value="178">Pakistan</option>
                            <option value="179">Poland</option>
                            <option value="180">Saint Pierre and Miquelon</option>
                            <option value="181">Pitcairn Islands</option>
                            <option value="182">Puerto Rico</option>
                            <option value="183">Palestine</option>
                            <option value="184">Portugal</option>
                            <option value="185">Palau</option>
                            <option value="186">Paraguay</option>
                            <option value="187">Qatar</option>
                            <option value="188">Réunion</option>
                            <option value="189">Romania</option>
                            <option value="190">Serbia</option>
                            <option value="191">Russia</option>
                            <option value="192">Rwanda</option>
                            <option value="193">Saudi Arabia</option>
                            <option value="194">Solomon Islands</option>
                            <option value="195">Seychelles</option>
                            <option value="196">Sudan</option>
                            <option value="197">Sweden</option>
                            <option value="198">Singapore</option>
                            <option value="199">Saint Helena</option>
                            <option value="200">Slovenia</option>
                            <option value="201">Svalbard and Jan Mayen</option>
                            <option value="202">Slovakia</option>
                            <option value="203">Sierra Leone</option>
                            <option value="204">San Marino</option>
                            <option value="205">Senegal</option>
                            <option value="206">Somalia</option>
                            <option value="207">Suriname</option>
                            <option value="208">South Sudan</option>
                            <option value="209">São Tomé and Príncipe</option>
                            <option value="210">El Salvador</option>
                            <option value="211">Sint Maarten</option>
                            <option value="212">Syria</option>
                            <option value="213">Swaziland</option>
                            <option value="214">Turks and Caicos Islands</option>
                            <option value="215">Chad</option>
                            <option value="216">French Southern Territories</option>
                            <option value="217">Togo</option>
                            <option value="218">Thailand</option>
                            <option value="219">Tajikistan</option>
                            <option value="220">Tokelau</option>
                            <option value="221">East Timor</option>
                            <option value="222">Turkmenistan</option>
                            <option value="223">Tunisia</option>
                            <option value="224">Tonga</option>
                            <option value="225">Turkey</option>
                            <option value="226">Trinidad and Tobago</option>
                            <option value="227">Tuvalu</option>
                            <option value="228">Taiwan</option>
                            <option value="229">Tanzania</option>
                            <option value="230">Ukraine</option>
                            <option value="231">Uganda</option>
                            <option value="232">U.S. Minor Outlying Islands</option>
                            <option value="233">United States</option>
                            <option value="234">Uruguay</option>
                            <option value="235">Uzbekistan</option>
                            <option value="236">Vatican City</option>
                            <option value="237">Saint Vincent and the Grenadines</option>
                            <option value="238">Venezuela</option>
                            <option value="239">British Virgin Islands</option>
                            <option value="240">U.S. Virgin Islands</option>
                            <option value="241" selected="selected">Vietnam</option>
                            <option value="242">Vanuatu</option>
                            <option value="243">Wallis and Futuna</option>
                            <option value="244">Samoa</option>
                            <option value="245">Kosovo</option>
                            <option value="246">Yemen</option>
                            <option value="247">Mayotte</option>
                            <option value="248">South Africa</option>
                            <option value="249">Zambia</option>
                            <option value="250">Zimbabwe</option>
                        </select>
                    </div>
                    <div>
                        Ảnh đại diện : 
                        <input class="register-lawyer" id="register-lawyer-image" type="file" name="image" />
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Đăng ký thành luật sư</button>
                    </div>
                </div>
            )
        }
    }

    render(){
        return(
            <div id="register-lawyer-info">
                <Nav navStyle='inverse'/>
                <span id="register-lawyer-message"></span>
                {this.renderView()}
                <Footer />
            </div>
        )
    }
}

export default registerLawyer;