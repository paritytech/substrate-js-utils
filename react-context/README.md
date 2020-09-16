## Available Scripts

This repo contains a set of utilities provided as react context.

### Usage example

## With Polkadot-js api

in your App.jsx (or App.tsx)
```js
import { ApiPromiseContextProvider } from '@substrate/react-context';


const WS_PROVIDER = process.env.REACT_APP_WS_PROVIDER;

const App = () => {

	if (!WS_PROVIDER) {
		console.error('REACT_APP_WS_PROVIDER not set');
		return null;
	}

	const provider = new WsProvider(WS_PROVIDER);

	return (
		<ApiPromiseContextProvider provider={provider}>
			<MainApp />      
		</ApiPromiseContextProvider>
	);
};

```

Then you can access the api anywhere in your app using the hook `useContext(ApiPromiseContext)`:

```js
import { ApiPromiseContext } from '@substrate/react-context';

export default function ()  {
		// get the api and the isApiReady flag
		const { api, isApiReady } = useContext(ApiPromiseContext);

	useEffect(() => {
		// return early if the api is not ready
		if (!isApiReady) {
			return;
		}

		let unsubscribe: () => void;

		// use the api
		api.derive.chain.bestNumber((number) => {
			setCurrentBlock(number);
		})
			.then(unsub => {unsubscribe = unsub;})
			.catch(e => console.error(e));

		return () => unsubscribe && unsubscribe();
	}, [api, isApiReady]);
}
```
