import { combineReducers } from 'redux';
import * as types from './action';

const memberReducer = (state = [], action) => {
	switch (action.type) {
		case types.MEMBER.success:
			return { ...state, members: action.payload };
		default:
			return state;
	}
};
const memberHistoryReducer = (state = [], action) => {
	switch (action.type) {
		case types.HISTORY.success:
			return { ...state, history: action.payload };
		default:
			return state;
	}
};
const youtubeReducer = (state = [], action) => {
	switch (action.type) {
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, memberHistoryReducer, youtubeReducer });
export default reducers;
