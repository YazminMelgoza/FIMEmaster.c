/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/TerminarQuiz` | `/_sitemap` | `/confirmation` | `/confirmscan` | `/crearQuiz` | `/historialquiz` | `/home` | `/login` | `/quiz` | `/registro` | `/resolverBien` | `/scan` | `/splashscreen` | `/verification`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
