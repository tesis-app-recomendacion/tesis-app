import { db } from "./sqlite";

export const recomendarSimuladores = (perfilDocente, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM simuladores`,
      [],
      (_, { rows }) => {
        const recomendados = [];

        for (let i = 0; i < rows.length; i++) {
          const sim = rows.item(i);

          if (
            sim.nivel_educativo === perfilDocente.nivel_educativo &&
            sim.compatibilidad.includes(perfilDocente.dispositivo)
          ) {
            recomendados.push(sim);
          }
        }

        callback(recomendados);
      }
    );
  });
};
