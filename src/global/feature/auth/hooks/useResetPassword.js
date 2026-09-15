import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/validations/auth.schema';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '@/api/endpoints';
import axiosClient from '@/api/axiosClient';
export default function useResetPassword(token) {
    const [loading, setLoading] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    });

    const resetPassword = useCallback(
        async (data) => {
            if (!token) {
                const message =
                    'Token is missing. Please check the reset password link.';

                setError(message);

                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message,
                    confirmButtonColor: '#2212ac',
                });

                return;
            }

            try {
                setLoading(true);
                setError(null);

                await axiosClient.post(
                    API_ENDPOINTS.SETTINGS.RESET_PASSWORD,
                    {
                        token,
                        newPassword: data.newPassword,
                    }
                );

                setIsPasswordReset(true);

                reset();

                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your password has been reset successfully.',
                    confirmButtonColor: '#2212ac',
                });
            } catch (error) {
                console.error(
                    'Error occurred while resetting password:',
                    error
                );

                const message =
                    error?.response?.data?.message ||
                    'An error occurred while resetting your password. Please try again.';

                setError(message);

                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message,
                    confirmButtonColor: '#2212ac',
                });
            } finally {
                setLoading(false);
            }
        },
        [token, reset]
    );

    return {
        register,
        handleSubmit,
        errors,
        loading,
        isPasswordReset,
        error,
        resetPassword,
    };
}