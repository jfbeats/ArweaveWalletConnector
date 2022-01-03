import { ArweaveWebWallet } from 'arweave-wallet-connector';
import type { AppInfo } from 'arweave-wallet-connector';
import { dev } from '$app/env';

export class ReactiveWallet extends ArweaveWebWallet {
	state = {
		url: dev ? 'http://localhost:8080' : 'https://arweave.app',
		address: undefined as undefined | string,
		keepPopup: false,
		error: ''
	};

	constructor(appInfo?: AppInfo, url?: string) {
		super(appInfo, url);

		this.on('connect', (address) => {
			this.state.address = address;
		});
		this.on('disconnect', () => (this.state.address = undefined));
		this.on('keepPopup', (keep) => (this.state.keepPopup = keep));
	}
	get url() {
		return this.state.url;
	}
	get address() {
		return this.state.address;
	}
	get keepPopup() {
		return this.state.keepPopup;
	}
	set keepPopup(value) {
		super.keepPopup = value;
	}
	get error() {
		return this.state.error;
	}
	set error(value) {
		this.state.error = value;
	}
}
