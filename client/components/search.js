import _ from 'lodash'
import {connect} from 'react-redux';
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'
import history from '../history'


class SearchBar extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }
  }
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (event, { result }) => {

  history.push(`products/${result.id}`);


  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      const filteredProducts = this.props.products.map( product => {
        return {
          title: product.name,
          description: product.description.slice(0, 32) + '...',
          price: product.price,
          id: product.id
        }

      })

      const filterResults = _.filter(filteredProducts, isMatch);
      this.setState({
        isLoading: false,
        results: filterResults,
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
          />
    )
  }
}


const mapState = ({ products }) => ({ products });

export default connect(mapState)(SearchBar);
