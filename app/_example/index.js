// app/index.js
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    router.replace('/login'); // Redirige automáticamente al login
  }, []);

  return null;
}
