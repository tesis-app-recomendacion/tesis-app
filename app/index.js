// app/index.js
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Index() {
  const { user, authLoaded } = useContext(AuthContext);

  useEffect(() => {
    if (!authLoaded) return;
    if (user) {
      router.replace("/(tabs)/recomendador");
      print("logueado")
    } else {
      router.replace("/login");
    }
  }, [authLoaded, user]);

  return null;
}
