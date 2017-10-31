import React, { Component } from 'react';

class Category extends Component {
	render() {
		return (
				<div className="category-filter">
					<div className="category-organization">
					    <div className="category-filter-title">Cơ quan ban hành</div>
					    <div className="category-filter-content">
							<div className="category-item">
					        	<a href="#">Quốc hội</a>
							</div>
					      	<div className="category-item">
					        	<a href="#">Ủy ban thường vụ quốc hội</a>
							</div>
					      	<div className="category-item">
					       		<a href="#">Chính phủ</a>
					       	</div>
					      	<div className="category-item">
					       		<a href="#">Thủ tướng Chính phủ</a>
					       	</div>
					      	<div className="category-item">
					       		<a href="#">Các Bộ, cơ quan ngang Bộ</a>
					       	</div>
					      	<div className="category-item">
					       		<a href="#">Các cơ quan khác</a>
					       	</div>
					    </div>
					</div>
				  	<div className="category-type">
				    	<div className="category-filter-title">Loại văn bản</div>
					    <div className="category-filter-content">
					    	<div className="category-item">
					  			<a onClick={this.props.handlerType} name="fucker" value="Bộ luật" href="#">Hiến pháp</a>
				      		</div>
				      		<div className="category-item">
				  				<a onClick={this.props.handlerType} name="fucker1" value="Bộ luật" href="#">Bộ luật</a>
				      		</div>
				      		<div className="category-item">
								<a onClick={this.props.handlerType} name="fucker2" value="Luật" href="#">Luật</a>
						    </div>
				      		<div className="category-item">
								<a onClick={this.props.handlerType} name="fucker3" value="Pháp lệnh" href="#">Pháp lệnh</a>
						    </div>
				      		<div className="category-item">
								<a onClick={this.props.handlerType} name="fucker4" value="Lệnh" href="#">Lệnh</a>
						    </div>
				      		<div className="category-item">
								<a onClick={this.props.handlerType} name="fucker5" value="Nghị quyết" href="#">Nghị quyết</a>
						    </div>
				      		<div className="category-item">
								<a onClick={this.props.handlerType} name="fucker6" value="Nghị quyết liên tịch" href="#">Nghị quyết liên tịch</a>
						    </div>
					      	<div className="category-item">
						  		<a onClick={this.props.handlerType} name="fucker7" value="Nghị định" href="#">Nghị định</a>
						    </div>
					      	<div className="category-item">
								<a onClick={this.props.handlerType} name="fucker8" value="Quyết định" href="#">Quyết định</a>
						    </div>
				     		<div className="category-item">
								<a onClick={this.props.handlerType} name="fucker9" value="Thông tư" href="#">Thông tư</a>
					      	</div>
				      		<div className="category-item">
								<a onClick={this.props.handlerType} name="fucker" value="Thông tư liên tịch" href="#">Thông tư liên tịch</a>
						    </div>
				    	</div>
				  	</div>
				 	<div className="category-year">
					    <div className="category-filter-title">Năm ban hành</div>
				    	<div className="category-filter-content">
				      		<div className="category-item">
								<a onClick={this.props.handlerYear} from="1945" to="1950" href="#">1945 đến 1950</a>
				    		</div>
				      		<div className="category-item">
				  				<a onClick={this.props.handlerYear} from="1951" to="1960" href="#">1951 đến 1960</a>
						    </div>
				      		<div className="category-item">
						  		<a onClick={this.props.handlerYear} from="1961" to="1970" href="#">1961 đến 1970</a>
						    </div>
					      	<div className="category-item">
								<a onClick={this.props.handlerYear} from="1971" to="1980" href="#">1971 đến 1980</a>
						    </div>
					      	<div className="category-item">
							  	<a onClick={this.props.handlerYear} from="1981" to="1990" href="#">1981 đến 1990</a>
						    </div>
					      	<div className="category-item">
					  			<a onClick={this.props.handlerYear} from="1991" to="2000" href="#">1991 đến 2000</a>
					      	</div>
					      	<div className="category-item">
					  			<a onClick={this.props.handlerYear} from="2001" to="2010" href="#">2001 đến 2010</a>
					      	</div>
					      	<div className="category-item">
					  			<a onClick={this.props.handlerYear} from="2011" to="2020" href="#">2011 đến 2020</a>
					      	</div>
						</div>
					</div>
				</div>	
		);
	}
}
export default Category;
