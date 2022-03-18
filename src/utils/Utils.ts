export function generateUrl(url: string | URL) {
	if (typeof url === 'object') { return url }
	if (!url.includes('://')) { url = 'https://' + url }
	return new URL(url)
}