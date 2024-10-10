/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(inicio)` | `/(inicio)/home` | `/(inicio)/qr` | `/(inicio)/qr/confirmscan` | `/(inicio)/qr/scan` | `/(inicio)/quiz/TerminarQuiz` | `/(inicio)/quiz/crearQuiz` | `/(inicio)/quiz/quiz` | `/(inicio)/quiz/resolverBien` | `/(inicio)/user/historialquiz` | `/_sitemap` | `/home` | `/login/login` | `/login\login` | `/qr` | `/qr/confirmscan` | `/qr/scan` | `/quiz/TerminarQuiz` | `/quiz/crearQuiz` | `/quiz/quiz` | `/quiz/resolverBien` | `/register/confirmation` | `/register/registro` | `/register/verification` | `/user/historialquiz`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
