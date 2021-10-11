import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';
import AppProvider from './providers/AppProvider';

function App() {
  return (
    <div className="App">
      <Router>
        <AppProvider>
          <AppRoutes/>
        </AppProvider>
      </Router>
    </div>
  );
}

export default App;
