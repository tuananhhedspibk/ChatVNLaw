import React, { Component } from 'react';

import * as translate from 'counterpart';

class Recommend extends Component {
  render() {
    return (
      <div className='recommend-articles'>
        <p className='title'>
          {translate('app.article.recommend')}
        </p>
        {
          this.props.articles.map((article, idx) => {
            return (
              <div className='article' title={article.title}>
                <p className='article-ct'>
                  {idx + 1}
                </p>
                <div className='article-nm-sym'>
                  {article.numerical_symbol}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Recommend
