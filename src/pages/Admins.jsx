import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus } from 'react-icons/hi';
import AdminModal from '../components/admins/AdminModal';
import AdminTable from '../components/admins/AdminTable';

function Admins() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    image: null
  });

  // Sample data - replace with actual data from your backend
  const [admins, setAdmins] = useState([
    {
      username: 'admin',
      image: 'https://via.placeholder.com/150'
    }
  ]);

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({ ...admin, password: '' });
    setIsModalOpen(true);
  };

  const handleDelete = async (admin) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(a => a !== admin));
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
      
      if (editingAdmin) {
        // Update existing admin
        setAdmins(admins.map(a => 
          a === editingAdmin ? { ...formData, image: imageUrl } : a
        ));
      } else {
        // Add new admin
        setAdmins([
          ...admins,
          {
            username: formData.username,
            image: imageUrl
          }
        ]);
      }

      // Close modal and reset form
      setIsModalOpen(false);
      setEditingAdmin(null);
      setFormData({
        username: '',
        password: '',
        image: null
      });
    } catch (error) {
      console.error('Error saving admin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admins
        </h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingAdmin(null);
            setFormData({
              username: '',
              password: '',
              image: null
            });
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          Add Admin
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <AdminTable 
          admins={admins}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAdmin(null);
          setFormData({
            username: '',
            password: '',
            image: null
          });
        }}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isEditing={!!editingAdmin}
      />
    </div>
  );
}

export default Admins;