import Web3 from 'web3';

export async function get() {
	const web3 = new Web3('ws://localhost:8545');
	const accounts: string[] = await web3.eth.getAccounts((errors, acc) => {
		//console.log('what?');
	});

	return {
		body: accounts,
	};
}
