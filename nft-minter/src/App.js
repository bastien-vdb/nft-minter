import Minter from './components/Minter/Minter';
import './App.css';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

function App() {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <Minter />
    </ThirdwebProvider>
  );
}

export default App;
