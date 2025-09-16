import { useContext } from "react";
import NotificationContext from "../context/notificationContext";

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
  marginBottom: 5,
};

const Notification = () => {
  const [notification] = useContext(NotificationContext);
  // if (true) return null;

  return <>{notification && <div style={style}>{notification}</div>}</>;
};
export default Notification;
