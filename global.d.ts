import { RootParamList } from './src/routes';

declare module 'expo-router' {
  interface RouterContext {
    paramList: RootParamList;
  }
}