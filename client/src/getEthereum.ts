import detectEthereumProvider from '@metamask/detect-provider'

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

export type Provider = {
  on: (eventType: string, handler: () => unknown) => void;
  request: (args: RequestArguments) => Promise<unknown>;
};

const getEthereum = async (): Promise<Provider | undefined> => {
  const provider = (await detectEthereumProvider()) as Provider;

  if (provider) {

    console.log('Ethereum successfully detected!')
    return provider
  } else {
    // if the provider is not detected, detectEthereumProvider resolves to null
    console.error('Please install MetaMask!')
  }
}
export default getEthereum;
