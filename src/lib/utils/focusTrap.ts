// ! SOURCE: https://gist.github.com/JulienPradet/20dbb7ca06cbd9e2ec499bb2206aab55

type TrapFocusProps = {
	isActive: boolean;
	onClose: () => void;
};

const searchFocusable = (node: HTMLElement) => {
	return node.querySelectorAll(
		'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]'
	) as NodeListOf<HTMLElement>;
};

const trapFocus = (node: HTMLElement, props: TrapFocusProps) => {
	let parentNode: HTMLElement | null = null;
	let disableTrap: (() => void) | undefined;

	const setInitialFocus = () => {
		searchFocusable(node)[0]?.focus();
	};

	const keyboardListener = (event: KeyboardEvent) => {
		if (typeof window === 'undefined' || event.target === window || !parentNode) {
			return;
		}

		const isNext = (event: KeyboardEvent) => event.key === 'Tab' && !event.shiftKey;
		const isPrevious = (event: KeyboardEvent) => event.key === 'Tab' && event.shiftKey;
		const isEscape = (event: KeyboardEvent) => event.key === 'Escape';

		const trapFocusList = searchFocusable(parentNode);

		const first = trapFocusList[0];
		const last = trapFocusList[trapFocusList.length - 1];

		if (isNext(event) && event.target === last) {
			event.preventDefault();
			first.focus();
		} else if (isPrevious(event) && event.target === first) {
			event.preventDefault();
			last.focus();
		} else if (isEscape(event) && disableTrap) {
			disableTrap();
		}
	};

	const clickListener = (event: MouseEvent) => {
		if (
			typeof window === 'undefined' ||
			event.target === window ||
			!parentNode ||
			!disableTrap ||
			parentNode.contains(event.target as Node)
		) {
			return;
		}

		disableTrap();
	};

	const onDestroy = () => {
		parentNode = null;
		disableTrap = undefined;
		document.removeEventListener('keydown', keyboardListener);
		document.removeEventListener('click', clickListener);
	};

	return {
		update: ({ isActive, onClose }: TrapFocusProps) => {
			if (isActive) {
				parentNode = node;
				disableTrap = onClose;
				document.addEventListener('keydown', keyboardListener);

				setTimeout(() => {
					searchFocusable(node)[0]?.focus();
					document.addEventListener('click', clickListener);
				}, 0);
			} else {
				onDestroy();
			}
		},
		destroy: onDestroy
	};
};

export default trapFocus;
