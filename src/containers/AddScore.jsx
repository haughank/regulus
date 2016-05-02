import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import data from '../core/data';
import * as LeagueActions from '../actions/LeagueActions';
import _ from 'lodash';

const selectStyle = {
  width: '90%',
  border: '1px solid #111',
  fontSize: '12px',
  height: '34px',
  appearance: 'none'
}

const initState = {
  homeTeam: '',
  awayTeam: '',
  homeGoals: 0,
  awayGoals: 0
};

export class AddScore extends Component {

  static propTypes = {
    leagues: PropTypes.object.isRequired,
    activeLeague: PropTypes.string.isRequired,
    leagueActions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    // maybe league should be here as well instead of using the redux one
    this.state = initState;
  }

  handleScoreSubmit(e) {
    e.preventDefault();
    data.submitScore(this.state, this.props.activeLeague);
  }

  leagueChange(e) {
    this.props.leagueActions.setActiveLeague(e.target.value);
    this.setState(initState);
  }

  homeChange(e) {
    this.setState({...this.state, homeTeam: e.target.value});
  }

  awayChange(e) {
    this.setState({...this.state, awayTeam: e.target.value});
  }

  homeGoalsChange(e) {
    this.setState({...this.state, homeGoals: e.target.value});
  }

  awayGoalsChange(e) {
    this.setState({...this.state, awayGoals: e.target.value});
  }


  render() {

    const leagueTeams = this.props.leagues[this.props.activeLeague] ? this.props.leagues[this.props.activeLeague].teams : [];
    const scores = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];

    return (
      <div style={{ marginTop: '70px', textAlign: 'center'}}>
        <form onSubmit={::this.handleScoreSubmit}>
          <div style={{ paddingTop: '10px', width: '90%', margin: 'auto' }}>
            <div style={{textAlign: 'center', width:'50%', display: 'inline-block'}}>Choose League </div>
            <div style={{textAlign: 'center', width:'50%', display: 'inline-block'}}>
              <select onChange={::this.leagueChange} value={this.props.activeLeague} ref="leagueId" style={selectStyle}>
                <option value=''> </option>
                { _.values(this.props.leagues).map(league => {
                return (
                    <option key={league.id} value={league.id}> {league.title} </option>
                )}
              )}
              </select>
            </div>
          </div>

          <div style={{ paddingTop: '10px' , width: '90%', margin: 'auto' }}>
            <div style={{textAlign: 'center', width:'50%', display: 'inline-block'}}> Home Team </div>
            <div style={{textAlign: 'center', width:'50%', display: 'inline-block'}}>
              <select onChange={::this.homeChange} value={this.state.homeTeam} ref="homeTeam" style={selectStyle}>
              <option value=''> </option>
              { _.values(leagueTeams).map(team => {
                return (
                    <option key={team} value={team}> {team} </option>
                )}
              )}
              </select>
            </div>
          </div>

          <div style={{ paddingTop: '10px', width: '90%', margin: 'auto' }}>
            <div style={{textAlign: 'center', width:'50%', display: 'inline-block'}}> Away Team </div>
            <div style={{textAlign: 'center', width:'50%', display: 'inline-block'}}>
              <select onChange={::this.awayChange} value={this.state.awayTeam} ref="awayTeam" style={selectStyle}>
              <option value=''> </option>
              { _.values(leagueTeams).map(team => {
                return (
                    <option key={team} value={team}> {team} </option>
                )}
              )}
              </select>
            </div>
          </div>

          <div style={{ paddingTop: '30px', width: '90%', margin: 'auto' }}>
            <div style={{textAlign: 'center', width:'35%', display: 'inline-block'}}> {this.state.homeTeam} </div>
            <div style={{textAlign: 'center', width:'10%', display: 'inline-block'}}>
              <select onChange={::this.homeGoalsChange} value={this.state.homeGoals} ref="homeGoals" style={selectStyle}>
              { _.values(scores).map(score => {
                return (
                    <option key={score} value={score}> {score} </option>
                )}
              )}
              </select>
            </div>
            <div style={{textAlign: 'center', width:'10%', display: 'inline-block'}}> - </div>
            <div style={{textAlign: 'center', width:'10%', display: 'inline-block'}}>
              <select onChange={::this.awayGoalsChange} value={this.state.awayGoals} ref="awayGoals" style={selectStyle}>
              { _.values(scores).map(score => {
                return (
                    <option key={score} value={score}> {score} </option>
                )}
              )}
              </select>
            </div>
            <div style={{textAlign: 'center', width:'35%', display: 'inline-block'}}> {this.state.awayTeam} </div>
          </div>
          <div style={{ paddingTop: '20px' }}>
          <input type="submit" value="Submit Score" style={{fontSize: '12px', height: '34px'}}/>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(state => ({ leagues: state.leagues.data, activeLeague: state.leagues.active }), dispatch => ({ 
leagueActions: bindActionCreators(LeagueActions, dispatch)
}))(AddScore);
