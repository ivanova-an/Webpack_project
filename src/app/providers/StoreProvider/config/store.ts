import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { createReducerManager } from 'app/providers/StoreProvider/config/reduserManager';
import { $api } from 'shared/api/api';
import { To } from 'history';
import { NavigateOptions } from 'react-router';
import { CombinedState } from 'redux';
import { StateSchema, ThunkExtraArg } from './StateSchema';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions)=> void,

) {
    // Оставляем те редючеры которые являются обязательными
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };
    // Создадим reducerManager   в createReducerManager(список корневых редюсеров)
    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
        navigate,
    };

    const store = configureStore({
        // добавляем наш reducerManager для работы с редюсерами
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        // в thunk добавили extraArgument который внутри можно использовать
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                // в extraArgument $api будем помещать, чтобы не импортировать в каждый файл с асинкфанком
                extraArgument: extraArg,
            },
        }),
    });

    // к самому Store reducerManager нужно добавить
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

// создаем тип для диспатча, для того чтобы использовать все встроенные методы
// Берем typeof из функции createReduxStore

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
