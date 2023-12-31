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
import WorkshopComponent from './components/Workshop';
import ComandosComponent from './components/Comandos';
import StandarComponent from './components/Standar';
import MulticallComponent from './components/Multicall';
import Multicall2Component from './components/Multicall2';
import UniversalComponent from './components/Universal';

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
                <Link to="/" className="link text-sm">
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
                  NHT
                </Link>
              </li>
              <li className="mr-4">
                <Link to="/starknet-es" className="link">
                  Starknet-ES
                </Link>
              </li>
              <li>
                <Link to="/Workshop" className="link">
                  Workshop
                </Link>
              </li>
              <li>
                <Link to="/Comandos" className="link">
                  Terminal
                </Link>
              </li>
              <li>
                <Link to="/Standar" className="link">
                  Standar
                </Link>
              </li>
              <li>
                <Link to="/Universal" className="link">
                  Universal
                </Link>
              </li>
              <li>
                <Link to="/Multicall" className="link">
                  Multicall
                </Link>
              </li>
              <li>
                <Link to="/Multicall2" className="link">
                  Multicall x100
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
                <Route path="/Workshop" element={<WorkshopPage />} />
                <Route path="/Comandos" element={<ComandosPage />} />
                <Route path="/Standar" element={<StandarPage />} />
                <Route path="/Multicall" element={<MulticallPage />} />
                <Route path="/Multicall2" element={<Multicall2Page />} />
                <Route path="/Universal" element={<UniversalPage />} />
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
      👨‍🎓 Nadai's Cairo Learning dApp 👩‍🎓
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

function WorkshopPage() {
  return <WorkshopComponent />;
}

function ComandosPage() {
  return <ComandosComponent />;
}

function StandarPage() {
  return <StandarComponent />;
}

function UniversalPage() {
  return <UniversalComponent />;
}
  
function MulticallPage() {
  return <MulticallComponent />;
}

function Multicall2Page() {
  return <Multicall2Component />;
}
  
export default App;
