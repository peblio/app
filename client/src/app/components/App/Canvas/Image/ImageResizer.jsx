import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

class ImageResizer extends React.Component {
  render() {
    return (
      <div>
      HI
        <ReactCrop
          src={this.props.imageURL}
          crop={this.props.crop}
          onChange={(crop) => {
            console.log(crop);
            this.props.setImageCrop(crop);
          }}
        />
      </div>
    );
  }
}

ImageResizer.propTypes = {

};


export default ImageResizer;
