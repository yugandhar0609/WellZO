// import { BrowserRouter as Router } from 'react-router-dom'; // No longer needed here
import AppRoutes from './routes/AppRoutes'; // Import the new routes component

function App() {
  return (
     <AppRoutes /> /* Render the routes component directly */
  );
}

export default App;