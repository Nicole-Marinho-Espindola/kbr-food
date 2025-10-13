import * as Notifications from 'expo-notifications';

export async function userPushPromotion() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Promoção Relâmpago!",
      body: "Descontos especiais por tempo limitado! Confira agora!",
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: { seconds: 1, repeats: false, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL }, 
  });
}

