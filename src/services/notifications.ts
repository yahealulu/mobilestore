import { messaging } from '../config/firebase';
import { getToken, onMessage } from 'firebase/messaging';

export const initializeNotifications = async () => {
  try {
    const messagingInstance = await messaging;
    if (!messagingInstance) {
      console.warn('Firebase messaging is not initialized or not supported');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messagingInstance, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      
      if (token) {
        await saveUserToken(token);
      }
      
      onMessage(messagingInstance, (payload) => {
        console.log('Message received:', payload);
        showNotification(payload);
      });
    }
  } catch (error) {
    console.error('Error initializing notifications:', error);
  }
};

const saveUserToken = async (token: string) => {
  // Save the token to your backend
  console.log('Token saved:', token);
};

const showNotification = (payload: any) => {
  const { title, body } = payload.notification;
  
  if ('Notification' in window) {
    new Notification(title, {
      body,
      icon: '/icon.png',
    });
  }
};