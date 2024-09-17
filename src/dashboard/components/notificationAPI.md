import React, { useState, useEffect } from 'react';
import './notification.css';
import BoxContainer from '../pages/home/BoxContainer';
import RefreshNotifi from '../../assets/images/RefreshNotifi.svg';
import { useStateContext } from '../../hook/ContextProvider';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'Hard Reminder', message: 'A Hard reminder has been sent to you by the admin', date: '12/12/2023', read: false, color: "#FF003D" },
    { id: 2, type: 'Soft Reminder', message: 'A Soft reminder has been sent to you by the admin', date: '12/12/2023', read: false, color: '#FFC85C' },
    { id: 3, type: 'Good Job', message: 'A difficult reminder has been sent to you by the admin', date: '12/12/2023', read: false, color: '#22A364' },
  ]);

  const { activeNotify } = useStateContext();
  const [isVisible, setIsVisible] = useState(false);

  // Mark all notifications as read
  const markAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  useEffect(() => {
    setIsVisible(activeNotify.notification);
  }, [activeNotify.notification]);

  

  return (
    isVisible && (
      <div className= {`notification ${activeNotify.notification ? 'show' : 'hide'}`}>
        <BoxContainer className='notify_shadow'>
          <div className="notification-container">
            <div className="notification-container-header">
              <div className="notification-container-header-text">
                <h3>Notification</h3>
              </div>
              <div className="notification-container-header-button">
                <button type='button' onClick={markAsRead}>
                  <img src={RefreshNotifi} alt="refresh" />
                </button>
              </div>
            </div>
            <div className="notification-container-content">
              {notifications.map(notification => (
                <div key={notification.id} className="notification-container-content-notifi_field">
                  <div className="notification-container-content-notifi_field-mark_container">
                    <div className='notification-container-content-notifi_field-mark_container-mark'
                      style={{ backgroundColor: notification.color }}>
                      {notification.type === 'Good Job' ? (
                        <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.633 5.59855C22.9007 5.28265 23.0317 4.87105 22.9935 4.45801C22.9539 4.04497 22.7503 3.66503 22.4287 3.40311L19.6863 1.18391C19.0243 0.648546 18.0529 0.750726 17.5175 1.41202L9.1207 11.7891L5.1371 8.43083C4.37866 7.79112 3.25899 7.83933 2.5574 8.53948L0.451181 10.645C0.148237 10.9479 -0.0143889 11.3638 0.000722323 11.792C0.0165531 12.2209 0.210121 12.621 0.534652 12.9016L8.52777 19.7844C8.83863 20.0528 9.24303 20.1859 9.65176 20.1535C10.0605 20.1219 10.4404 19.929 10.7059 19.616L22.633 5.59855Z" fill="white" />
                        </svg>
                      ) : (
                        '!'
                      )}
                    </div>
                  </div>
                  <div className="notification-container-content-notifi_field-text">
                    <div className="notification-container-content-notifi_field-text-header">
                      <h3>{notification.type}</h3>
                    </div>
                    <div className="notification-container-content-notifi_field-text-paragraph">
                      <p>{notification.message}</p>
                    </div>
                    <div className="notification-container-content-notifi_field-text-date">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 10H9.5C9.63261 10 9.75978 9.94732 9.85355 9.85355C9.94732 9.75978 10 9.63261 10 9.5V2C10 1.86739 9.94732 1.74021 9.85355 1.64645C9.75978 1.55268 9.63261 1.5 9.5 1.5H7.5V0.5C7.5 0.367392 7.44732 0.240215 7.35355 0.146447C7.25978 0.0526784 7.13261 0 7 0C6.86739 0 6.74021 0.0526784 6.64645 0.146447C6.55268 0.240215 6.5 0.367392 6.5 0.5V1.5H3.5V0.5C3.5 0.367392 3.44732 0.240215 3.35355 0.146447C3.25978 0.0526784 3.13261 0 3 0C2.86739 0 2.74021 0.0526784 2.64645 0.146447C2.55268 0.240215 2.5 0.367392 2.5 0.5V1.5H0.5C0.367392 1.5 0.240215 1.55268 0.146447 1.64645C0.0526784 1.74021 0 1.86739 0 2V9.5C0 9.63261 0.0526784 9.75978 0.146447 9.85355C0.240215 9.94732 0.367392 10 0.5 10ZM1 2.5H9V4H1V2.5ZM1 5H9V9H1V5Z" fill="#4BF0FC" fillOpacity="0.75" />
                      </svg>
                      {notification.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BoxContainer>
      </div>
    )
  );
};

export default Notification;
