import { createSlice } from '@reduxjs/toolkit';

const darkSlice = createSlice({
	name: 'dark',
	initialState: { isDark: false },
	//extraReducers: [pending, fulfiled, rejected] 상태관리를 리듀서
	//action을 만들어주는 함수가 reducers, 안쪽에 property가 생기는데,
	reducers: {
		darkToggle: state => {
			state.isDark = !state.isDark;
		}
	}
});
//slice함수 호출 시 darkSlice라는 객체반환
//const {reducer: 변경된 전역객체, actions: reducer에 등록된 action객체 생성함수} = createSlice();

//아래 action 객체 생성함수는 추후 컴포넌트에서 반환된 action 객체를 dispatch로 전달
export const { darkToggle } = darkSlice.actions; //둘중의 하나의 함수만 사용할 수 있으므로 이렇게 작성.
export default darkSlice.reducer;

//fetching함수가 없으니까 함수를 등록해서 함수자체가 action을 반환하도록 해야함
