import { ProvideAuth } from './hooks/useAuth';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
