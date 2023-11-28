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
export function useCustomText(type) {
	const toUpperText = (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	};
	if (type === 'title') {
		return (txt) => {
			return txt.charAt(0).toUpperCase() + txt.slice(1);
		};
	}
	if (type === 'shorten') {
		return (txt, len) => {
			if (txt.length > len) {
				return txt.slice(0, len) + '...';
			} else {
				return txt;
			}
		};
	}
	if (type === 'combined') {
		return (txt, spc) => {
			let resultText = txt
				.split(/-|_|\+/)
				.map((data) => toUpperText(data))
				.join(' ');
			console.log('resultText', resultText);
			return resultText;
		};
	}
}
