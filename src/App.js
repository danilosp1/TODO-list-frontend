import { ProvideAuth } from './hooks/useAuth';
import LoginForm from './components/LoginForm'

function App() {
  return (
    <ProvideAuth>
      <div>
        hahaha
        <LoginForm></LoginForm>
      </div>
    </ProvideAuth>
  );
}

export default App;
