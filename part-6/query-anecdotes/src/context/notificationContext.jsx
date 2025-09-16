import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.payload;
    }
    case "CLEAR_NOTIFICATION": {
      return "";
    }
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  const setNotification = (message, seconds = 5) => {
    notificationDispatch({ type: "SET_NOTIFICATION", payload: message });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, seconds * 1000);
  };

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
