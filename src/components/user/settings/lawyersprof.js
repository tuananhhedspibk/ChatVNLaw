import React, { Component } from 'react';
import SideBar from './sidebar';
import EditerInline from './editinline';
import EditerPanel from './editerpanel';

class LawyerProfile extends Component {
	constructor(props) {
		super(props);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	handleUpdate(name,text) {
		this.props.handleUpdate('lawyers',name,text);
	}

	render() {
		return(
			<div className='my-profile'>
				<div className='row'>
					<SideBar user={this.props.user} handleUpdate={this.props.handleUpdate}/>
					<div className='lawyer-prof-detail col-md-8'>
						<ul className='lawyer-prof-content'>
							<li className='item-detail basic-prof'>
								<div className='prof-panel-heading'>
									<a  data-toggle='collapse'
										href='#collapsebasicinfo' aria-expanded='true' >
											<h4>Thông tin cơ bản</h4>
											<i className='fa fa-chevron-right'
												aria-hidden='true'></i>
									</a>
								</div>
								<ul id='collapsebasicinfo' className='panel-collapse collapse show'>
				          <li>
										<span>
											<i className='fa fa-anchor'
												aria-hidden='true'></i>
											<b>Lĩnh vực chuyên môn: &nbsp;</b>
										</span>
										<EditerInline name='category'
											text={(this.props.lawyer.category)}
											handleUpdate={this.handleUpdate} />
									</li>
									<li >
										<span>
											<i className='fa fa-birthday-cake'
												aria-hidden='true'></i>
											<b>Ngày sinh:&nbsp;</b>
										</span>
										<EditerInline name='birthday'
											text={(this.props.lawyer.birthday)}
											handleUpdate={this.handleUpdate} />
									</li>
									<li>
										<span>
											<i className='fa fa-user-circle-o'
												aria-hidden='true'></i>
											<b>Số năm kinh nghiệm:&nbsp;</b>
										</span>
										<EditerInline name='exp'
											text={(this.props.lawyer.exp)}
											handleUpdate={this.handleUpdate} />
									</li>
									<li>
										<span>
											<i className='fa fa-globe'
												aria-hidden='true'></i>
											<b>Khu vực:&nbsp;</b>
										</span>
										<EditerInline name='area'
											text={(this.props.lawyer.area)}
											handleUpdate={this.handleUpdate} />
									</li>
									<li>
										<span>
											<i className='fa fa-users'
												aria-hidden='true'></i>
											<b>Thuộc đoàn luật sư:&nbsp;</b>
										</span>
										<EditerInline name='clanLaw'
											text={(this.props.lawyer.clanLaw)}
											handleUpdate={this.handleUpdate} />
									</li>
									<li>
										<span>
											<i className='fa fa-university'
												aria-hidden='true'></i>
											<b>Tổ chức hành nghề:&nbsp;</b>
										</span>
										<EditerInline name='orgLaw'
											text={(this.props.lawyer.orgLaw)}
											handleUpdate={this.handleUpdate} />
									</li>
									<li>
										<span>
											<i className='fa fa-id-card-o'
												aria-hidden='true'></i>
											<b>Số thẻ hành nghề:&nbsp;</b>
										</span>
										<EditerInline name='cardNumber'
											text={(this.props.lawyer.cardNumber)}
											handleUpdate={this.handleUpdate} />
									</li>
									<li>
										<span>
											<i className='fa fa-id-card-o'
												aria-hidden='true'>
											</i>
											<b>Số chứng chỉ hành nghề:&nbsp;</b>
										</span>
										<EditerInline name='certificate'
											text={(this.props.lawyer.certificate)}
											handleUpdate={this.handleUpdate} />
									</li>
								</ul>
							</li>
							<li className='item-detail'>
								<EditerPanel handleUpdate={this.handleUpdate}
									text={this.props.lawyer.intro} name='intro'
									title='Giới thiệu bản thân' keyID='1' />
							</li>
							<li className='item-detail'>
								<EditerPanel handleUpdate={this.handleUpdate}
									text={this.props.lawyer.education}
									name='education' title='Học vấn' keyID='2' />
							</li>
							<li className='item-detail'>
								<EditerPanel handleUpdate={this.handleUpdate}
									text={this.props.lawyer.workPlace}
									name='workPlace' title='Nơi làm việc'
									keyID='3' />
							</li>
							<li className='item-detail'>
								<EditerPanel handleUpdate={this.handleUpdate}
									text={this.props.lawyer.achievement}
									name='achievement'
									title='Thành tựu nghề nghiệp' keyID='4' />
							</li>
							<li className='item-detail'>
								<EditerPanel handleUpdate={this.handleUpdate}
									text={this.props.lawyer.otherCertificate﻿}
										name='otherCertificate﻿'
										title='Văn bằng và chứng chỉ khác'
										keyID='5' />
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default LawyerProfile;
