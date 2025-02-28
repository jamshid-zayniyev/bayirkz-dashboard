import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import SelectInput from '../forms/SelectInput';
import TextInput from '../forms/TextInput';
import NumberInput from '../forms/NumberInput';
import ImageInput from '../forms/ImageInput';
import TextArea from '../forms/TextArea';
import SubmitButton from '../forms/SubmitButton';
import { useTranslation } from 'react-i18next';

function ProductModal({ isOpen, onClose, formData, setFormData, onSubmit, isLoading, isEditing }) {
  const { t } = useTranslation();
  
  const categoryOptions = [
    { value: 'electronics', label: t('products.categories.electronics') },
    { value: 'clothing', label: t('products.categories.clothing') },
    { value: 'books', label: t('products.categories.books') },
    { value: 'home', label: t('products.categories.home') }
  ];

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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {isEditing ? t('products.editProduct') : t('products.addProduct')}
                </Dialog.Title>

                <div className="space-y-4">
                  <SelectInput
                    label={t('products.category')}
                    options={categoryOptions}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                  
                  <TextInput
                    label={t('products.name')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('products.enterName')}
                  />
                  
                  <NumberInput
                    label={t('products.price')}
                    value={formData.price}
                    onChange={(value) => setFormData({ ...formData, price: value })}
                  />
                  
                  <ImageInput
                    label={t('products.image')}
                    onChange={(file) => setFormData({ ...formData, image: file })}
                  />
                  
                  <TextArea
                    label={t('products.description')}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t('products.enterDescription')}
                    rows={6}
                  />
                  
                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      {t('common.cancel')}
                    </button>
                    <div className="flex-1">
                      <SubmitButton
                        label={isEditing ? t('common.save') : t('products.addProduct')}
                        onClick={onSubmit}
                        isLoading={isLoading}
                      />
                    </div>
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