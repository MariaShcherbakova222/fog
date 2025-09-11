import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/OrdersPage.css';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('today'); // today, 2025-04-01, etc.

  //Получаем токен из localStorage
  const token = localStorage.getItem('authToken');

  //Маппинг для отображения дат
  const dateLabels = {
    'today': 'Сегодня',
    '2025-04-01': '1 апреля',
    '2025-04-05': '5 апреля'
  };

  const today = new Date().toISOString().split('T')[0];

  const getDeliveryDate = (dateValue) => {
  if (!dateValue) return null;

  let dateObj;

  if (typeof dateValue === 'string') {
    dateObj = new Date(dateValue);
  } else if (dateValue instanceof Date) {
    dateObj = dateValue;
  } else {
    return null;
  }

  if (isNaN(dateObj.getTime())) return null;

  return dateObj.toISOString().split('T')[0];
};

  //Загрузка заказов при монтировании или изменении даты
  useEffect(() => {
    if (!token) {
      setError('Вы не авторизованы');
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        let url = 'http://localhost:5000/api/orders';
        const queryDate = selectedDate === 'today' ? today : selectedDate;

        //Добавляем параметр даты в запрос
        url += `?date=${queryDate}`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Не удалось загрузить заказы');
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchOrders();
  }, [token, selectedDate, today]);

  //Обработчик изменения статуса
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const result = await response.json();
        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, status: result.status } : order
          )
        );
      } else {
        alert('Не удалось обновить статус');
      }
    } catch (err) {
      alert('Ошибка сети при обновлении статуса');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        Загрузка заказов...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        Ошибка: {error}
      </div>
    );
  }

const filteredOrders = orders.filter(order => {
  const orderDate = getDeliveryDate(order.delivery_date);
  const queryDate = selectedDate === 'today' ? today : selectedDate;

  console.log('Order delivery_date:', order.delivery_date);
  console.log('Parsed orderDate:', orderDate);
  console.log('Query date:', queryDate);
  console.log('Match:', orderDate === queryDate);

  return orderDate && orderDate === queryDate;
});

console.log('Filtered orders count:', filteredOrders.length);
console.log('Filtered orders:', filteredOrders);

  //Получаем уникальные временные слоты, где есть заказы
  const uniqueTimes = [...new Set(filteredOrders.map(o => o.delivery_time))]
    .filter(time => time)
    .sort();

  return (
    <div className="orders-container">
      {/* Заголовок */}
      <div className="orders-header">
        <h1>Заказы</h1>
        <button
          onClick={() => navigate('/')}
          className="back-button"
        >
          На главную
        </button>
      </div>

      {/* Фильтры дат */}
      <div className="date-filters">
        {Object.entries(dateLabels).map(([value, label]) => (
          <button
            key={value}
            className={`date-btn ${selectedDate === value ? 'active' : ''}`}
            onClick={() => setSelectedDate(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Слоты с заказами */}
      {uniqueTimes.length > 0 ? (
        uniqueTimes.map((time) => {
          const ordersInTime = filteredOrders.filter(o => o.delivery_time === time);
          const locations = [...new Set(ordersInTime.map(o => o.location))];

          return (
            <div key={time} className="time-section">
              <div className="time-header">
                <span>{time}</span>
                <span>✓ {ordersInTime.length}/{ordersInTime.length}</span>
              </div>
              <div className="location-tags">
                {locations.map((loc) => (
                  <span key={loc} className="location-tag">{loc}</span>
                ))}
              </div>
              <div className="orders-list">
                {ordersInTime.map((order) => (
                  <div key={order.id} className="order-item">
                    <div className="order-info">
                      <div className="order-id">#{order.id}</div>
                      <div className="customer-info">
                        <img
                          src="https://via.placeholder.com/32"
                          alt="User"
                          style={{ borderRadius: '50%' }}
                        />
                        <span>{order.user_name || 'Пользователь'}</span>
                      </div>
                      <div className="phone">+7 912 888 77 55</div>
                    </div>
                    <div className="order-status">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          backgroundColor: '#f9f7f3',
                          color: '#333',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="Новый">Новый</option>
                        <option value="Собран">Собран</option>
                        <option value="Доставляется">Доставляется</option>
                        <option value="Подтвержден">Подтвержден</option>
                        <option value="Не подтвердили">Не подтвердили</option>
                        <option value="Возврат">Возврат</option>
                        <option value="Вернули">Вернули</option>
                      </select>
                    </div>
                    <div className="order-actions">
                      <button
                        className="view-order-btn"
                        onClick={() => navigate(`/order/${order.id}`)}
                      >
                        Просмотреть заказ
                      </button>
                      <button className="chat-btn">💬</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          Нет заказов на выбранный день.
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
