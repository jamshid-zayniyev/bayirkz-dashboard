import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiX } from 'react-icons/hi';

function MultipleImageInput({ label, onChange, value = [] }) {
  const { t } = useTranslation();
  const [previews, setPreviews] = useState([]);
  
  // Initialize previews from value
  useEffect(() => {
    if (value && value.length > 0) {
      // If values are already URLs or File objects with preview URLs
      const initialPreviews = value.map(item => {
        if (typeof item === 'string') {
          return item;
        } else if (item instanceof File && item._preview) {
          return item._preview;
        }
        return null;
      }).filter(Boolean);
      
      setPreviews(initialPreviews);
    }
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = [];
      const newFiles = [];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Store preview URL
          const previewUrl = reader.result;
          newPreviews.push(previewUrl);
          
          // Attach preview URL to file object for reference
          file._preview = previewUrl;
          
          newFiles.push(file);
          
          if (newPreviews.length === files.length) {
            setPreviews([...previews, ...newPreviews]);
            onChange([...value, ...newFiles]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="multiple-image-input"
          multiple
        />
        <label
          htmlFor="multiple-image-input"
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors duration-200"
        >
          {t('forms.uploadImage')}
        </label>
        
        {previews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-3 gap-3 w-full"
          >
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default MultipleImageInput;