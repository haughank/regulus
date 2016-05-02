import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LeagueActions from '../actions/LeagueActions';
import * as CredentialsActions from '../actions/CredentialsActions';
import auth from '../core/auth';
import Header from '../components/Header.jsx';
import MainSection from '../components/MainSection.jsx';
import { Link } from 'react-router';
import _ from 'lodash';

const style = {
  marginTop: '5%',
  border: '10px solid transparent',
  boxShadow: '2px 2px 10px 0px',
  borderRadius: '10px'
};

const linkStyle = {
  textDecoration: 'none',
  color: 'black'
};

export class Home extends Component {
  static propTypes = {
    leagues: PropTypes.object.isRequired,
    leagueActions: PropTypes.object.isRequired
  };

  handleClick (id) {
    // what I want to do now is set the active league in the redux store
    this.props.leagueActions.setActiveLeague(id);
  }

  render() {
    const { leagues, leagueActions } = this.props;
    const leagueArray = _.values(leagues);
    console.log(leagueArray);
    return (
      <div style={{marginTop:'70px'}}>
        {leagueArray.map(league => {
          return (
          <Link key={league.id} to="/league" style={linkStyle} onClick={this.handleClick.bind(this, league.id)}>
          <div style={style}>
            <ul>
              <li > Name: {league.title} </li>
              <li > Owner: {league.author} </li>
              <li>  Teams:
                <ul>
                  { _.values(league.teams).map(team => {
                    return (
                        <li key={team}> {team} </li>
                    )}
                  )}
                </ul>
              </li>
            </ul>
          </div>
          </Link>
          )}
        )}
      </div>
    );
  }
}

export default connect(state => ({ leagues: state.leagues.data }), dispatch => ({
  leagueActions: bindActionCreators(LeagueActions, dispatch)
}))(Home);
