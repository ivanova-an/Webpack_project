import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';
import { To } from 'history';
import { NavigateOptions } from 'react-router';
import { AxiosInstance } from 'axios';
import { CombinedState } from 'redux';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateSchema;

// тип для reducerManager
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state:StateSchema, action: AnyAction) =>CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) =>void;
    remove: (key: StateSchemaKey) => void
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema>{
    reducerManager : ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
    navigate?: (to: To, options?: NavigateOptions)=> void,
}

// чтобы типизовать { rejectValue: string, extra: ThunkExtraArg } мы создаем interface. Этот тип принимает T для ошибки

export interface ThunkConfig<T> {
    // т.e. будем определять откуда-то из вне
    rejectValue: T;
    extra: ThunkExtraArg
}
