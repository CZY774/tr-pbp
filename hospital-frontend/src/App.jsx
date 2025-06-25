import React, { useState, useEffect } from 'react';
import { Users, Calendar, Pill, FileText, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import './index.css';

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';
const api = {
  login: (credentials) => fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),
  
  get: (endpoint, token) => fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }),
  
  post: (endpoint, data, token) => fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }),
  
  put: (endpoint, data, token) => fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }),
  
  delete: (endpoint, token) => fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
};

// Main App Component
const HospitalApp = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      api.get('/user', token)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        });
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.login(credentials);
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        setToken(data.access_token);
        setUser(data.user);
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      alert('Login error: ' + error.message);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!token) {
    return <LoginForm onLogin={login} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={user?.role} />
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && <Dashboard token={token} />}
          {activeTab === 'pasiens' && <PasienManager token={token} />}
          {activeTab === 'kunjungans' && <KunjunganManager token={token} />}
          {activeTab === 'obats' && <ObatManager token={token} />}
          {activeTab === 'reseps' && <ResepManager token={token} />}
        </main>
      </div>
    </div>
  );
};

// Login Component
const LoginForm = ({ onLogin, loading }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Sistem Informasi Rumah Sakit
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          <p>Demo accounts:</p>
          <p>admin / password</p>
          <p>dr_budi / password</p>
          <p>apt_sari / password</p>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ user, onLogout }) => (
  <header className="bg-blue-600 text-white p-4 shadow-md">
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">SIRS - Rawat Jalan</h1>
      <div className="flex items-center space-x-4">
        <span>Welcome, {user?.nama_lengkap} ({user?.role})</span>
        <button
          onClick={onLogout}
          className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
);

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, userRole }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Users, roles: ['admin', 'dokter', 'apoteker'] },
    { id: 'pasiens', label: 'Pasien', icon: Users, roles: ['admin', 'dokter'] },
    { id: 'kunjungans', label: 'Kunjungan', icon: Calendar, roles: ['admin', 'dokter'] },
    { id: 'obats', label: 'Obat', icon: Pill, roles: ['admin', 'apoteker'] },
    { id: 'reseps', label: 'Resep', icon: FileText, roles: ['admin', 'dokter', 'apoteker'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="p-4">
        {filteredMenu.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-2 p-3 rounded-lg mb-2 text-left ${
                activeTab === item.id 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

// Dashboard Component
const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get('/dashboard/stats', token)
      .then(res => res.json())
      .then(setStats)
      .catch(console.error);
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pasien" value={stats.total_pasiens} color="blue" />
        <StatCard title="Kunjungan Hari Ini" value={stats.kunjungan_hari_ini} color="green" />
        <StatCard title="Kunjungan Menunggu" value={stats.kunjungan_menunggu} color="yellow" />
        <StatCard title="Resep Menunggu" value={stats.resep_menunggu} color="red" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500', 
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className={`w-12 h-12 ${colors[color]} rounded-lg mb-4 flex items-center justify-center`}>
        <Users className="text-white" size={24} />
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value || 0}</p>
    </div>
  );
};

// Pasien Manager Component
const PasienManager = ({ token }) => {
  const [pasiens, setPasiens] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPasien, setEditingPasien] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPasiens();
  }, []);

  const fetchPasiens = async () => {
    try {
      const response = await api.get('/pasiens', token);
      const data = await response.json();
      setPasiens(data);
    } catch (error) {
      console.error('Error fetching pasiens:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingPasien) {
        await api.put(`/pasiens/${editingPasien.id}`, formData, token);
      } else {
        await api.post('/pasiens', formData, token);
      }
      fetchPasiens();
      setShowForm(false);
      setEditingPasien(null);
    } catch (error) {
      console.error('Error saving pasien:', error);
    }
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Yakin ingin menghapus pasien ini?')) {
      try {
        await api.delete(`/pasiens/${id}`, token);
        fetchPasiens();
      } catch (error) {
        console.error('Error deleting pasien:', error);
      }
    }
  };

  const filteredPasiens = pasiens.filter(pasien =>
    pasien.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pasien.no_rm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Pasien</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Tambah Pasien</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari pasien..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">No. RM</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nama</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">NIK</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tanggal Lahir</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Jenis Kelamin</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPasiens.map(pasien => (
                <tr key={pasien.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{pasien.no_rm}</td>
                  <td className="px-4 py-3 text-sm font-medium">{pasien.nama_pasien}</td>
                  <td className="px-4 py-3 text-sm">{pasien.nik || '-'}</td>
                  <td className="px-4 py-3 text-sm">{new Date(pasien.tanggal_lahir).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm">{pasien.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingPasien(pasien);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(pasien.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <PasienForm
          pasien={editingPasien}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingPasien(null);
          }}
        />
      )}
    </div>
  );
};

