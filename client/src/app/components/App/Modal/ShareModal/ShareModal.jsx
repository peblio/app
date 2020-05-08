import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Dropdown from './Dropdown/Dropdown';
import InfoSVG from '../../../../images/info.svg';
import { ShareTypeInfo } from '../../../../constants/codeConstants.js';

require('./shareModal.scss');

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.copyShareLink = this.copyShareLink.bind(this);
    this.state = { linkType: 'autoRemixLink' };
  }

  componentDidMount() {
    this.renderClassroomWidget();
  }

  linkTypeChanged = (e) => {
    const linkType = e.target.value;
    this.setState({ linkType });
  }

  copyShareLink() {
    this.input.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.log(err);
    }
  }

  renderClassroomWidget() {
    gapi.sharetoclassroom.render(this.widget, //eslint-disable-line
      { size: 64,
        url: this.props.shareURL });
  }

  render() {
    const options = [{
      value: 'autoRemixLink',
      displayKey: 'Share as assignment',
      selected: true,
    },
    {
      value: 'link',
      displayKey: 'View only',
    }];
    return (
      <section className="share__container">
        <div className="share__option">
          <h2 className="share__text-primary">
            Share
          </h2>
          <div className="share__option__container">
            <Dropdown
              options={options}
              onChange={this.linkTypeChanged}
              formLabel="Share Options"
              formControlClassName="share-modal__select"
            />
            <div
            tabIndex='0' // eslint-disable-line
              className='share__container__svg share__container__svg-info'
            >
              <InfoSVG alt='More information' />
              <div
              tabIndex='0' // eslint-disable-line
                className='share__container__info-container'
              >
                <p className='share__container__info'>
                  {ReactHtmlParser(ShareTypeInfo)}
                </p>
              </div>
            </div>
          </div>
          <input
            className="share__input"
            ref={(element) => { this.input = element; }}
            value={this.state.linkType === 'link' ? this.props.shareURL : `${this.props.shareURL}?autoRemix=true`}
            data-test="share-modal__input"
            readOnly
          />
          <button
            className="share__link"
            onClick={this.copyShareLink}
          >
            copy to clipboard
          </button>
        </div>
        <p className="share__text-secondary">or</p>
        <div className="share__option">
          <h2 className="share__text-primary share__option__text-classroom"> Share to Google Classroom </h2>
          <div
            id="widget-div"
            ref={(element) => { this.widget = element; }}
          >
          </div>
        </div>
      </section>
    );
  }
}

Share.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  shareURL: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  shareURL: state.mainToolbar.shareURL
});

export default connect(mapStateToProps, null)(Share);
