import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonRouterLink, IonText, IonItem, IonLabel, IonIcon } from '@ionic/react';

import './login.css'; 
import { useState } from 'react';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <IonPage>
        <IonContent className="ion-padding login-content">
          <div className="login-container">
            <img src="./public/Wave.png" alt="hand-icon" className="icon" />

            <h2 className="title">Inicia Sesión</h2>

            <p className="subtitle">Ingresa tus datos para comenzar a utilizar la <br></br> aplicación.</p>
  
            <div className="social-buttons">
              <IonButton color="light" className="social-button" expand="block">
              <img src="/public/_Facebook.png" alt="hand-icon" className="iconeye" />
                Facebook
              </IonButton>
              <IonButton color="light" className="social-button" expand="block">
              <img src="/public/_Google.png" alt="hand-icon" className="iconeye" />
                Google
              </IonButton>
            </div>
  
            <div className="or-divider">Or</div>

               
  return (
    <div className="container-inputs">
      <div className="email-field">
        <IonInput 
          type="email" 
          placeholder="Email" 
          className="input-field" 
          clearInput={true} // Permite borrar el input
        />
      </div>

      <div className="password-field">
        <IonInput 
          type={showPassword ? 'text' : 'password'} 
          placeholder="Contraseña" 
          className="input-field"
        >
          {/* Icono de mostrar/ocultar contraseña */}
          <img 
            src="/public/Vector.png" 
            alt="hand-icon" 
            className="" 
            onClick={() => setShowPassword(!showPassword)}
          />
        </IonInput>
        <a href="#" className="forgot-password">Olvidé mi contraseña</a>
      </div>
    </div>
  );

             
                    <div className="login-container">
                    <IonButton expand="block" color="#008000;" className="login-button">Log in</IonButton>
                    
                    <IonRouterLink href="/register" className="register-link">
  ¿No tienes una cuenta? <span>Regístrate</span>
</IonRouterLink>
                    </div>
                    

          
          
          
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;