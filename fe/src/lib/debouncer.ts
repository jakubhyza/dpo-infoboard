export function createDebouncer(delay: number) {
	let timeout: NodeJS.Timeout | undefined;
	return function (fn: () => void) {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(fn, delay);
	};
}
