import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './splashscreen.css'; // Archivo de estilos CSS

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Después de 3 segundos, redirigir a la pantalla de login
    const timer = setTimeout(() => {
      history.push('/login'); // Redirige a la página de login
    }, 4000);

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [history]);

  return (
    <div className="splash-container">
      <img src="/public/oso.jpg" alt="Logo" className="splash-logo" />
      <h1 className="splash-title">master.c</h1>
      <img src="/public/vivalafime.jpg" alt="Logo" className="vivalafime" />
    </div>
  );
};

export default SplashScreen;