import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

const style = {
  marginTop: '15%',
  border: '10px solid transparent',
  boxShadow: '2px 2px 10px 0px',
  borderRadius: '10px'
};

export class League extends Component {
  static propTypes = {
    leagues: PropTypes.object.isRequired,
    activeLeague: PropTypes.string.isRequired
  };

  render() {
    const { leagues, activeLeague } = this.props;
    const displayLeague = leagues[activeLeague];
    return (
      <div style={{marginTop:'70px'}}>
          <div style={style}>
            <ul>
              <li > Name: {displayLeague.title} </li>
              <li > Owner: {displayLeague.author} </li>
              <li>  Teams:
                <ul>
                  { _.values(displayLeague.teams).map(team => {
                    return (
                        <li key={team}> {team} </li>
                    )}
                  )}
                </ul>
              </li>
            </ul>
          </div>
      </div>
    );
  }
}

export default connect(state => ({ leagues: state.leagues.data, activeLeague: state.leagues.active }), dispatch => ({ }))(League);
