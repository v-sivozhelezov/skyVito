import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuth } from '../redux/slices/authSlice';

const baseQueryWithReauth = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: 'http://localhost:8090/',

        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.access;
            console.debug('Использую токен из стора', { token });
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });

    const result = await baseQuery(args, api, extraOptions);
    console.debug('Результат первого запроса', { result });

    if (result?.error?.status !== 401) {
        return result;
    }

    // const forceLogout = () => {
    //     console.debug('Принудительная авторизация!');
    //     api.dispatch(setAuth(null));
    //     window.location.assign('/auth');
    // };

    const { auth } = api.getState();
    console.debug('Данные пользователя в сторе', { auth });
    // if (!auth.refresh) {
    //     return forceLogout();
    // }

    const refreshResult = await baseQuery(
        {
            url: '/auth/login',
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: auth.refresh,
                access_token: auth.access,
            }),
        },
        api,
        extraOptions,
    );

    console.debug('Результат запроса на обновление токена', { refreshResult });

    // if (!refreshResult?.data?.access) {
    //     return forceLogout();
    // }

    api.dispatch(
        setAuth({
            ...auth,
            access: refreshResult.data.access,
            refresh: refreshResult.data.refresh,
        }),
    );

    const retryResult = await baseQuery(args, api, extraOptions);

    // if (retryResult?.error?.status === 401) {
    //     return forceLogout();
    // }

    console.debug('Повторный запрос завершился успешно');

    return retryResult;
};

export const getAccessTokenAPI = createApi({
    reducerPath: 'getAccessTokenAPI',
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        postAccessToken: build.mutation({
            query: ({ email, password }) => ({
                method: 'POST',
                url: '/auth/login',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    'content-type': 'application/json',
                },
            }),
        }),
        postRefreshAccessToken: build.mutation({
            query: () => ({
                url: '/auth/login',
                method: 'PUT',
                body: JSON.stringify({
                    refresh: localStorage.getItem('refresh'),
                }),
                headers: {
                    'content-type': 'application/json',
                },
            }),
        }),
    }),
});

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (build) => ({
        getAuthUser: build.query({
            query: () => ({
                url: '/user',
            }),
            providesTags: ['User'],
        }),
        editUser: build.mutation({
            query: (body) => ({
                method: 'PATCH',
                url: '/user',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        editUserImg: build.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/user/avatar',
                body,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const adsAPI = createApi({
    reducerPath: 'adsAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Ads'],
    endpoints: (build) => ({
        getAllAds: build.query({
            query: () => ({
                url: '/ads',
            }),
            providesTags: ['Ads'],
        }),
        getChoseAdv: build.query({
            query: (pk) => ({
                url: `/ads/${pk}`,
            }),
            providesTags: ['Ads'],
        }),
        getReviewsForAdv: build.query({
            query: (pk) => ({
                url: `/ads/${pk}/comments`,
            }),
            providesTags: ['Ads'],
        }),
        addReviewForAdv: build.mutation({
            query: ({ id, comment }) => ({
                url: `/ads/${id}/comments`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: { text: comment },
            }),
            invalidatesTags: ['Ads'],
        }),

        addAdvText: build.mutation({
            query: (body) => ({
                url: `/adstext`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Ads'],
        }),
        deleteAdv: build.mutation({
            query: (id) => ({
                url: `/ads/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ads'],
        }),
        uploadImageAdv: build.mutation({
            query: ({ id, formData }) => {
                return {
                    method: 'POST',
                    url: `/ads/${id}/image`,
                    body: formData,
                };
            },
            invalidatesTags: ['Ads'],
        }),
    }),
});

export const {
    useGetAuthUserQuery,
    useEditUserMutation,
    useEditUserImgMutation,
} = userAPI;

export const {
    useAddAdvTextMutation,
    useDeleteAdvMutation,
    useGetReviewsForAdvQuery,
    useAddReviewForAdvMutation,
    useUploadImageAdvMutation,
} = adsAPI;
