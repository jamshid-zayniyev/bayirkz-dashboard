import { apiSlice } from './apiSlice';
import { setToken, removeToken, getToken } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';

// Mock login response for development
const mockLoginResponse = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.mMSYCImSU1lis_Fwz0tQH4YjbXcg-H3Mq3wXJPg8jZ4"
};

// Extend the API slice with auth-related endpoints
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // Transform the response to handle token storage
      async onQueryStarted(credentials, { queryFulfilled, dispatch }) {
        try {
          // Check if we're using mock API
          const useMockApi = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API === 'true';
          
          if (useMockApi) {
            // Use mock data
            setToken(mockLoginResponse.token);
            return { data: mockLoginResponse };
          }
          
          // Otherwise, use the real API
          const { data } = await queryFulfilled;
          
          // Store the token in localStorage
          if (data.token) {
            setToken(data.token);
          }
        } catch (error) {
          console.error('Login failed:', error);
          
          // If we're in development mode and using mock API, use mock data even on error
          const useMockApi = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API === 'true';
          if (useMockApi) {
            setToken(mockLoginResponse.token);
            return { data: mockLoginResponse };
          }
        }
      },
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      // Remove the token on logout
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Logout failed:', error);
        } finally {
          // Always remove token regardless of API response
          removeToken();
        }
      },
    }),
  }),
});

// Extract the user information from the JWT token
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.sub,
      username: decoded.name,
      email: decoded.email,
      role: decoded.role,
      exp: decoded.exp,
    };
  } catch (error) {
    console.error('Invalid token:', error);
    removeToken();
    return null;
  }
};

// Export the generated hooks
export const { useLoginMutation, useLogoutMutation } = authApi;