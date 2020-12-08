import Sidebar from './Sidebar'
import Chat from './Chat'
import './App.css';

function App() {
  return (
    // BEM naming convention
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
