export function wait(ms = 0) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
// Async function to destroy popup
export async function destroyPopup(popup) {
	popup.classList.remove('open');
	await wait(200);
	popup.remove();
	popup = null;
}
