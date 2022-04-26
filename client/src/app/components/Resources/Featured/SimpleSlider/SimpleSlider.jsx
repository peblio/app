import React, { Component } from 'react';
import Slider from 'react-slick';

export default class SimpleSlider extends Component {
  render() {
    const rows = this.props.rows;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      rows,
      responsive: [
        {
          breakpoint: 2000,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };

    return (
      <div>
        <Slider {...settings}>
          {this.props.items}
        </Slider>
      </div>
    );
  }
}
