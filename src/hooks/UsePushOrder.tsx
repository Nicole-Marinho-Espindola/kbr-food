import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export function usePushOrder() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;

    if (status !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permissão para notificações negada!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token do dispositivo:', token);
    return token;
  };

  const sendNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null, 
    });
  };

  return { registerForPushNotificationsAsync, sendNotification };
}
