import React, { Component } from 'react';
import $ from 'jquery';

class Footer extends Component {
    render() {
        return(
            <div>
                <footer>
                    <div className='footer'>
                        <section className='footerTopRow'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <h2 className='footerTopRowText'>
                                            <i className='material-icons v-a-bot'>mail</i>
                                            info@vnlaw.com
                                        </h2>
                                    </div>
                                    <div className='col-md-6'>
                                        <h2 className='footerTopRowText'>
                                            <i className='material-icons v-a-bot'>location_on</i>
                                            Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
                                        </h2>
                                    </div>
                                    <div className='col-md-3'>
                                        <h2 className='footerTopRowText'>
                                            <i className='material-icons v-a-bot'>phone</i>
                                            512.957.1529
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='footerBottomRow'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-xs-12 hidden-md hidden-lg hidden-sm footerColumnMobile auto-block-center'>
                                        <div className='col-xs-6'>
                                            <a className='footerColumnLinkMobile' href='https://www.facebook.com/LKBC-1471216732971207/' target='_blank'>
                                                <i className='mdi mdi-twitter white'></i>
                                                Twitter
                                            </a>
                                        </div>
                                        <div className='col-xs-6'>
                                            <a className='footerColumnLinkMobile' href='https://www.facebook.com/LKBC-1471216732971207/' target='_blank'>
                                                <i className='mdi mdi-facebook white'></i>
                                                Facebook
                                            </a>
                                        </div>
                                    </div>
                                    <div className='visible-xs hidden-md hidden-lg hidden-sm'>
                                        <div className='dropdown col-md-2 col-xs-4 footerColumn'>
                                            <hr className='footerColumnBorder'></hr>
                                            <button aria-expanded='false' aria-haspopup='true' className='footerColumnHeader' data-toggle='dropdown' id='dLabel' type='button'>
                                                Resources
                                            </button>
                                            <ul aria-labelledby='dLabel' className='dropdown-menu footerColumnListResources'>
                                                <li className='footerColumnListItem col-xs-6'>
                                                    <a className="footerColumnLink" href="#">Attorney Resources</a>
                                                </li>
                                                <li className='footerColumnListItem col-xs-6'>
                                                    <a className="footerColumnLink" href="#">Client Resources</a>
                                                </li>
                                                <li className='footerColumnListItem col-xs-6'>
                                                    <a className="footerColumnLink" href="#">JustLegal Blog</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='dropdown col-md-2 col-xs-4 footerColumn'>
                                            <hr className='footerColumnBorder'>
                                            </hr>
                                            <button aria-expanded='false' aria-haspopup='true' className='footerColumnHeader' data-toggle='dropdown' id='dLabel' type='button'>
                                                Information
                                            </button>
                                            <ul aria-labelledby='dLabel' className='dropdown-menu footerColumnListInformation'>
                                                <li className='footerColumnListItem col-xs-6'>
                                                    <a className="footerColumnLink" href="#">
                                                        <br className='mobileNavBreakpoint'>
                                                        </br>
                                                        For Clients
                                                    </a>
                                                </li>
                                                <li className='footerColumnListItem col-xs-6'>
                                                    <a className="footerColumnLink" href="#">For Attorneys</a>
                                                </li>
                                                <li className='footerColumnListItem col-xs-6'>
                                                    <a className="footerColumnLink" href="#">Integration</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='dropdown col-md-2 col-xs-4 footerColumn'>
                                            <hr className='footerColumnBorder'></hr>
                                            <button aria-expanded='false' aria-haspopup='true' className='footerColumnHeader' data-toggle='dropdown' id='dLabel' type='button'>
                                                Company
                                            </button>
                                            <ul aria-labelledby='dLabel' className='dropdown-menu footerColumnListCompany'>
                                                <li className='footerColumnListItem col-xs-6'>
                                                    <a className="footerColumnLink" href="#">Press Kit</a>
                                                </li>
                                                <li className='footerColumnListItem col-xs-6'>
                                                    <a className="footerColumnLink" href="#">Legal Notices</a>
                                                </li>
                                                <li className='footerColumnListItem col-xs-6'>
                                                    <a className="footerColumnLink" href="#">Privacy Policy</a>
                                                </li>
                                                <li className='footerColumnListItem col-xs-6'>
                                                    <a className="footerColumnLink" href="#">Terms of Service</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='hidden-xs'>
                                        <div className='col-sm-2 footerColumn'>
                                            <hr className='footerColumnBorder'></hr>
                                            <h3 className='footerColumnHeader'>
                                                Resources
                                            </h3>
                                            <ul className='footerColumnList'>
                                                <li className='footerColumnListItem'>
                                                    <a className="footerColumnLink" href="#">Attorney Resources</a>
                                                </li>
                                                <li className='footerColumnListItem'>
                                                    <a className="footerColumnLink" href="#">Client Resources</a>
                                                </li>
                                                <li className='footerColumnListItem'>
                                                    <a className="footerColumnLink" href="#">JustLegal Blog</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='col-sm-2 footerColumn'>
                                            <hr className='footerColumnBorder'></hr>
                                            <h3 className='footerColumnHeader'>
                                                Information
                                            </h3>
                                            <ul className='footerColumnList'>
                                                <li className='footerColumnListItem'>
                                                    <a className="footerColumnLink" href="#">For Clients</a>
                                                </li>
                                                <li className='footerColumnListItem'>
                                                    <a className="footerColumnLink" href="#">For Attorneys</a>
                                                </li>
                                                <li className='footerColumnListItem'>
                                                    <a className="footerColumnLink" href="#">Integration</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='col-sm-2 footerColumn'>
                                            <hr className='footerColumnBorder'></hr>
                                            <h3 className='footerColumnHeader'>
                                                Company
                                            </h3>
                                            <ul className='footerColumnList'>
                                                <li className='footerColumnListItem'>
                                                    <a className='footerColumnLink' href='#'>
                                                        Press Kit
                                                    </a>
                                                </li>
                                                <li className='footerColumnListItem'>
                                                    <a className="footerColumnLink" href="#">Legal Notices</a>
                                                </li>
                                                <li className='footerColumnListItem'>
                                                    <a className="footerColumnLink" href="#">Privacy Policy</a>
                                                </li>
                                                <li className='footerColumnListItem'>
                                                    <a className="footerColumnLink" href="#">Terms of Service</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='col-sm-2 hidden-xs footerColumn'>
                                        <hr className='footerColumnBorder'></hr>
                                        <h3 className='footerColumnHeader'>
                                            Social
                                        </h3>
                                        <ul className='footerColumnList'>
                                            <li className='footerColumnListItem'>
                                                <a className='footerColumnLink' href='https://www.facebook.com/LKBC-1471216732971207/' target='_blank'>
                                                    <i className='mdi mdi-twitter white'></i>
                                                    Twitter
                                                </a>
                                            </li>
                                            <li className='footerColumnListItem'>
                                                <a className='footerColumnLink' href='https://www.facebook.com/LKBC-1471216732971207/' target='_blank'>
                                                    <i className='mdi mdi-facebook white'></i>
                                                    Facebook
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='col-sm-2 col-sm-offset-2 hidden-xs footerColumn'>
                                        <hr className='footerColumnBorder'></hr>
                                        <h3 className='footerColumnHeader'>
                                            Quick Links
                                        </h3>
                                        <ul className='footerColumnList'>
                                            <li className='footerColumnListItem'>
                                                <a className="footerColumnLink" href="#">Log In</a>
                                            </li>
                                            <li className='footerColumnListItem'>
                                                <a target="_blank" className="footerColumnLink" href="#">Support</a>
                                            </li>
                                            <li className='footerColumnListItem'>
                                                <a className="footerColumnLink" href="#">Contact Us</a>
                                            </li>
                                            <li className='footerColumnListItem'>
                                                <a className="footerColumnLink" href="#">Join A Video Chat</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='row footerBottomRow'>
                                    <div className='col-md-3'>
                                        <h4 className='footerCopyright'>
                                            Copyright © BK_NULL         All Rights Reserved
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;