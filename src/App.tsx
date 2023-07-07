import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useAccount } from '@starknet-react/core';
import Connect from './components/Connect';
import Info from './components/Info';
import SignForm from './components/SignForm';
import TokenForm from './components/TokenForm';
import NetworkInfo from './components/NetworkInfo';
import Home from './components/Home';
import HDSComponent from './components/HDS';
import StarknetESComponent from './components/StarknetEs';
import NHSComponent from './components/NftForm';

function App() {
  const { isConnected } = useAccount();

  return (
    <Router>
      <div className="h-full p-4 flex flex-col">
        {/* Menú */}
        {isConnected && (
          <nav className="mb-4">
            <ul className="flex justify-end">
              <li>
                <Info />
              </li>
              <li className="ml-auto mr-4">
                <Link to="/" className="link">
                  Inicio
                </Link>
              </li>
              <li className="mr-4">
                <Link to="/hds" className="link">
                  HDS
                </Link>
              </li>
              <li className="mr-4">
                <Link to="/NHS" className="link">
                  NHS
                </Link>
              </li>
              <li className="mr-4">
                <Link to="/starknet-es" className="link">
                  Starknet-ES
                </Link>
              </li>
              <li className="ml-auto mr-4">
                <SignForm />
              </li>
            </ul>
          </nav>
        )}

        {/* Contenido principal */}
        <div className="flex-1 flex items-center text-center justify-center h-full">
          {isConnected ? (
            <div className="flex flex-col">
              {/* Contenido de la pestaña activa */}
              <Routes>
                <Route path="/" element={<HomeWithTokenForm />} />
                <Route path="/NHS" element={<NHSPage />} />
                <Route path="/hds" element={<HDSPage />} />
                <Route path="/starknet-es" element={<StarknetESPage />} />
              </Routes>
            </div>
          ) : (
            <Connect />
          )}
        </div>

        <NetworkInfo />
      </div>
    </Router>
  );
}

function HomeWithTokenForm() {
  const { isConnected, } = useAccount();

  if (!isConnected) {
    return <Connect />;
  }

  return (
    <>
      <div>
      <h1 className="title text-4xl shadowed" style={{ marginBottom: "50px" }}>
       Nadai Starknet Dapp
      </h1>
     </div>
      <TokenForm /> 
      <Home />
    </>
  );
}


function HDSPage() {
  return (
    <>
     {window.location.pathname === '/hds' && <HDSComponent />}
    </>
  );
}

function StarknetESPage() {
  return <StarknetESComponent />;
}

function NHSPage() {
  return <NHSComponent />;
}

export default App;
