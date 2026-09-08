import React from 'react'
import { useDeliveryProvidersQuery } from '../../../../queries/deliveryProviders/useDeliveryProviderQueries'

export default function OrderFormFields({ register, errors, setValue }) {
  const { data: providers = [] } = useDeliveryProvidersQuery()
  const activeProviders = providers.filter(p => p.is_active == 1)

  const handleProviderChange = (e) => {
    const providerId = e.target.value
    const provider = activeProviders.find(p => p.id.toString() === providerId)
    if(!provider) {
      setValue('deliveryFee', 0)
    }
    if (provider && setValue) {
      setValue('deliveryFee', provider.shipping_fee)
    }
  }
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">ព័ត៌មានអតិថិជន</h3>

      {/* Phone Number */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">លេខទូរស័ព្ទ</label>
        <div 
          className={`flex items-center w-full bg-slate-50 border rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors ${
            errors.phone ? 'border-red-500' : 'border-slate-200'
          }`}
        >
          <div className="pl-3.5 pr-2 py-2 text-slate-600 text-sm font-semibold select-none flex items-center bg-slate-100 border-r border-slate-200 h-full">
            +855 <span className="text-slate-300 ml-1.5 text-xs">|</span>
          </div>
          <input
            type="tel"
            placeholder="12 345 678"
            className="flex-1 px-3 py-2 bg-transparent text-sm text-slate-800 focus:outline-hidden"
            {...register('phone', {
              onChange: (e) => {
                // Keep only numeric characters
                e.target.value = e.target.value.replace(/\D/g, '');
              }
            })}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">អាសយដ្ឋាន</label>
        <textarea
          {...register('address')}
          placeholder="បញ្ចូលអាសយដ្ឋាន"
          rows={3}
          className={`w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:border-blue-500 transition-colors resize-y ${
            errors.address ? 'border-red-500' : 'border-slate-200'
          }`}
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Delivery Provider */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">អ្នកដឹកជញ្ជូន</label>
        <select 
          {...register('deliveryProviderId')}
          onChange={handleProviderChange}
          className={`w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:border-blue-500 transition-colors border-slate-200`}
        >
          <option value="">ជ្រើសរើសអ្នកដឹកជញ្ជូន</option>
          {activeProviders.map(p => (
            <option 
            key={p.id} value={p.id}>{p.name} - ${parseFloat(p.shipping_fee).toFixed(2)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}