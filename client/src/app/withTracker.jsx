// reference: https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker

import React from 'react';
import PropTypes from 'prop-types';
import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID);

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = class extends React.Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  HOC.propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired
  };

  return HOC;
};

export default withTracker;
