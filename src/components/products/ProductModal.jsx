import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SelectInput from '../forms/SelectInput';
import TextInput from '../forms/TextInput';
import NumberInput from '../forms/NumberInput';
import ImageInput from '../forms/ImageInput';
import TextArea from '../forms/TextArea';
import SubmitButton from '../forms/SubmitButton';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import MultipleImageInput from '../forms/MultipleImageInput';

function ProductModal({ isOpen, onClose, formData, setFormData, onSubmit, isLoading, isEditing }) {
    
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('ru');
  
  // Options for dropdown selects
  const categoryOptions = [
    { value: 'furniture', label: t('products.categories.furniture') },
    { value: 'electronics', label: t('products.categories.electronics') },
    { value: 'clothing', label: t('products.categories.clothing') },
    { value: 'home', label: t('products.categories.home') }
  ];
  
  // const materialOptions = [
  //   { value: 'wood', label: t('products.materials.wood') },
  //   { value: 'metal', label: t('products.materials.metal') },
  //   { value: 'plastic', label: t('products.materials.plastic') },
  //   { value: 'fabric', label: t('products.materials.fabric') },
  //   { value: 'leather', label: t('products.materials.leather') },
  //   { value: 'glass', label: t('products.materials.glass') }
  // ];
  
  const materialOptions = [
    { value: "mdf", label: t("products.materials.mdf") },
    { value: "ldsp", label: t("products.materials.ldsp") },
    { value: "solid", label: t("products.materials.solid") },
    { value: "no-type", label: t("products.materials.noType") }
  ];
  
  const nameOptions = [
    { value: "executive_desks", label: t("products.names.executive_desks") },
    { value: "executive_desks_open_varnish", label: t("products.names.executive_desks_open_varnish") },
    { value: "staff_desks", label: t("products.names.staff_desks") },
    { value: "meeting_tables", label: t("products.names.meeting_tables") },
    { value: "open_space_tables", label: t("products.names.open_space_tables") },
    { value: "coffee_tables", label: t("products.names.coffee_tables") },
    { value: "coffee_tables_open_varnish", label: t("products.names.coffee_tables_open_varnish") },
    { value: "reception_desks", label: t("products.names.reception_desks") },
    { value: "modular_furniture", label: t("products.names.modular_furniture") },
    { value: "modular_furniture_open_varnish", label: t("products.names.modular_furniture_open_varnish") },
    { value: "modular_furniture_open_space", label: t("products.names.modular_furniture_open_space") },
    { value: "soft_furniture", label: t("products.names.soft_furniture") },
    { value: "wardrobes", label: t("products.names.wardrobes") },
    { value: "wardrobes_open_varnish", label: t("products.names.wardrobes_open_varnish") },
    { value: "dressers", label: t("products.names.dressers") },
    { value: "dressers_open_varnish", label: t("products.names.dressers_open_varnish") },
    { value: "armchairs", label: t("products.names.armchairs") },
    { value: "attachment", label: t("products.names.attachment") },
    { value: "set", label: t("products.names.set") }
  ];
  
  const titleOptions = [
    { value: 'modern', label: t('products.titles.modern') },
    { value: 'classical', label: t('products.titles.classical') },
    { value: 'no-type', label: t('products.titles.no-type') },
  ];
  
  // Initialize multilingual fields if they don't exist
  const initializeMultilingualFields = () => {
    const updatedData = { ...formData };
    
    // Initialize multilingual fields if they don't exist
    ['name', 'price', 'description', 'material', 'code', 'title', 'discountPercent', 'discountPrice'].forEach(field => {
      if (!updatedData[field]) {
        updatedData[field] = { ru: '', kz: '' };
      } else if (typeof updatedData[field] !== 'object') {
        // Convert single value to multilingual object
        const value = updatedData[field];
        updatedData[field] = { ru: value, kz: value };
      }
    });
    
    // Initialize size if it doesn't exist
    if (!updatedData.size) {
      updatedData.size = { X: 0, Y: 0, Z: 0 };
    }
    
    // Initialize images arrays if they don't exist
    if (!updatedData.additionalImages) {
      updatedData.additionalImages = [];
    }
    
    setFormData(updatedData);
    onSubmit();
  };
  
  // Handle multilingual field changes
  const handleMultilingualChange = (field, value, lang) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [lang]: value
      }
    });
  };
  
  // New handler for unified fields (name, material, title)
  // This will update both language values simultaneously
  const handleUnifiedFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: {
        ru: value,
        kz: value
      }
    });
  };
  
  // Handle size field changes
  const handleSizeChange = (dimension, value) => {
    setFormData({
      ...formData,
      size: {
        ...formData.size,
        [dimension]: value
      }
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {isEditing ? t('products.editProduct') : t('products.addProduct')}
                </Dialog.Title>

                {/* Language Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                  <button
                    className={`py-2 px-4 font-medium ${activeTab === 'ru' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                    onClick={() => setActiveTab('ru')}
                  >
                    Русский
                  </button>
                  <button
                    className={`py-2 px-4 font-medium ${activeTab === 'kz' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                    onClick={() => setActiveTab('kz')}
                  >
                    Қазақша
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Unified Fields Section */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        {t('products.unifiedFields')}
                      </h3>
                      
                      {/* Name - Dropdown (Unified) */}
                      <div className="mb-4">
                        <SelectInput
                          label={t('products.name')}
                          options={nameOptions}
                          value={formData.name?.ru || ''}
                          onChange={(e) => handleUnifiedFieldChange('name', e.target.value)}
                        />
                      </div>
                      
                      {/* Title - Dropdown (Unified) */}
                      <div className="mb-4">
                        <SelectInput
                          label={t('products.title')}
                          options={titleOptions}
                          value={formData.title?.ru || ''}
                          onChange={(e) => handleUnifiedFieldChange('title', e.target.value)}
                        />
                      </div>
                      
                      {/* Material - Dropdown (Unified) */}
                      <div className="mb-4">
                        <SelectInput
                          label={t('products.material')}
                          options={materialOptions}
                          value={formData.material?.ru || ''}
                          onChange={(e) => handleUnifiedFieldChange('material', e.target.value)}
                        />
                      </div>
                      <div className='mb-4'>
                    {/* Language-specific fields */}
                    <TextInput
                      label={t('products.code')}
                      value={formData.code?.ru || ''}
                      onChange={(e) => handleUnifiedFieldChange('code', e.target.value)}
                      placeholder={t('products.enterCode')}
                    />
                      </div>
                    </div>
                    
                  </div>
                  
                  <div className="space-y-4">
                    {/* Price */}
                    <NumberInput
                      label={t('products.price')}
                      value={formData.price?.[activeTab] || 0}
                      onChange={(value) => handleMultilingualChange('price', value, activeTab)}
                    />
                    
                    {/* Discount Percent */}
                    <NumberInput
                      label={t('products.discountPercent')}
                      value={formData.discountPercent?.[activeTab] || 0}
                      onChange={(value) => handleMultilingualChange('discountPercent', value, activeTab)}
                    />
                    
                    {/* Discount Price */}
                    <NumberInput
                      label={t('products.discountPrice')}
                      value={formData.discountPrice?.[activeTab] || 0}
                      onChange={(value) => handleMultilingualChange('discountPrice', value, activeTab)}
                    />
                    
                    {/* Description */}
                    <TextArea
                      label={t('products.description')}
                      value={formData.description?.[activeTab] || ''}
                      onChange={(e) => handleMultilingualChange('description', e.target.value, activeTab)}
                      placeholder={t('products.enterDescription')}
                      rows={4}
                    />
                  </div>
                </div>
                
                {/* Size - Common for all languages */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    {t('products.size')}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <NumberInput
                      label={t('forms.X')}
                      value={formData.size?.X || null}
                      onChange={(value) => handleSizeChange('X', value)}
                    />
                    <NumberInput
                      label={t('forms.Y')}
                      value={formData.size?.Y || null}
                      onChange={(value) => handleSizeChange('Y', value)}
                    />
                    <NumberInput
                      label={t('forms.Z')}
                      value={formData.size?.Z || null}
                      onChange={(value) => handleSizeChange('Z', value)}
                    />
                  </div>
                </div>
                
                {/* Images - Common for all languages */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      {t('products.mainImage')}
                    </h3>
                    <ImageInput
                      label=""
                      value={formData.mainImage}
                      onChange={(file) => setFormData({ ...formData, mainImage: file })}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      {t('products.additionalImages')}
                    </h3>
                    <MultipleImageInput
                      label=""
                      value={formData.additionalImages}
                      onChange={(files) => setFormData({ ...formData, additionalImages: files })}
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex space-x-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    {t('common.cancel')}
                  </button>
                  <div className="flex-1">
                    <SubmitButton
                      label={isEditing ? t('common.save') : t('products.addProduct')}
                      onClick={initializeMultilingualFields}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ProductModal;