// Pasien Form Component
const PasienForm = ({ pasien, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nama_pasien: pasien?.nama_pasien || '',
    nik: pasien?.nik || '',
    tanggal_lahir: pasien?.tanggal_lahir || '',
    jenis_kelamin: pasien?.jenis_kelamin || 'L',
    alamat: pasien?.alamat || '',
    no_telepon: pasien?.no_telepon || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {pasien ? 'Edit Pasien' : 'Tambah Pasien'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nama Pasien</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.nama_pasien}
              onChange={(e) => setFormData({...formData, nama_pasien: e.target.value})}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">NIK</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.nik}
              onChange={(e) => setFormData({...formData, nik: e.target.value})}
              maxLength="16"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tanggal Lahir</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.tanggal_lahir}
              onChange={(e) => setFormData({...formData, tanggal_lahir: e.target.value})}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Jenis Kelamin</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.jenis_kelamin}
              onChange={(e) => setFormData({...formData, jenis_kelamin: e.target.value})}
            >
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Alamat</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="3"
              value={formData.alamat}
              onChange={(e) => setFormData({...formData, alamat: e.target.value})}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">No. Telepon</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.no_telepon}
              onChange={(e) => setFormData({...formData, no_telepon: e.target.value})}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {pasien ? 'Update' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Kunjungan Manager Component - Complete Implementation
const KunjunganManager = ({ token }) => {
  const [kunjungans, setKunjungans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingKunjungan, setEditingKunjungan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pasiens, setPasiens] = useState([]);
  const [dokters, setDokters] = useState([]);

  useEffect(() => {
    fetchKunjungans();
    fetchPasiens();
    fetchDokters();
  }, []);

  const fetchKunjungans = async () => {
    try {
      const response = await api.get('/kunjungans', token);
      const data = await response.json();
      setKunjungans(data);
    } catch (error) {
      console.error('Error fetching kunjungans:', error);
    }
  };

  const fetchPasiens = async () => {
    try {
      const response = await api.get('/pasiens', token);
      const data = await response.json();
      setPasiens(data);
    } catch (error) {
      console.error('Error fetching pasiens:', error);
    }
  };

  const fetchDokters = async () => {
    try {
      const response = await api.get('/users?role=dokter', token);
      const data = await response.json();
      setDokters(data);
    } catch (error) {
      console.error('Error fetching dokters:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingKunjungan) {
        await api.put(`/kunjungans/${editingKunjungan.id}`, formData, token);
      } else {
        await api.post('/kunjungans', formData, token);
      }
      fetchKunjungans();
      setShowForm(false);
      setEditingKunjungan(null);
    } catch (error) {
      console.error('Error saving kunjungan:', error);
      alert('Error saving kunjungan: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus kunjungan ini?')) {
      try {
        await api.delete(`/kunjungans/${id}`, token);
        fetchKunjungans();
      } catch (error) {
        console.error('Error deleting kunjungan:', error);
      }
    }
  };

  const handleCompleteKunjungan = async (id) => {
    try {
      await api.put(`/kunjungans/${id}`, { status_kunjungan: 'selesai' }, token);
      fetchKunjungans();
    } catch (error) {
      console.error('Error completing kunjungan:', error);
    }
  };

  const filteredKunjungans = kunjungans.filter(kunjungan =>
    kunjungan.pasien?.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kunjungan.dokter?.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kunjungan.no_antrian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Kunjungan</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Tambah Kunjungan</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari kunjungan..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">No. Antrian</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Pasien</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Dokter</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tanggal</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKunjungans.map(kunjungan => (
                <tr key={kunjungan.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{kunjungan.no_antrian}</td>
                  <td className="px-4 py-3 text-sm font-medium">{kunjungan.pasien?.nama_pasien}</td>
                  <td className="px-4 py-3 text-sm">{kunjungan.dokter?.nama_lengkap}</td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(kunjungan.tanggal_kunjungan).toLocaleDateString()} {kunjungan.jam_kunjungan}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      kunjungan.status_kunjungan === 'selesai' ? 'bg-green-100 text-green-800' :
                      kunjungan.status_kunjungan === 'batal' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {kunjungan.status_kunjungan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingKunjungan(kunjungan);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      {kunjungan.status_kunjungan === 'menunggu' && (
                        <button
                          onClick={() => handleCompleteKunjungan(kunjungan.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Selesaikan"
                        >
                          <FileText size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(kunjungan.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <KunjunganForm
          kunjungan={editingKunjungan}
          pasiens={pasiens}
          dokters={dokters}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingKunjungan(null);
          }}
        />
      )}
    </div>
  );
};

// Kunjungan Form Component
const KunjunganForm = ({ kunjungan, pasiens, dokters, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    pasien_id: kunjungan?.pasien_id || '',
    dokter_id: kunjungan?.dokter_id || '',
    tanggal_kunjungan: kunjungan?.tanggal_kunjungan || new Date().toISOString().split('T')[0],
    jam_kunjungan: kunjungan?.jam_kunjungan || '08:00',
    keluhan: kunjungan?.keluhan || '',
    biaya_konsultasi: kunjungan?.biaya_konsultasi || 0,
    status_kunjungan: kunjungan?.status_kunjungan || 'menunggu'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {kunjungan ? 'Edit Kunjungan' : 'Tambah Kunjungan'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pasien</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.pasien_id}
              onChange={(e) => setFormData({...formData, pasien_id: e.target.value})}
              required
            >
              <option value="">Pilih Pasien</option>
              {pasiens.map(pasien => (
                <option key={pasien.id} value={pasien.id}>
                  {pasien.nama_pasien} ({pasien.no_rm})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Dokter</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.dokter_id}
              onChange={(e) => setFormData({...formData, dokter_id: e.target.value})}
              required
            >
              <option value="">Pilih Dokter</option>
              {dokters.map(dokter => (
                <option key={dokter.id} value={dokter.id}>{dokter.nama_lengkap}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tanggal Kunjungan</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.tanggal_kunjungan}
              onChange={(e) => setFormData({...formData, tanggal_kunjungan: e.target.value})}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Jam Kunjungan</label>
            <input
              type="time"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.jam_kunjungan}
              onChange={(e) => setFormData({...formData, jam_kunjungan: e.target.value})}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Keluhan</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="3"
              value={formData.keluhan}
              onChange={(e) => setFormData({...formData, keluhan: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Biaya Konsultasi</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.biaya_konsultasi}
              onChange={(e) => setFormData({...formData, biaya_konsultasi: e.target.value})}
              min="0"
            />
          </div>

          {kunjungan && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Status Kunjungan</label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.status_kunjungan}
                onChange={(e) => setFormData({...formData, status_kunjungan: e.target.value})}
              >
                <option value="menunggu">Menunggu</option>
                <option value="selesai">Selesai</option>
                <option value="batal">Batal</option>
              </select>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {kunjungan ? 'Update' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Obat Manager Component - Complete Implementation
const ObatManager = ({ token }) => {
  const [obats, setObats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingObat, setEditingObat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchObats();
  }, []);

  const fetchObats = async () => {
    try {
      const response = await api.get('/obats', token);
      const data = await response.json();
      setObats(data);
    } catch (error) {
      console.error('Error fetching obats:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingObat) {
        await api.put(`/obats/${editingObat.id}`, formData, token);
      } else {
        await api.post('/obats', formData, token);
      }
      fetchObats();
      setShowForm(false);
      setEditingObat(null);
    } catch (error) {
      console.error('Error saving obat:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menonaktifkan obat ini?')) {
      try {
        await api.delete(`/obats/${id}`, token);
        fetchObats();
      } catch (error) {
        console.error('Error deleting obat:', error);
      }
    }
  };

  const filteredObats = obats.filter(obat =>
    obat.nama_obat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obat.kode_obat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Obat</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Tambah Obat</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari obat..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Kode</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nama Obat</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Jenis</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Stok</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Harga</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredObats.map(obat => (
                <tr key={obat.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{obat.kode_obat}</td>
                  <td className="px-4 py-3 text-sm font-medium">{obat.nama_obat}</td>
                  <td className="px-4 py-3 text-sm">{obat.jenis_obat || '-'}</td>
                  <td className="px-4 py-3 text-sm">{obat.stok} {obat.satuan}</td>
                  <td className="px-4 py-3 text-sm">Rp {obat.harga_satuan?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      obat.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {obat.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingObat(obat);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(obat.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <ObatForm
          obat={editingObat}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingObat(null);
          }}
        />
      )}
    </div>
  );
};

// Obat Form Component
const ObatForm = ({ obat, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    kode_obat: obat?.kode_obat || '',
    nama_obat: obat?.nama_obat || '',
    jenis_obat: obat?.jenis_obat || '',
    satuan: obat?.satuan || '',
    harga_satuan: obat?.harga_satuan || 0,
    stok: obat?.stok || 0,
    is_active: obat?.is_active ?? true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {obat ? 'Edit Obat' : 'Tambah Obat'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Kode Obat</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.kode_obat}
              onChange={(e) => setFormData({...formData, kode_obat: e.target.value})}
              required
              maxLength="20"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nama Obat</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.nama_obat}
              onChange={(e) => setFormData({...formData, nama_obat: e.target.value})}
              required
              maxLength="100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Jenis Obat</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.jenis_obat}
              onChange={(e) => setFormData({...formData, jenis_obat: e.target.value})}
              maxLength="50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Satuan</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.satuan}
              onChange={(e) => setFormData({...formData, satuan: e.target.value})}
              maxLength="20"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Harga Satuan</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.harga_satuan}
              onChange={(e) => setFormData({...formData, harga_satuan: e.target.value})}
              required
              min="0"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Stok</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.stok}
              onChange={(e) => setFormData({...formData, stok: e.target.value})}
              required
              min="0"
            />
          </div>

          {obat && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.is_active}
                onChange={(e) => setFormData({...formData, is_active: e.target.value === 'true'})}
              >
                <option value={true}>Aktif</option>
                <option value={false}>Nonaktif</option>
              </select>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {obat ? 'Update' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Resep Manager Component - Complete Implementation
const ResepManager = ({ token }) => {
  const [reseps, setReseps] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingResep, setEditingResep] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [kunjungans, setKunjungans] = useState([]);
  const [dokters, setDokters] = useState([]);
  const [apotekers, setApotekers] = useState([]);
  const [obats, setObats] = useState([]);

  useEffect(() => {
    fetchReseps();
    fetchKunjungans();
    fetchDokters();
    fetchApotekers();
    fetchObats();
  }, []);

  const fetchReseps = async () => {
    try {
      const response = await api.get('/reseps', token);
      const data = await response.json();
      setReseps(data);
    } catch (error) {
      console.error('Error fetching reseps:', error);
    }
  };

  const fetchKunjungans = async () => {
    try {
      const response = await api.get('/kunjungans', token);
      const data = await response.json();
      setKunjungans(data);
    } catch (error) {
      console.error('Error fetching kunjungans:', error);
    }
  };

  const fetchDokters = async () => {
    try {
      const response = await api.get('/users?role=dokter', token);
      const data = await response.json();
      setDokters(data);
    } catch (error) {
      console.error('Error fetching dokters:', error);
    }
  };

  const fetchApotekers = async () => {
    try {
      const response = await api.get('/users?role=apoteker', token);
      const data = await response.json();
      setApotekers(data);
    } catch (error) {
      console.error('Error fetching apotekers:', error);
    }
  };

  const fetchObats = async () => {
    try {
      const response = await api.get('/obats', token);
      const data = await response.json();
      setObats(data.filter(obat => obat.is_active));
    } catch (error) {
      console.error('Error fetching obats:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingResep) {
        await api.put(`/reseps/${editingResep.id}`, formData, token);
      } else {
        await api.post('/reseps', formData, token);
      }
      fetchReseps();
      setShowForm(false);
      setEditingResep(null);
    } catch (error) {
      console.error('Error saving resep:', error);
      alert('Error saving resep: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus resep ini?')) {
      try {
        await api.delete(`/reseps/${id}`, token);
        fetchReseps();
      } catch (error) {
        console.error('Error deleting resep:', error);
      }
    }
  };

  const filteredReseps = reseps.filter(resep =>
    resep.kunjungan?.pasien?.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resep.dokter?.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resep.obat?.nama_obat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Resep</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Tambah Resep</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari resep..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Pasien</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Dokter</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Obat</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Jumlah</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredReseps.map(resep => (
                <tr key={resep.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">
                    {resep.kunjungan?.pasien?.nama_pasien}
                  </td>
                  <td className="px-4 py-3 text-sm">{resep.dokter?.nama_lengkap}</td>
                  <td className="px-4 py-3 text-sm">{resep.obat?.nama_obat}</td>
                  <td className="px-4 py-3 text-sm">{resep.jumlah_obat} {resep.obat?.satuan}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      resep.status_resep === 'selesai' ? 'bg-green-100 text-green-800' :
                      resep.status_resep === 'diproses' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {resep.status_resep}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingResep(resep);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(resep.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <ResepForm
          resep={editingResep}
          kunjungans={kunjungans}
          dokters={dokters}
          apotekers={apotekers}
          obats={obats}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingResep(null);
          }}
        />
      )}
    </div>
  );
};

// Resep Form Component
const ResepForm = ({ resep, kunjungans, dokters, apotekers, obats, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    kunjungan_id: resep?.kunjungan_id || '',
    dokter_id: resep?.dokter_id || '',
    obat_id: resep?.obat_id || '',
    jumlah_obat: resep?.jumlah_obat || 1,
    dosis: resep?.dosis || '',
    aturan_pakai: resep?.aturan_pakai || '',
    status_resep: resep?.status_resep || 'menunggu',
    apoteker_id: resep?.apoteker_id || ''
  });

  const [selectedObat, setSelectedObat] = useState(null);

  useEffect(() => {
    if (formData.obat_id) {
      const obat = obats.find(o => o.id == formData.obat_id);
      setSelectedObat(obat);
    } else {
      setSelectedObat(null);
    }
  }, [formData.obat_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {resep ? 'Edit Resep' : 'Tambah Resep'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Kunjungan</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.kunjungan_id}
              onChange={(e) => setFormData({...formData, kunjungan_id: e.target.value})}
              required
            >
              <option value="">Pilih Kunjungan</option>
              {kunjungans.map(kunjungan => (
                <option key={kunjungan.id} value={kunjungan.id}>
                  {kunjungan.pasien?.nama_pasien} - {new Date(kunjungan.tanggal_kunjungan).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Dokter</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.dokter_id}
              onChange={(e) => setFormData({...formData, dokter_id: e.target.value})}
              required
            >
              <option value="">Pilih Dokter</option>
              {dokters.map(dokter => (
                <option key={dokter.id} value={dokter.id}>{dokter.nama_lengkap}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Obat</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.obat_id}
              onChange={(e) => setFormData({...formData, obat_id: e.target.value})}
              required
            >
              <option value="">Pilih Obat</option>
              {obats.map(obat => (
                <option key={obat.id} value={obat.id}>
                  {obat.nama_obat} (Stok: {obat.stok} {obat.satuan})
                </option>
              ))}
            </select>
            {selectedObat && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Harga: Rp {selectedObat.harga_satuan?.toLocaleString()}</p>
                <p>Stok tersedia: {selectedObat.stok} {selectedObat.satuan}</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Jumlah Obat</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.jumlah_obat}
              onChange={(e) => setFormData({...formData, jumlah_obat: e.target.value})}
              required
              min="1"
              max={selectedObat?.stok || 1000}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Dosis</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.dosis}
              onChange={(e) => setFormData({...formData, dosis: e.target.value})}
              maxLength="100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Aturan Pakai</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="3"
              value={formData.aturan_pakai}
              onChange={(e) => setFormData({...formData, aturan_pakai: e.target.value})}
            />
          </div>

          {resep && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status Resep</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={formData.status_resep}
                  onChange={(e) => setFormData({...formData, status_resep: e.target.value})}
                >
                  <option value="menunggu">Menunggu</option>
                  <option value="diproses">Diproses</option>
                  <option value="selesai">Selesai</option>
                </select>
              </div>

              {formData.status_resep !== 'menunggu' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Apoteker</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={formData.apoteker_id}
                    onChange={(e) => setFormData({...formData, apoteker_id: e.target.value})}
                  >
                    <option value="">Pilih Apoteker</option>
                    {apotekers.map(apoteker => (
                      <option key={apoteker.id} value={apoteker.id}>{apoteker.nama_lengkap}</option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {resep ? 'Update' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Update the Dashboard component to include reports
const UpdateDashboard = ({ token }) => {
  const [stats, setStats] = useState({});
  const [reportData, setReportData] = useState([]);
  const [reportType, setReportType] = useState('kunjungan');
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchStats();
    fetchReportData();
  }, [reportType, dateRange]);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats', token);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchReportData = async () => {
    try {
      const endpoint = `/reports/${reportType}?start=${dateRange.start}&end=${dateRange.end}`;
      const response = await api.get(endpoint, token);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const handleExport = async () => {
    try {
      const endpoint = `/reports/export/${reportType}?start=${dateRange.start}&end=${dateRange.end}`;
      const response = await api.get(endpoint, token);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `laporan_${reportType}_${dateRange.start}_${dateRange.end}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Pasien" value={stats.total_pasiens} color="blue" />
        <StatCard title="Kunjungan Hari Ini" value={stats.kunjungan_hari_ini} color="green" />
        <StatCard title="Kunjungan Menunggu" value={stats.kunjungan_menunggu} color="yellow" />
        <StatCard title="Resep Menunggu" value={stats.resep_menunggu} color="red" />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Laporan</h3>
        
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
          <div className="mb-4 md:mb-0">
            <label className="block text-sm font-medium mb-2">Jenis Laporan</label>
            <select
              className="w-full md:w-48 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="kunjungan">Kunjungan</option>
              <option value="resep">Resep</option>
              <option value="obat">Obat</option>
            </select>
          </div>
          
          <div className="mb-4 md:mb-0">
            <label className="block text-sm font-medium mb-2">Dari Tanggal</label>
            <input
              type="date"
              className="w-full md:w-48 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
          </div>
          
          <div className="mb-4 md:mb-0">
            <label className="block text-sm font-medium mb-2">Sampai Tanggal</label>
            <input
              type="date"
              className="w-full md:w-48 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleExport}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Export Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {reportType === 'kunjungan' && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">No. Antrian</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Pasien</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Dokter</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tanggal</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  </>
                )}
                {reportType === 'resep' && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Pasien</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Dokter</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Obat</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Jumlah</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  </>
                )}
                {reportType === 'obat' && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nama Obat</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Jenis</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Stok</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Harga</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  {reportType === 'kunjungan' && (
                    <>
                      <td className="px-4 py-3 text-sm">{item.no_antrian}</td>
                      <td className="px-4 py-3 text-sm font-medium">{item.pasien?.nama_pasien}</td>
                      <td className="px-4 py-3 text-sm">{item.dokter?.nama_lengkap}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(item.tanggal_kunjungan).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status_kunjungan === 'selesai' ? 'bg-green-100 text-green-800' :
                          item.status_kunjungan === 'batal' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status_kunjungan}
                        </span>
                      </td>
                    </>
                  )}
                  {reportType === 'resep' && (
                    <>
                      <td className="px-4 py-3 text-sm font-medium">{item.kunjungan?.pasien?.nama_pasien}</td>
                      <td className="px-4 py-3 text-sm">{item.dokter?.nama_lengkap}</td>
                      <td className="px-4 py-3 text-sm">{item.obat?.nama_obat}</td>
                      <td className="px-4 py-3 text-sm">{item.jumlah_obat} {item.obat?.satuan}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status_resep === 'selesai' ? 'bg-green-100 text-green-800' :
                          item.status_resep === 'diproses' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status_resep}
                        </span>
                      </td>
                    </>
                  )}
                  {reportType === 'obat' && (
                    <>
                      <td className="px-4 py-3 text-sm font-medium">{item.nama_obat}</td>
                      <td className="px-4 py-3 text-sm">{item.jenis_obat || '-'}</td>
                      <td className="px-4 py-3 text-sm">{item.stok} {item.satuan}</td>
                      <td className="px-4 py-3 text-sm">Rp {item.harga_satuan?.toLocaleString()}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalApp;