import { Notification } from "app/types";

interface NotificationAction {
  type: 'ADD' | 'DELETE';
  payload: Notification;
}

export const notificationReducer = (state: Notification[], action: NotificationAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD':
      return [...state, payload]

    case 'DELETE':
      return state.filter(f=> f.id != payload.id)

    default:
      return state;
  }
}