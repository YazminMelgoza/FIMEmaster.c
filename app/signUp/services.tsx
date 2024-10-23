import { supabase } from '../../lib/supabase';
//Para registrar el usuario
async function createUser(email: string, password: string, firstName: string, lastName: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error.message);
  } else {
    const { user } = data;
    if (user) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          { 
            email: email, 
            first_name: firstName, 
            last_name: lastName,
            userid: user.id, // Ensure this matches the correct user ID column in your database
            password: password
          }
        ]);

      if (insertError) {
        
        console.log(insertError.message);
      } else {
       
      }
    }
  }

 
}
export default createUser;

//Para Iniciar sesión
