import { UPDATE_LEAGUE_DATA, SET_ACTIVE_LEAGUE} from '../constants/LeagueActionTypes';

const initialState = {
  data: {},
  active: ''
};

export default function leagues(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LEAGUE_DATA:
      return {
        ...state,
        data: action.data
      };
    case SET_ACTIVE_LEAGUE:
      return {
        ...state,
        active: action.id
      };
    default:
      return state;
  }
}
