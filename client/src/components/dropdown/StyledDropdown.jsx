import React from 'react';
import PropTypes from 'prop-types';
import './StyledDropdown.scss';


function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
        except the current select box: */
  let x;
  let y;
  let i;
  const arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}

class StyledDropdown extends React.Component {
  componentDidMount() {
    let divElementsCount;
    let virtualStylingDiv;
    let b;
    let c;
    /* Look for any elements with the class "custom-select": */
    const customSelectDivElements = document.getElementsByClassName('custom-select');
    for (divElementsCount = 0; divElementsCount < customSelectDivElements.length; divElementsCount++) {
      const selectElement = customSelectDivElements[divElementsCount].getElementsByTagName('select')[0];
      /* For each element, create a new DIV that will act as the selected item: */
      virtualStylingDiv = document.createElement('DIV');
      virtualStylingDiv.setAttribute('class', 'select-selected');
      virtualStylingDiv.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
      customSelectDivElements[divElementsCount].appendChild(virtualStylingDiv);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement('DIV');
      let selectElementCount;
      b.setAttribute('class', 'select-items select-hide');
      for (selectElementCount = 1; selectElementCount < selectElement.length; selectElementCount++) {
        /* For each option in the original select element,
    create a new DIV that will act as an option item: */
        c = document.createElement('DIV');
        c.innerHTML = selectElement.options[selectElementCount].innerHTML;
        c.addEventListener('click', function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
          let y;
          let i;
          let k;
          let s;
          let h;
          s = this.parentNode.parentNode.getElementsByTagName('select')[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName('same-as-selected');
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute('class');
              }
              this.setAttribute('class', 'same-as-selected');
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      customSelectDivElements[divElementsCount].appendChild(b);
      virtualStylingDiv.addEventListener('click', function (e) {
        /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
      });
      /* If the user clicks anywhere outside the select box,
then close all select boxes: */
      document.addEventListener('click', closeAllSelect);
    }
  }

  componentWillUnmounts() {

  }

  render() {
    return (
      <div className="styled-dropdown__div custom-select">
        <select>
          {
            this.props.options.map(option => <option value={option.value}>{option.name}</option>)
          }
        </select>
      </div>
    );
  }
}

StyledDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired,
};

export default StyledDropdown;
