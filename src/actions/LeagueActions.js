import * as types from '../constants/LeagueActionTypes';

export function updateLeagueData(data) {
  return {
    type: types.UPDATE_LEAGUE_DATA,
    data: data
  };
}

export function setActiveLeague(id) {
	console.log('calling the active league action')
  return {
    type: types.SET_ACTIVE_LEAGUE,
    id: id
  };
}