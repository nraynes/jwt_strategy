import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';
import AppProvider from './providers/appProvider';

function App() {
  return (
    <Router>
      <div className="App">
        <AppProvider>
          <AppRoutes/>
        </AppProvider>
      </div>
    </Router>
  );
}

export default App;
