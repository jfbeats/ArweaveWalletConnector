type Connection = { namespaces: { [namespace: string]: any } }

let interval: any
const connectors = [] as Connection[]
const loaded = {} as { [name: string]: Connection }
const swaps = {} as { [name: string]: any }

export function load (connector: Connection) {
	if (!connector.namespaces) { return }
	if (!connectors.find(c => c === connector)) { connectors.push(connector) }
	update()
}

export function unload (connector: Connection) {
	if (!connectors.find(c => c === connector)) { return update() }
	connectors.splice(connectors.indexOf(connector), 1)
	for (const namespace in connector.namespaces) {
		if (loaded[namespace] !== connector) { continue }
		window[namespace as any] = swaps[namespace]
		delete swaps[namespace]
		delete loaded[namespace]
	}
	update()
}

function update () {
	for (const connector of connectors) { for (const namespace in connector.namespaces) {
		if (loaded[namespace] && loaded[namespace] !== connector) { continue }
		if (window[namespace as any] === connector.namespaces[namespace]) { continue }
		swaps[namespace] = window[namespace as any]
		window[namespace as any] = connector.namespaces[namespace]
		loaded[namespace] = connector
	}}
	window.clearInterval(interval)
	if (connectors.length) { interval = setInterval(() => update(), 10000) }
}