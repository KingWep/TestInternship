import React from 'react'
import { useDeliveryProvidersQuery } from '../../../../queries/deliveryProviders/useDeliveryProviderQueries'
import { useTranslation } from 'react-i18next'

export default function OrderFormFields({ register, errors, setValue }) {
  const { t } = useTranslation()
  const { data: providers = [] } = useDeliveryProvidersQuery()
  const activeProviders = providers.filter(p => p.is_active == 1)


  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">{t('order.customerInfo')}</h3>

      {/* Phone Number */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">{t('order.phone')}</label>
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
        <label className="block text-xs font-semibold text-slate-600 mb-1">{t('order.addressLabel')}</label>
        <textarea
          {...register('address')}
          placeholder={t('order.enterAddress')}
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
        <label className="block text-xs font-semibold text-slate-600 mb-1">{t('order.deliveryProviderLabel')}</label>
        <select 
          {...register('deliveryProviderId', {
            onChange: (e) => {
              const providerId = e.target.value;
              const provider = activeProviders.find(
                (p) => p.id.toString() === providerId
              );
              setValue('deliveryFee', provider ? Number(provider.shipping_fee) : 0);
            }
          })}
          className={`w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-hidden focus:border-blue-500 transition-colors border-slate-200`}
        >
          <option value="">{t('order.selectDeliveryProvider')}</option>
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