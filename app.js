import { Slot } from "expo-router";
import { useEffect } from "react";
import { initDB } from "./utils/sqlite";

export default function AppLayout() {
  useEffect(() => {
    initDB(); // Inicializa la base de datos SQLite al inicio
  }, []);

  return <Slot />;
}
