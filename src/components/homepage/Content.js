import React, { Component } from 'react';
import $ from 'jquery';

 class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
          location: 'Hanoi',
          area: '',
        };
    }
    
    handleAreaChange = (event) => {
        this.setState({area: event.target.value});
    };
    handleLocateChange = (event) => {
      this.setState({location : event.target.value});
    }

    render() {
        return(
            <div>
                <section className='o-a-v'>
                    <div className='vh90'>
                        <div id='particles-js'></div>
                        <div className='home-hero p-x-0'>
                            <div className='col-md-12 auto-block-center md-p-t-8 p-b-20'>
                                <div className='b-t-87' id='home-header'>
                                    <strong>
                                        Find a Lawyer
                                    </strong>
                                </div>
                                <h2 id='home-subheader'>
                                    Compare top-rated lawyers in your area and schedule a consultation in seconds
                                </h2>
                                <div className='search-find-me-lawyers-in-container'>
                                    <form action="/find_lawyer" accept-charset="UTF-8" method="post">
                                        <input name="utf8" type="hidden" value="&#x2713;" />
                                        <input type="hidden" name="authenticity_token" />
                                        <div className='search-find-me-practice-area-container b-t-87'>
                                            <div className='search-find-me-container'>
                                                Find me:
                                            </div>
                                            <div className='search-practice-area-container b-t-87'>
                                            <input type="search" name="find_lawyers[practice_area]" id="search-practice-area-field"  value={this.state.area} className="b-t-87" placeholder="Practice Area" autocomplete="off" onChange={this.handleAreaChange.bind(this)} />
                                                <span className='ensure-selected-practice-area'>
                                                    <input type="text" name="find_lawyers[parent_practice_area]" id="parent_practice_area"  className="ensure-selected-practice-area-field" oninvalid="this.setCustomValidity(&#39;You must select a practice area from the dropdown menu to browse attorneys&#39;)" required="required" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className='search-lawyers-in-location-container b-t-87'>
                                            <div className='search-lawyers-in-container'>
                                                Lawyers in:
                                            </div>
                                            <div className='search-location-container'>
                                                <input type="search" name="find_lawyers[location]" id="search-location-field" className="form-control" required="required" value={this.state.location} onChange={this.handleLocateChange.bind(this)} />
                                                <input type="hidden" name="find_lawyers[state]" id="state_param" value="Thanh Pho Ha Noi" />
                                            </div>
                                        </div>
                                        <div className='search-find-me-lawyers-in-button-container b-t-87'>
                                            <button id='search-find-me-lawyers-in-button'>
                                                <span>
                                                    Search
                                                    <i className='material-icons v-a-mid'>keyboard_arrow_right</i>
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                    <script src="https://d3autj8d5imnos.cloudfront.net/assets/places.min-4782b96eae629b61c47143b253912bd519880a4ad03cf205e1d5deecb7417103.js"></script>
                                    <script src="https://d3autj8d5imnos.cloudfront.net/assets/autocomplete.min-2a150793b1325f8e1c2e6e52456a14ea58b58042b9a1a90383292c17c10f6d8b.js"></script>
                                    <script src="https://d3autj8d5imnos.cloudfront.net/assets/algoliasearch.min-fde881cfdd294190045c79f312ad7fbf7974a74f232ba6c29610a642be0ce9ba.js"></script>
                                    <script src="https://d3autj8d5imnos.cloudfront.net/assets/attorneys_autocomplete-29902bdcdc2af6b7f22cb914d53d34d6727706a278c7b091001333b0400aa858.js"></script>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <div className='container'>
                        <div className='row m-x-0'>
                            <div className='col-md-4 text-center'>
                                <div className='CliHomeGraphic1'>
                                    <img src="https://d3autj8d5imnos.cloudfront.net/assets/Find-Logo-a505f416071622729e4afbec0ec0a335ab2cd15e2e93ef23c392b919a32ed6fc.png" alt="Find logo" />
                                </div>
                            </div>
                            <div className='col-md-4 text-center'>
                                <div className='CliHomeGraphic2'>
                                    <img src="https://d3autj8d5imnos.cloudfront.net/assets/Schedule-Logo-d2486ca9eae637b49ac886015fa09056131c548eb23fcea9d94b6d9f02b73e59.png" alt="Schedule logo" />
                                </div>
                            </div>
                            <div className='col-md-4 text-center'>
                                <div className='CliHomeGraphic3'>
                                    <img src="https://d3autj8d5imnos.cloudfront.net/assets/Connect-Logo-0aaf1807f11fe31233f9d73b74741ee2bb2f13eb1d0cfc4e7767e34c421b4de9.png" alt="Connect logo" />
                                </div>
                            </div>
                        </div>
                        <div className='row m-x-0 p-b-2'>
                            <div className='col-md-4 skinny-text'>
                                <div className='text-center CliHomeHeaderText b-t-87'>
                                    <h2>Find</h2>
                                </div>
                                <p className='p-t-2 text-center'>Browse through attorney profiles to find the right lawyer for you. All JustLegal attorneys are licensed and active.</p>
                            </div>
                            <div className='col-md-4 skinny-text'>
                                <div className='text-center CliHomeHeaderText b-t-87'>
                                    <h2>Schedule</h2>
                                </div>
                                <p className='p-t-2 text-center'>Schedule a free consultation with a local attorney in under 60 seconds today. Instantly view available timeslots in lawyers’ calendars and click to book.</p>
                            </div>
                            <div className='col-md-4 skinny-text'>
                                <div className='text-center CliHomeHeaderText b-t-87'>
                                    <h2>Connect</h2>
                                </div>
                                <p className='p-t-2 text-center'>Connect with local attorneys for initial consultations quickly and securely. JustLegal uses the most advanced video chat technology on the planet. Want to meet in-person? We do that too.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
 }

 export default Content;