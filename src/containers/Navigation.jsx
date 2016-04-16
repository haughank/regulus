import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

//   static divStyle = {
//     height: 80px,
//     width: 100%,
//     background-color: darkblue,
//     position: fixed,
//     bottom: 0px,
//     z-index: 99999
// };

linkStyle: {
  display: 'block',
  color: 'white',
  textAlign: 'center',
  padding: '14px 16px',
  textDecoration: 'none'
},
liStyle: {
  float: 'left',
  margin: 'auto',
  width: '33%',
  height: '100%',
  borderRight: '1px solid #bbb'
},
liStyleLast: {
  float: 'left',
  margin: 'auto',
  width: '33%',
  height: '100%',
},
activeStyle: {
  backgroundColor: 'green',
  height: '100%'
},

  render() {
    return (
      <div>
        <ul role="nav" style={{height: 50, width: '100%', backgroundColor: '#333', position: 'fixed', bottom: 0, zIndex: 99999, listStyleType: 'none', margin: 0, padding: 0}}>
          <li style = {this.liStyle}><Link to="/league" activeStyle={this.activeStyle} style = {this.linkStyle}>league</Link></li>
          <li style = {this.liStyle}><Link to="/main" activeStyle={this.activeStyle} style = {this.linkStyle}>todo</Link></li>
          <li style = {this.liStyleLast}> <Link to="/profile" activeStyle={this.activeStyle} style = {this.linkStyle}> profile </Link></li>
        </ul>

        {this.props.children}

      </div>
    )
  }
})