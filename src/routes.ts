
/*What Should Be in routes.tsx?
For your tab-based Expo Router project with app/(tabs)/index.tsx (Budsjettappen) and app/(tabs)/oversikt.tsx (oversikt), routes.tsx should:

Define a route parameter list (ParamList) for TypeScript to type routes and their parameters.
Export route path constants matching your file structure (e.g., /(tabs)/oversikt).
Optionally include parameter types if your routes accept parameters. */


export type RootParamList = {
    index: undefined;
    overview: undefined;
    
    
};

export const ROUTES = {
    index: '/' as const,
    overview: '/overview' as const,
    
    
};

export type Destination = keyof typeof ROUTES; 
export type RoutePath = '/' | '/overview';




/*
'/newbudget' | '/sifobudget'
newbudget: undefined;
    sifobudget: undefined;
newbudget: '/newbudget' as const,
    sifobudget: '/sifobudget' as const,
    */