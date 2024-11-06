import { useNavigate } from 'react-router-dom';

export function Page404(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
}
