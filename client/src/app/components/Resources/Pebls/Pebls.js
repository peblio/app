import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import {
  setTagName,
  getPeblsFromTag
} from '../../../action/resources';
import Pebl from '../Pebl/Pebl';

require('./pebls.scss');

const FIRST_PAGE = 1;
const PAGE_INCREMENT_COUNT = 1;
const PAGE_SIZE = 11;
class Pebls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: FIRST_PAGE,
      pageLimit: PAGE_SIZE,
      withStudents: true
    };
  }

  componentWillMount() {
    if (this.props.tagName) {
      this.retrievePeblsWithTag(this.props.tagName);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.tagName !== this.props.tagName) {
      const tag = nextProps.tagName;
      this.retrievePeblsWithTag(tag);
    }
  }

  increasePageCount = () => {
    this.setState({
      page: this.state.page + PAGE_INCREMENT_COUNT
    });
  }

  fetchMoreData = () => {
    this.props.getPeblsFromTag(this.props.tagName, this.state.pageLimit, this.state.page, this.state.withStudents);
    this.increasePageCount();
  }

  retrievePeblsWithTag=(tag) => {
    this.props.setTagName(tag);
    this.props.getPeblsFromTag(tag, this.state.pageLimit, 1, this.state.withStudents);
    this.increasePageCount();
  }

  renderPebls(studioPebls) {
    return (
      <ul
        className="pebls__list"
        id="pebls__list"
      >
        <InfiniteScroll
          className="pebls__list-scroll"
          dataLength={this.props.studioPebls.length}
          next={() => {
            this.fetchMoreData();
          }}
          hasMore={this.props.studioPebls.length < this.props.totalPebls}
          loader={<h4 className="pebls__list-loading">Loading more pebls!</h4>}
          endMessage={(
            <a
              className="pebls__list-end"
              href="#pebls__list"
            >
              Back to top
            </a>
          )}
          scrollThreshold="200px"
        >
          {studioPebls.map((pebl, i) => (
            <li
              key={`pebl-${i}`}
              className="pebls__pebl"
            >
              <Pebl
                key={`pebl-${i}`}
                title={pebl.title}
                author={pebl.author}
                tags={pebl.tags}
                updatedAt={pebl.updatedAt}
                id={pebl.id}
                user={pebl.user}
                description={pebl.description}
                number={i % 4}
              />
            </li>
          ))
          }
        </InfiniteScroll>
      </ul>
    );
  }

  render() {
    return (
      <div className="studio__container">
        <div className="studio__pebls">
          {this.renderPebls(this.props.studioPebls)}
        </div>
      </div>
    );
  }
}

Pebls.propTypes = {
  tagName: PropTypes.string.isRequired,
  studioPebls: PropTypes.arrayOf().isRequired,
  totalPebls: PropTypes.number.isRequired,
  setTagName: PropTypes.func.isRequired,
  getPeblsFromTag: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    tagName: state.resources.tagName,
    studioPebls: state.resources.pebls,
    totalPebls: state.resources.totalPebls
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  setTagName,
  getPeblsFromTag
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pebls);
