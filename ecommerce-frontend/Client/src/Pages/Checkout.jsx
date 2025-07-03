import React, { useEffect, useState } from 'react';
import { Modal, TextField, Button, Fade, Backdrop } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  fetchAddresses,
  saveAddress,
  deleteAddress,
} from '../api/addressAPI';

const AddressSection = () => {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    altPhone: '',
  });

  const { user, token } = useAuth();

  useEffect(() => {
    if (user?.id) loadAddresses();
  }, [user]);

  const loadAddresses = async () => {
    try {
      const data = await fetchAddresses(user.id, token);
      setAddresses(data);
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
  };

  const handleOpen = () => {
    setFormData({
      name: '',
      mobile: '',
      pincode: '',
      locality: '',
      address: '',
      city: '',
      state: '',
      landmark: '',
      altPhone: '',
    });
    setEditIndex(null);
    setOpen(true);
  };

  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const required = ['name', 'mobile', 'pincode', 'locality', 'address', 'city', 'state'];
    for (let field of required) {
      if (!formData[field]) {
        alert('Please fill all required fields');
        return;
      }
    }

    try {
      const payload = { userId: user.id, ...formData };
      const updated = await saveAddress(payload, token);
      setAddresses(updated);
      setOpen(false);
    } catch (err) {
      console.error("Failed to save address", err);
    }
  };

  const handleDelete = async (index) => {
    try {
      const id = addresses[index]._id;
      const updated = await deleteAddress(user.id, id, token);
      setAddresses(updated);
      if (selectedAddressIndex === index) {
        setSelectedAddressIndex(null);
      } else if (selectedAddressIndex > index) {
        setSelectedAddressIndex((prev) => prev - 1);
      }
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  const handleSelect = (index) => {
    setSelectedAddressIndex(index);
  };

  const selectedAddress = selectedAddressIndex !== null ? addresses[selectedAddressIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Modern Header with Glass Effect */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Your <span className="text-yellow-300">Address</span>
            </h1>
            <nav className="flex items-center justify-center space-x-2 text-sm mt-7">
              <Link to="/" className="text-blue-200 hover:text-white font-medium transition-colors duration-200">
                Home
              </Link>
              <span className="text-blue-300">/</span>
              <span className="text-white font-medium">Address</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Add Address Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Delivery Addresses</h2>
            <button
              onClick={handleOpen}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300/50"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add Address</span>
                <span className="sm:hidden">Add</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          {/* Empty State */}
          {addresses.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No addresses yet</h3>
              <p className="text-gray-500">Add your first delivery address to continue</p>
            </div>
          )}

          {/* Address Cards */}
          <div className="grid gap-4 lg:gap-6">
            {addresses.map((addr, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${selectedAddressIndex === index
                    ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-green-200/50'
                    : 'border-gray-100 hover:border-gray-200'
                  }`}
              >
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
                    {/* Address Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{addr.name}</h3>
                      </div>

                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{`${addr.address}, ${addr.locality}, ${addr.city}, ${addr.state} - ${addr.pincode}`}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{addr.mobile}</span>
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
                      <button
                        onClick={() => handleSelect(index)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 sm:flex-none ${selectedAddressIndex === index
                            ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                            : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg hover:shadow-blue-200'
                          }`}
                      >
                        {selectedAddressIndex === index ? (
                          <span className="flex items-center justify-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Selected</span>
                          </span>
                        ) : (
                          'Select'
                        )}
                      </button>

                      <button
                        onClick={() => handleEdit(index)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-amber-200 flex-1 sm:flex-none"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(index)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-200 flex-1 sm:flex-none"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected Address Indicator */}
                {selectedAddressIndex === index && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Selected Address Summary */}
          {selectedAddress && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 lg:p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800">Selected Delivery Address</h3>
              </div>
              <div className="bg-white/70 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-gray-800">{selectedAddress.name} - {selectedAddress.mobile}</p>
                <p className="text-gray-600">
                  {`${selectedAddress.address}, ${selectedAddress.locality}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`}
                </p>
              </div>
            </div>
          )}

          {/* Checkout Button */}
          <div className="flex justify-center pt-4">
            <Link
              to="/checkout-summary"
              state={{
                address: selectedAddress,
              }}
            >
              <button
                disabled={selectedAddressIndex === null}
                className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 min-w-[200px] ${selectedAddressIndex === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:shadow-green-200 focus:ring-green-300/50'
                  }`}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Proceed to Checkout</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                {selectedAddressIndex !== null && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { backdropFilter: 'blur(8px)' } }}>
        <Fade in={open}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 m-4">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{editIndex !== null ? 'Edit Address' : 'Add New Address'}</h2>
                <button onClick={handleClose} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <TextField name="name" label="Full Name" value={formData.name} onChange={handleChange} fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&:hover fieldset': { borderColor: '#3B82F6' }, '&.Mui-focused fieldset': { borderColor: '#3B82F6' } } }} />
                  <TextField name="mobile" label="Mobile Number" value={formData.mobile} onChange={handleChange} fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&:hover fieldset': { borderColor: '#3B82F6' }, '&.Mui-focused fieldset': { borderColor: '#3B82F6' } } }} />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <TextField name="pincode" label="Pincode" value={formData.pincode} onChange={handleChange} fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&:hover fieldset': { borderColor: '#3B82F6' }, '&.Mui-focused fieldset': { borderColor: '#3B82F6' } } }} />
                  <TextField name="locality" label="Locality" value={formData.locality} onChange={handleChange} fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&:hover fieldset': { borderColor: '#3B82F6' }, '&.Mui-focused fieldset': { borderColor: '#3B82F6' } } }} />
                </div>

                {/* Address Field */}
                <TextField name="address" label="Address (Area and Street)" value={formData.address} onChange={handleChange} fullWidth multiline rows={3} variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&:hover fieldset': { borderColor: '#3B82F6' }, '&.Mui-focused fieldset': { borderColor: '#3B82F6' } } }} />

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <TextField name="city" label="City/District/Town" value={formData.city} onChange={handleChange} fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&:hover fieldset': { borderColor: '#3B82F6' }, '&.Mui-focused fieldset': { borderColor: '#3B82F6' } } }} />
                  <TextField name="state" label="State" value={formData.state} onChange={handleChange} fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&:hover fieldset': { borderColor: '#3B82F6' }, '&.Mui-focused fieldset': { borderColor: '#3B82F6' } } }} />
                </div>

                {/* Row 4 - Optional Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <TextField name="landmark" label="Landmark (Optional)" value={formData.landmark} onChange={handleChange} fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&:hover fieldset': { borderColor: '#3B82F6' }, '&.Mui-focused fieldset': { borderColor: '#3B82F6' } } }} />
                  <TextField name="altPhone" label="Alternate Phone (Optional)" value={formData.altPhone} onChange={handleChange} fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&:hover fieldset': { borderColor: '#3B82F6' }, '&.Mui-focused fieldset': { borderColor: '#3B82F6' } } }} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                  <Button variant="outlined" onClick={handleClose} sx={{ borderRadius: '12px', padding: '12px 24px', fontSize: '16px', fontWeight: 600, borderColor: '#D1D5DB', color: '#6B7280', '&:hover': { borderColor: '#9CA3AF', backgroundColor: '#F9FAFB' } }}>Cancel</Button>
                  <Button variant="contained" onClick={handleSubmit} sx={{ borderRadius: '12px', padding: '12px 24px', fontSize: '16px', fontWeight: 600, background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.3)', '&:hover': { background: 'linear-gradient(135deg, #1D4ED8 0%, #1E3A8A 100%)', boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.4)' } }}>{editIndex !== null ? 'Update Address' : 'Add Address'}</Button>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddressSection;