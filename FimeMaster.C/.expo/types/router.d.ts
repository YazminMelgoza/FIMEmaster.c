/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/firstscreen` | `/(tabs)/register` | `/(tabs)\TerminarQuiz` | `/(tabs)\_layout` | `/(tabs)\crearQuiz` | `/(tabs)\login` | `/(tabs)\registro` | `/(tabs)\resolverBien` | `/_sitemap` | `/explore` | `/firstscreen` | `/quiz` | `/register`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
