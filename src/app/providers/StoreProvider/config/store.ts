import { configureStore, DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { createReducerManager } from 'app/providers/StoreProvider/config/reduserManager';
import { StateSchema } from './StateSchema';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    // Оставляем те редючеры которые являются обязательными
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };
    // Создадим reducerManager   в createReducerManager(список корневых редюсеров)
    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore<StateSchema>({
        // добавляем наш reducerManager
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });

    // к самому Store reducerManager нужно добавить
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
