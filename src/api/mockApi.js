// This file provides mock API responses for development
// In a real application, this would be replaced with actual API calls

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: { ru: 'Стул', kz: 'Орындық' },
    price: { ru: 1000, kz: 1200 },
    description: { ru: 'Деревянный стул', kz: 'Ағаш орындық' },
    material: { ru: 'Дерево', kz: 'Ағаш' },
    code: { ru: 'ST123', kz: 'OR123' },
    title: { ru: 'Комфортный стул', kz: 'Жайлы орындық' },
    size: { X: 40, Y: 90, Z: 40 },
    discountPercent: { ru: 10, kz: 12 },
    discountPrice: { ru: 900, kz: 1056 },
    mainImage: 'https://via.placeholder.com/400x300?text=Chair',
    additionalImages: [
      'https://via.placeholder.com/400x300?text=Chair+Side',
      'https://via.placeholder.com/400x300?text=Chair+Back'
    ]
  },
  {
    id: '2',
    name: { ru: 'Стол', kz: 'Үстел' },
    price: { ru: 5000, kz: 5500 },
    description: { ru: 'Обеденный стол', kz: 'Ас үстелі' },
    material: { ru: 'Дерево', kz: 'Ағаш' },
    code: { ru: 'TB456', kz: 'US456' },
    title: { ru: 'Современный стол', kz: 'Заманауи үстел' },
    size: { X: 120, Y: 75, Z: 80 },
    discountPercent: { ru: 0, kz: 0 },
    discountPrice: { ru: 0, kz: 0 },
    mainImage: 'https://via.placeholder.com/400x300?text=Table',
    additionalImages: [
      'https://via.placeholder.com/400x300?text=Table+Top',
      'https://via.placeholder.com/400x300?text=Table+Legs'
    ]
  }
];

// Mock admin data
const mockAdmins = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    image: 'https://via.placeholder.com/150?text=Admin'
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@example.com',
    image: 'https://via.placeholder.com/150?text=Manager'
  }
];

// Mock API handlers
export const mockApiHandlers = {
  // Products
  getProducts: () => {
    return Promise.resolve([...mockProducts]);
  },
  
  getProduct: (id) => {
    const product = mockProducts.find(p => p.id === id);
    if (product) {
      return Promise.resolve({...product});
    }
    return Promise.reject({ status: 404, data: { message: 'Product not found' } });
  },
  
  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: String(mockProducts.length + 1)
    };
    mockProducts.push(newProduct);
    return Promise.resolve(newProduct);
  },
  
  updateProduct: ({ id, ...product }) => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...product, id };
      return Promise.resolve(mockProducts[index]);
    }
    return Promise.reject({ status: 404, data: { message: 'Product not found' } });
  },
  
  deleteProduct: (id) => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      const deleted = mockProducts.splice(index, 1)[0];
      return Promise.resolve(deleted);
    }
    return Promise.reject({ status: 404, data: { message: 'Product not found' } });
  },
  
  // Admins
  getAdmins: () => {
    return Promise.resolve([...mockAdmins]);
  },
  
  getAdmin: (id) => {
    const admin = mockAdmins.find(a => a.id === id);
    if (admin) {
      return Promise.resolve({...admin});
    }
    return Promise.reject({ status: 404, data: { message: 'Admin not found' } });
  },
  
  addAdmin: (admin) => {
    const newAdmin = {
      ...admin,
      id: String(mockAdmins.length + 1)
    };
    mockAdmins.push(newAdmin);
    return Promise.resolve(newAdmin);
  },
  
  updateAdmin: ({ id, ...admin }) => {
    const index = mockAdmins.findIndex(a => a.id === id);
    if (index !== -1) {
      mockAdmins[index] = { ...mockAdmins[index], ...admin, id };
      return Promise.resolve(mockAdmins[index]);
    }
    return Promise.reject({ status: 404, data: { message: 'Admin not found' } });
  },
  
  deleteAdmin: (id) => {
    const index = mockAdmins.findIndex(a => a.id === id);
    if (index !== -1) {
      const deleted = mockAdmins.splice(index, 1)[0];
      return Promise.resolve(deleted);
    }
    return Promise.reject({ status: 404, data: { message: 'Admin not found' } });
  },
  
  // Auth
  login: (credentials) => {
    if (credentials.username === 'admin' && credentials.password === 'password') {
      return Promise.resolve({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.mMSYCImSU1lis_Fwz0tQH4YjbXcg-H3Mq3wXJPg8jZ4"
      });
    }
    return Promise.reject({ status: 401, data: { message: 'Invalid credentials' } });
  },
  
  logout: () => {
    return Promise.resolve({ success: true });
  }
};

// Mock API middleware for RTK Query
export const mockApiMiddleware = (endpoint, { body, method, url }) => {
  // Extract ID from URL if present
  const idMatch = url?.match(/\/([^/]+)$/);
  const id = idMatch ? idMatch[1] : null;
  
  // Handle different endpoints
  switch (endpoint) {
    // Products
    case 'getProducts':
      return mockApiHandlers.getProducts();
      
    case 'getProduct':
      return mockApiHandlers.getProduct(id);
      
    case 'addProduct':
      return mockApiHandlers.addProduct(body);
      
    case 'updateProduct':
      return mockApiHandlers.updateProduct({ id, ...body });
      
    case 'deleteProduct':
      return mockApiHandlers.deleteProduct(id);
    
    // Admins
    case 'getAdmins':
      return mockApiHandlers.getAdmins();
      
    case 'getAdmin':
      return mockApiHandlers.getAdmin(id);
      
    case 'addAdmin':
      return mockApiHandlers.addAdmin(body);
      
    case 'updateAdmin':
      return mockApiHandlers.updateAdmin({ id, ...body });
      
    case 'deleteAdmin':
      return mockApiHandlers.deleteAdmin(id);
    
    // Auth
    case 'login':
      return mockApiHandlers.login(body);
      
    case 'logout':
      return mockApiHandlers.logout();
      
    default:
      return Promise.reject({ status: 404, data: { message: 'Endpoint not found' } });
  }
};