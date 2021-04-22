<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<script>
	import { ethStore, web3, selectedAccount, connected, chainName } from 'svelte-web3';

	export let tipAddress;

	const enable = () => ethStore.setProvider('ws://localhost:8545');
	const enableBrowser = () => ethStore.setBrowserProvider();

	$: checkAccount = $selectedAccount || '0x0000000000000000000000000000000000000000';
	$: balance = $connected ? $web3.eth.getBalance(checkAccount) : '';

	const sendTip = async (e) => {
		console.log('Received move event (sendTip button)', e);
		const tx = await $web3.eth.sendTransaction({
			gasPrice: $web3.utils.toHex($web3.utils.toWei('5', 'gwei')),
			gasLimit: $web3.utils.toHex('21000'),
			from: $selectedAccount,
			to: tipAddress,
			value: $web3.utils.toHex($web3.utils.toWei('1', 'finney')),
		});
		console.log('Receipt from sendTip transaction', tx);
		alert('Thanks!');
	};
</script>

<main>
	<p>Web3 injected in window: {window.Web3 ? 'yes' : 'no'}</p>
	<p>Web3 version: {$web3.version} </p>

	{#if $web3.version}
		<p>
			<button on:click="{enableBrowser}">connect to the browser window provider </button> (eg Metamask)
		</p>
	{/if}

	{#if $connected}
		<p>
			Connected chain: {$chainName}
		</p>
		<p>
			Selected account: {$selectedAccount || 'not defined'}
		</p>

		<p>
			Balance:
			{#await balance}
				<span>waiting...</span>
			{:then value}
				<span>{value}</span>
			{/await}
		</p>
		<!-- 
		{#if $selectedAccount}
			<p><button on:click="{sendTip}">send 0.01 {$nativeCurrency.symbol} tip to {tipAddress} (author)</button></p>
		{/if} -->
	{/if}
</main>
