import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Import the new routes component

function App() {
  return (
    <Router>
      <AppRoutes /> {/* Render the routes component */}
    </Router>
  );
}

export default App;