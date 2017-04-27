import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames/bind';

import css from './EmployeePanel.css';
import globe from './globe.svg';



const cx = classNames.bind(css);


// name, id, phone, emails, primaryRole, primaryDepartment, url, officeRoom, officeStreetAddress

// not standardized yet: personalSite, bigPictureLink
class EmployeePanel extends React.Component {

  static injectBRs(arr) {
    let retVal = []

    // Add <br/>s between the elements
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      retVal.push(element);
      if (arr.length - 1 !== i) {
        retVal.push(<br key={ i } />);
      }
    }

    return retVal
  }

  render() {
    const employee = this.props.employee;

    // Create the address box
    let officeElements = [];

    if (employee.officeRoom) {
      officeElements.push(employee.officeRoom)
    }

    // if (employee.office) {
    //   const lines = employee.office.split('\r\n');

    //   lines.forEach((line, index) => {
    //     officeElements.push(line);
    //     if (lines.length - 1 !== index) {
    //       officeElements.push(<br key={ index } />);
    //     }
    //   });
    // }


    officeElements = this.constructor.injectBRs(officeElements)


    const contactText = [];

     if (employee.primaryRole) {
      contactText.push(employee.primaryRole);
    }

    if (employee.primaryDepartment) {
      contactText.push(employee.primaryDepartment);
    }
    if (employee.emails) {
      employee.emails.forEach(function(email, index) {
        contactText.push(<a key={email} href={ `mailto:${email}` }>{email}</a>);
      })
    }

    if (employee.phone) {
      const phone = [];
      phone.push(employee.phone.slice(0, 3));
      phone.push('-');
      phone.push(employee.phone.slice(3, 6));
      phone.push('-');
      phone.push(employee.phone.slice(6, 11));

      const phoneText = phone.join('');

      contactText.push(<a key="tel" href={ `tel:${phoneText}` }>{phoneText}</a>);
    }

    // Add <br/>s between the elements
    const contactElements = this.constructor.injectBRs(contactText)

    let linkElement = null
    if (employee.url) {
      linkElement = (
        <span className = {css.link}> 
          <a key="jfdalsj" target='_blank' rel='noopener noreferrer' className={ css.inlineBlock } href={ employee.url }>
            <img src={ globe } alt='globe' />
          </a>
        </span>
      )
    }


    var links = []
    if (employee.url) {
      links.push(<a key="link" target='_blank' rel='noopener noreferrer' href={employee.url}>NEU Profile</a>)
    }

    if (employee.personalSite) {
      links.push(<a key="personalSite" target='_blank' rel='noopener noreferrer' href={employee.personalSite}>Personal Website</a>)
    }

    if (employee.googleScholarId) {
      links.push(<a key="googleScholarId" target='_blank' rel='noopener noreferrer' href={'https://scholar.google.com/citations?user=' + employee.googleScholarId + '&hl=en&oi=ao'}>Google Scholar</a>)
    }

    links = this.constructor.injectBRs(links)

    // data-tip={ `View on ${section.host}` }

    return (
      <div className={ `${css.container} ui segment` }>
        <div className={ css.header }>
          {employee.name}
          {linkElement}
        </div>

        <div className={ css.body }>
          <div className={ `${css.inlineBlock} ${css.contactBox}` }>
            {contactElements}
          </div>
          <div className={ css.inlineBlock +' '+ css.addressBox }>
            {officeElements}
          </div>
          <div className={ css.inlineBlock +' '+ css.addressBox }>
            {links}
          </div>
        </div>
      </div>
    );
  }
}

EmployeePanel.propTypes = {
  employee: PropTypes.object.isRequired,
};


export default CSSModules(EmployeePanel, css);
