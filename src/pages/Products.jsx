import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus } from 'react-icons/hi';
import ProductModal from '../components/products/ProductModal';
import ProductTable from '../components/products/ProductTable';

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    price: 0,
    image: null,
    description: ''
  });

  // Sample data - replace with actual data from your backend
  const [products, setProducts] = useState([
    {
      name: 'Sample Product',
      category: 'Electronics',
      price: 299.99,
      image: 'https://via.placeholder.com/150',
      description: 'This is a sample product description.'
    }
  ]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p !== product));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const imageUrl = formData.image instanceof File 
        ? URL.createObjectURL(formData.image) 
        : formData.image || 'https://via.placeholder.com/150';
      
      if (editingProduct) {
        // Update existing product
        setProducts(products.map(p => 
          p === editingProduct ? { ...formData, image: imageUrl } : p
        ));
      } else {
        // Add new product
        setProducts([
          ...products,
          {
            ...formData,
            image: imageUrl
          }
        ]);
      }

      // Close modal and reset form
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({
        category: '',
        name: '',
        price: 0,
        image: null,
        description: ''
      });
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingProduct(null);
            setFormData({
              category: '',
              name: '',
              price: 0,
              image: null,
              description: ''
            });
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          Add Product
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <ProductTable 
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
          setFormData({
            category: '',
            name: '',
            price: 0,
            image: null,
            description: ''
          });
        }}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Products;