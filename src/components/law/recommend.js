import React, { Component } from 'react';

import * as translate from 'counterpart';
import * as constants from '../constants';

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
                  {'0'}{idx + 1}
                </p>
                <a href={constants.LAW_URI + article.id}
                  target='_blank' className='article-nm-sym'>
                    {article.numerical_symbol}
                </a>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Recommend
