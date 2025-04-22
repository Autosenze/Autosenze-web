import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';  // Asegúrate de que supabaseClient.js esté correctamente importado

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Estado para el usuario autenticado

  useEffect(() => {
    // Verificar sesión actual del usuario
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser(); // Cambié de user() a getUser()

      if (error) {
        console.error('Error al obtener el usuario:', error.message);
        setUser(null);
      } else {
        console.log('Usuario autenticado:', data);
        setUser(data.user); // Establecer el usuario autenticado
      }
    };

    getUser();  // Llamamos a la función para obtener el usuario

    const fetchData = async () => {
      if (user) {
        // Si el usuario está autenticado, consulta la tabla `profiles`
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('auth_user_id', user.id); // Asegúrate de que los perfiles que se devuelven sean solo los del usuario autenticado

        if (error) {
          console.error('Error al obtener los datos:', error);
        } else {
          console.log('Datos de profiles:', data);
          setProfiles(data); // Guardar los datos en el estado
        }
      } else {
        console.log('No hay usuario autenticado');
      }
      setLoading(false); // Deja de mostrar "Cargando..." cuando se obtiene la respuesta
    };

    fetchData();
  }, [user]); // El useEffect se ejecuta cada vez que el usuario cambia

  return (
    <div className="App">
      <h1>Bienvenido a AutoSenze!</h1>
      <h2>Perfiles:</h2>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <ul>
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <li key={profile.id}>
                {profile.nombre} - {profile.email} - {profile.role}
              </li>
            ))
          ) : (
            <p>No hay perfiles o no se pudieron cargar.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
