export function useSplitText(ref, txt) {
	//해당 useSplitText훅은 호출 시 아래의 함수를 리턴
	return (ref, txt) => {
		let tags = '';

		for (let letter of txt) {
			tags += `
        <span>${letter}</span>
      `;
		}
		console.log(tags);
		ref.innerHTML = tags;
	};
}
// const result = useSplitText();
