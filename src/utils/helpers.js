import {
    AsyncStorage
}                                       from 'react-native';
import * as Notifications               from 'expo-notifications';
import * as Permissions                 from 'expo-permissions';

const NOTIFICATION_KEY = 'FlashCards:notifications';
export const DECKS_STORAGE_KEY = 'FlashCards:decksInfo';

export const initData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: 'How about quiz?',
        body: "👋 Don't forget to quiz today!",
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);

                            const day = tomorrow.getDay();
                            const month = tomorrow.getMonth();
                            const year = tomorrow.getFullYear();
                            const hour = 17;
                            const minute = 0;

                            const trigger = Platform.OS === "ios"
                                ? {
                                    type: 'calendar',
                                    repeats: true,
                                    dateComponents: {
                                        month,
                                        year,
                                        day,
                                        hour,
                                        minute
                                    }
                                } : {
                                    hour,
                                    minute,
                                    repeats: true
                                };

                            Notifications.scheduleNotificationAsync({
                                content: createNotification(),
                                trigger
                            });

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}
