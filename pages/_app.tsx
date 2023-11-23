import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../src/components/Layout';
import wrapper from 'src/store/configureStore';
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
