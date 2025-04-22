// src/components/SignUp.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';  // Asegúrate de importar el cliente de Supabase

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            // Registro del usuario con email y contraseña en Supabase
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                console.error('Error registrando el usuario:', error.message);
            } else {
                console.log('Usuario registrado con éxito:', user);
                // Guardar el perfil en la tabla `profiles` de Supabase
                await saveUserProfile(user);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const saveUserProfile = async (user) => {
        try {
            // Guardar los datos adicionales del usuario (como email) en la tabla `profiles`
            const { data, error } = await supabase.from('profiles').upsert({
                auth_user_id: user.id,  // ID único de Supabase
                email: user.email,
                nombre: 'Nombre por defecto',  // Puedes agregar más campos como nombre, etc.
            });

            if (error) {
                console.error('Error guardando el perfil:', error.message);
            } else {
                console.log('Perfil guardado correctamente:', data);
            }
        } catch (error) {
            console.error('Error al guardar el perfil:', error.message);
        }
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default SignUp;
