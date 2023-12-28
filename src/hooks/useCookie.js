export function useCookie(name, value, time) {
	let now = new Date();
	let duedate = now.getTime() + 1000 * time; //지금으로부터 time초뒤의 만료시간
	now.setTime(duedate); //시간객체값을 위에서 생성한 만료시간값으로 변경
	document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`; //한국시로 구한 만료시간값을 전세계 표준시로 변환해서 쿠키값을 만료시간값으로 설정
}
