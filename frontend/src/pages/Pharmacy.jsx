import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Pill, 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle, 
  Star, 
  ShieldCheck, 
  Truck, 
  X,
  CreditCard
} from 'lucide-react';
import { fetchMedicines, createOrder } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Pharmacy() {
  const [searchParams] = useSearchParams();
  const openCartParam = searchParams.get('cart') === 'open';

  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalAmount, totalCount } = useCart();
  const { user } = useAuth();

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(openCartParam);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('42 Blossom Grove, Apt 3B, New York, NY');
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [ordering, setOrdering] = useState(false);

  const categories = [
    'All',
    'Allergy & Cold',
    'Pain Relief & Fever',
    'Respiratory',
    'Skin Care',
    'Vitamins & Supplements',
    'Digestive Health'
  ];

  useEffect(() => {
    setLoading(true);
    fetchMedicines({ category, search }).then((data) => {
      setMedicines(data);
      setLoading(false);
    });
  }, [category, search]);

  useEffect(() => {
    if (openCartParam) setIsCartOpen(true);
  }, [openCartParam]);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setOrdering(true);
    const orderData = {
      items: cartItems,
      totalAmount,
      deliveryAddress,
      patientName: user?.name || 'John Doe'
    };

    const res = await createOrder(orderData);
    setOrderSuccess(res);
    clearCart();
    setOrdering(false);
  };

  return (
    <div style={{ padding: '3.5rem 0', background: 'var(--gray-50)', minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-badge">Doorstep Delivery</span>
          <h1 className="section-title">Online Medicine Ordering</h1>
          <p className="section-subtitle">
            Order prescribed and over-the-counter medicines online with verified pharmacies and express home delivery.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div style={{
          background: 'var(--white)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--gray-200)',
          marginBottom: '2.5rem'
        }}>
          {/* Search Bar & Cart Quick Button */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <Search size={20} color="var(--gray-400)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search medicines, active ingredients, or brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.8rem' }}
              />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-primary"
              style={{ position: 'relative', whiteSpace: 'nowrap' }}
            >
              <ShoppingCart size={18} />
              <span>Cart ({totalCount})</span>
            </button>
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-500)', marginRight: '0.5rem' }}>
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'var(--transition)',
                  background: category === cat ? 'var(--teal-600)' : 'var(--white)',
                  color: category === cat ? 'var(--white)' : 'var(--gray-700)',
                  border: category === cat ? '1px solid var(--teal-600)' : '1px solid var(--gray-200)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Medicines Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p>Loading pharmacy items...</p>
          </div>
        ) : medicines.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', background: 'white', borderRadius: 'var(--radius-xl)' }}>
            <p>No medicines found matching your search.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {medicines.map((med) => (
              <div key={med.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                {/* Image & Badge */}
                <div style={{ position: 'relative', height: '170px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '1rem' }}>
                  <img
                    src={med.image}
                    alt={med.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {med.prescriptionRequired && (
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'rgba(239, 68, 68, 0.9)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: 700
                    }}>
                      Rx Required
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--teal-700)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  {med.category} • {med.brand}
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', flexGrow: 1 }}>
                  {med.name}
                </h3>

                <p style={{ fontSize: '0.825rem', color: 'var(--gray-500)', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {med.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--gray-100)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', display: 'block' }}>Price</span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--gray-900)' }}>${med.price.toFixed(2)}</strong>
                  </div>

                  <button
                    onClick={() => addToCart(med, 1)}
                    className="btn btn-primary btn-sm"
                  >
                    <Plus size={16} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cart Drawer Overlay */}
        {isCartOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(3px)',
            zIndex: 1050,
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '420px',
              background: 'var(--white)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-2xl)',
              animation: 'slideInRight 0.3s ease'
            }}>
              {/* Drawer Header */}
              <div style={{
                padding: '1.25rem',
                borderBottom: '1px solid var(--gray-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShoppingCart size={20} color="var(--teal-600)" />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Your Medicine Cart</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} style={{ color: 'var(--gray-500)' }}>
                  <X size={22} />
                </button>
              </div>

              {/* Cart Items List */}
              <div style={{ flexGrow: 1, padding: '1.25rem', overflowY: 'auto' }}>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray-500)' }}>
                    <Pill size={40} color="var(--gray-300)" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ fontWeight: 600 }}>Your cart is empty.</p>
                    <p style={{ fontSize: '0.85rem' }}>Add medicines from the catalog or directly from your prescription.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          background: 'var(--gray-50)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--gray-200)',
                          alignItems: 'center'
                        }}
                      >
                        <div style={{ flexGrow: 1 }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '2px' }}>{item.name}</h4>
                          <span style={{ fontSize: '0.85rem', color: 'var(--teal-700)', fontWeight: 600 }}>
                            ${item.price.toFixed(2)} each
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              border: '1px solid var(--gray-300)',
                              background: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              border: '1px solid var(--gray-300)',
                              background: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ color: 'var(--danger)', marginLeft: '4px' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer / Checkout */}
              {cartItems.length > 0 && (
                <div style={{ padding: '1.25rem', borderTop: '1px solid var(--gray-200)', background: 'var(--gray-50)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 800 }}>
                    <span>Total Amount:</span>
                    <span style={{ color: 'var(--teal-800)' }}>${totalAmount.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutModalOpen(true);
                    }}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                  >
                    <span>Proceed to Delivery Checkout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {checkoutModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <div className="card" style={{ maxWidth: '520px', width: '100%', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Confirm Medicine Delivery</h3>
                <button onClick={() => setCheckoutModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {orderSuccess ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <CheckCircle size={48} color="var(--teal-600)" style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Order Placed Successfully!</h4>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Order ID: <strong>{orderSuccess.id}</strong>. Your medicines are packed and assigned for express doorstep delivery.
                  </p>
                  <button
                    onClick={() => {
                      setOrderSuccess(null);
                      setCheckoutModalOpen(false);
                    }}
                    className="btn btn-primary"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit}>
                  <div className="form-control">
                    <label className="form-label">Delivery Address</label>
                    <textarea
                      rows="2"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div style={{
                    background: 'var(--teal-50)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    fontSize: '0.85rem',
                    color: 'var(--teal-900)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Items Subtotal:</span>
                      <strong>${totalAmount.toFixed(2)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Home Delivery:</span>
                      <strong style={{ color: 'var(--teal-600)' }}>FREE ($0.00)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--teal-200)', paddingTop: '6px', fontSize: '1rem', fontWeight: 800 }}>
                      <span>Total Payable:</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--gray-600)' }}>
                    <Truck size={18} color="var(--teal-600)" />
                    <span>Estimated doorstep delivery within 24–48 hours.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={ordering}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                  >
                    {ordering ? 'Placing Order...' : `Place Medicine Order ($${totalAmount.toFixed(2)})`}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
