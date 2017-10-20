import React, { Component } from 'react';
import '../../components/homepage/App.min.css';

class Content extends Component {
  render() {
    return (
        <div className='index-background'>
            <div className='container index-container'>
                <div className='col-sm-3 index-filters'>
                    <div className='row index-filters-header'>
                        Advanced Search Filters
                    </div>
                    <div className='row' id='facets'>
                        <div className='index-filter-sub-header m-t-1'>
                            Sort By
                        </div>
                        <div className='index-sort-by' id='sort-by'></div>
                        <div id='area_of_laws'></div>
                        <div id='specialties'></div>
                        <div id='price_types'></div>
                        <div id='price_structures'></div>
                        <div id='states_licensed_in'></div>
                        <div id='firm_names'></div>
                    </div>
                </div>
                <div className='col-md-9 col-xs-12 p-zero'>
                    <div className='p-x-h row'>
                        <div className='col-xs-12 index-search-container p-x-0 m-b-1 material-box-shadow'>
                            <div className='index-search-bar-icon'>
                                <div className='material-icons'>search</div>
                            </div>
                            <div className='index-search-bar-input-container'>
                                <div id='q'></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12' id='index-search-stats'>
                        <div className = 'ais-root ais-stats'>
                            <div className='ais-body ais-stats--body'>
                                1,613 results
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 p-zero' id='hits'>
                        <div className='ais-hits--item'>
                            <div className='col-md-12 p-zero'>
                                <div className='row index-entry'>
                                    <div className='col-md-2 index-entry-profile-pic-container'>
                                        <img className='index-entry-profile-pic' src="https://justlegal-dev-static-content.s3.amazonaws.com/public/attorney_profile/profile_pic/99/1460654749-28326-2604/Julie_Wilcox_0785_WEBSIZE_index.jpg" />
                                        <span className='verified-badge'>
                                            <img src="test" />
                                        </span>
                                    </div>
                                    <div className='col-md-10 p-zero'>
                                        <div className='col-md-9 p-zero'>
                                            <div class="col-md-12 col-sm-offset-4 col-md-offset-0 index-entry-column index-entry-column-1">
                                                <p class="index-entry-name">
                                                    Julie Wilcox
                                                </p>
                                                <p class="index-entry-firm-name">
                                                    Blue Owl Law
                                                </p>
                                            </div>
                                            <div class="col-md-6 col-sm-offset-4 col-md-offset-0 index-entry-column index-entry-column-2">
                                                <div class="index-text icon-gavel-align">
                                                    Housing & Real Estate, Trusts, Estate &amp; Probate, Other
                                                </div>
                                                <p class="index-text">
                                                    <i class="material-icons v-a-inh-lg-mid-sm f-s-1">public</i>
                                                    Edina, Minnesota
                                                </p>
                                            </div> 
                                        </div>
                                        <div class="col-md-3 configuration-button index-button-responsive-margin">
                                            <a data-no-turbolink="true" href="/attorney/julie-wilcox">
                                                <span class="index-entry-book-appointment material-button">Book Now</span>
                                            </a>
                                            <br />
                                            <a data-turbolinks="false" href="/attorney/julie-wilcox">
                                                <span class="index-entry-view-profile material-button">View Profile</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-5 col-sm-offset-4 digg_pagination index-pagination' id='pagination'></div>
                </div>
            </div>
        </div>
    );
  }
}

export default Content;
