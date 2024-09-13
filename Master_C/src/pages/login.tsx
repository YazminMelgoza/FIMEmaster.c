import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonText, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { logoFacebook, logoGoogle,  } from 'ionicons/icons';
import { useForm, Controller } from 'react-hook-form';
import './login.css'; // Puedes agregar un archivo CSS para personalización
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
            <img src="/public/Wave.png" alt="hand-icon" className="icon" />
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
  
            <IonInput type="email" placeholder="Email" className="input-field">
            
            </IonInput>
            <div className="password-field">
              <IonInput type={showPassword ? 'text' : 'password'} placeholder="Contraseña" className="input-field">
              <img src="/public/Vector.png" alt="hand-icon" className="iconeye" />
              </IonInput>
              

            </div>
                <a href="#" className="forgot-password">Olvidé mi contraseña</a>
                     <IonButton expand="block" color="#008000;" className="login-button">Log In</IonButton>
                <a href="#" className="register-link">¿No tienes una cuenta? <span>Regístrate</span></a>
          </div>
          <div>
          
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;