import React from 'react';
import Swal from 'sweetalert2';
import { HiTrash } from 'react-icons/hi2';

export default function DeleteButton({ onConfirm, className = "" }) {

    const handleTriggerDelete = async () => {
        Swal.fire({
            title: 'តើអ្នកប្រាកដទេ?',
            text: 'ទិន្នន័យនេះនឹងត្រូវបានលុបជាអចិន្ត្រៃយ៍!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'បាទ/ចាស លុបវា!',
            cancelButtonText: 'បោះបង់',
            reverseButtons: true
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                await onConfirm?.();
            } catch (error) {
                Swal.fire({
                    title: 'ការលុបបរាជ័យ',
                    text: error?.message || 'មិនអាចលុបទិន្នន័យបានទេ។',
                    icon: 'error'
                });
            }
        });
    };

    return (
        <button
            onClick={handleTriggerDelete}
            className={`text-red-600 hover:text-red-900 transition-colors ${className}`}
            title="លុបធាតុ"
        >
            <HiTrash className="h-4 w-4" />
        </button>
    );
}