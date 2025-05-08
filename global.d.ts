import { RootParamList } from './app/routes';

declare module 'expo-router' {
  interface RouterContext {
    paramList: RootParamList;
  }
}