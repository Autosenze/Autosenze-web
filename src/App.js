import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import Login from './components/Login'; // 👉 Importa el nuevo componente

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Al iniciar, verifica si ya hay sesión activa
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    };
    getUser();
  }, []);

  // Cuando hay usuario, busca su perfil
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('auth_user_id', user.id);

        if (!error) {
          setProfiles(data);
        }
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>Bienvenido a AutoSenze!</h1>

      {!user ? (
        <Login onLogin={setUser} />
      ) : loading ? (
        <p>Cargando perfil...</p>
      ) : (
        <>
          <h2>Perfil:</h2>
          {profiles.length > 0 ? (
            <ul>
              <li>
                <strong>{profiles[0].nombre}</strong> – {profiles[0].email} – Rol: {profiles[0].role}
              </li>
            </ul>
          ) : (
            <p>No se pudo cargar tu perfil.</p>
          )}
          <button onClick={handleLogout} style={{ marginTop: '20px' }}>
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}

export default App;
