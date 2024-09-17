import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonText, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { logoFacebook, logoGoogle,  } from 'ionicons/icons';
import { useForm, Controller } from 'react-hook-form';
import './register.css'; // Puedes agregar un archivo CSS para personalización
import { useState } from 'react';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <IonPage>
        <IonContent className="ion-padding login-content">
          <div className="login-container">
            <img src="./public/oso.jpg" alt="hand-icon" className="icon" />

            <h2 className="title">Regístrate</h2>

            <p className="subtitle">Crea una nueva cuenta para comenzar a aprender</p>
  
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
    <div>
        <div className="email-field">
            <IonInput
                type="text"
                 placeholder="Nombre" 
          className="input-field"
            />
        </div>

        <div className="email-field">
            <IonInput
                type="text"
                 placeholder="Apellido" 
          className="input-field"
            />
        </div>

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
            className="iconeye" 
            onClick={() => setShowPassword(!showPassword)}
          />
        </IonInput>
        <a href="#" className="forgot-password">Olvidé mi contraseña</a>
      </div>
    </div>
  );

             
                    <div className="login-container">
                    <IonButton expand="block" color="#008000;" className="login-button">Log in</IonButton>
                    
                <a href="Register.tsx" className="register-link">¿No tienes una cuenta? <span>Regístrate</span></a>
                    </div>
                    

          
          
          
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Register;