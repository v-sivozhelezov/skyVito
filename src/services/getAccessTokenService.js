import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuth } from '../redux/slices/authSlice';

const baseQueryWithReauth = async (args, api, extraOptions) => {
    console.log(args);
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

    if (args.url === '/auth/register') {
        return result;
    }

    if (
        result?.error?.status !== 401 ||
        result?.error?.data?.detail === 'Incorrect password'
    ) {
        return result;
    }

    const forceLogout = () => {
        console.debug('Принудительная авторизация!');
        // api.dispatch(setAuth(null));
        // localStorage.setItem('access_token', null);
        window.location.assign('/profile');
    };

    const { auth } = api.getState();
    console.debug('Данные пользователя в сторе', { auth });
    if (!auth.refresh) {
        return forceLogout();
    }

    const refreshResult = await baseQuery(
        {
            url: '/auth/login/',
            method: 'PUT',
            body: {
                access_token: auth.access,
                refresh_token: auth.refresh,
            },
        },
        api,
        extraOptions,
    );

    console.debug('Результат запроса на обновление токена', { refreshResult });

    if (!refreshResult.data?.access_token) {
        return forceLogout();
    }

    api.dispatch(
        setAuth({
            ...auth,
            access: refreshResult.data?.access_token,
            refresh: refreshResult.data?.refresh_token,
        }),
    );

    const retryResult = await baseQuery(args, api, extraOptions);

    if (retryResult?.error?.status === 401) {
        return forceLogout();
    }

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
        fetchPostRegister: build.mutation({
            query: ({ email, password, city, firstName, lastName, phone }) => ({
                method: 'POST',
                url: '/auth/register',
                body: JSON.stringify({
                    email,
                    password,
                    city,
                    name: firstName,
                    surname: lastName,
                    phone,
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
        getCurrentUser: build.query({
            query: () => ({
                url: '/user',
            }),
            providesTags: ['User'],
        }),

        getAuthUser: build.mutation({
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
        editPasswordUser: build.mutation({
            query: (body) => ({
                method: 'PUT',
                url: '/user/password',
                body,
            }),
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
        deleteImageAdv: build.mutation({
            query: ({ id, url }) => {
                return {
                    method: 'DELETE',
                    url: `/ads/${id}/image`,
                    body: JSON.stringify({ file_url: url }),
                };
            },
            invalidatesTags: ['Ads'],
        }),
        editAdv: build.mutation({
            query: ({ id, data }) => ({
                url: `/ads/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Ads'],
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useGetAuthUserMutation,
    useEditUserMutation,
    useEditPasswordUserMutation,
    useEditUserImgMutation,
} = userAPI;

export const {
    useAddAdvTextMutation,
    useDeleteAdvMutation,
    useGetReviewsForAdvQuery,
    useAddReviewForAdvMutation,
    useUploadImageAdvMutation,
    useEditAdvMutation,
    useDeleteImageAdvMutation,
} = adsAPI;
