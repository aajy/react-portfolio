import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchHistory = createAsyncThunk('history/requestHistory', async () => {
	fetch(`${process.env.PUBLIC_URL}/DB/department.json`);
	const data = await fetch(`${process.env.PUBLIC_URL}/DB/department.json`);
	const json = await data.json();
	return json.history;
}); //액션객체를 반환하는 함수
//호출시점이 컴포넌트 생성시점.

const historySlice = createSlice({
	name: 'member',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: {
		[fetchHistory.pending]: state => {
			state.isLoading = true;
		},
		[fetchHistory.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchHistory.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		}
	}
});

export default historySlice.reducer;
