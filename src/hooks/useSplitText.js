export function useSplitText() {
	//해당 useSplitText훅은 호출 시 아래의 함수를 리턴
	return (ref, txt, speed = 0, interval = 0) => {
		let tags = '';
		let count = 0;

		for (let letter of txt) {
			tags += `
    <span style='display: inline-block; transition-duration:${speed}s; transition-delay:${
				interval * count
			}s'>${letter}</span>
  `;
			count++;
		}
		console.log(tags);
		ref.innerHTML = tags;
	};
}
// const result = useSplitText();
