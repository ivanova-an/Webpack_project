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
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticlePageSchema } from 'pages/ArticlesPage';
import { UISchema } from 'features/UI';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    ui: UISchema;
    // поля не обязательны, потому что редюсеры будут асинхронные
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlePageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
// тип для reducerManager
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state:StateSchema, action: AnyAction) =>CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) =>void;
    remove: (key: StateSchemaKey) => void
    getMountedReducers: () => MountedReducers;
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema>{
    reducerManager : ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
}

// чтобы типизовать { rejectValue: string, extra: ThunkExtraArg } мы создаем interface. Этот тип принимает T для ошибки

export interface ThunkConfig<T> {
    // т.e. будем определять откуда-то из вне
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
