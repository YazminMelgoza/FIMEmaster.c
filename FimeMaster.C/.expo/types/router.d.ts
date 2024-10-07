/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/home` | `/inicio/qr/confirmscan` | `/inicio/qr/scan` | `/inicio/quiz/TerminarQuiz` | `/inicio/quiz/crearQuiz` | `/inicio/quiz/quiz` | `/inicio/quiz/resolverBien` | `/inicio/user/historialquiz` | `/login/login` | `/register/confirmation` | `/register/registro` | `/register/verification`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
