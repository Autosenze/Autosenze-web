import { createClient } from '@supabase/supabase-js';

// Coloca aquí la URL de tu proyecto y la clave que obtuviste de Supabase
const supabaseUrl = 'https://hvpfnlxhhcjhfrvwrdns.supabase.co';  // URL de tu proyecto en Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cGZubHhoaGNqaGZydndyZG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwOTM4MzEsImV4cCI6MjA1ODY2OTgzMX0.J1m7hAK6hxmApAuyGGeyi92iEeYcyo03QvM5YtBq-f4';  // La clave anon de tu API

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
