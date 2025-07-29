import "../main.css";

const Notification = ({ errorMessage, successMessage }) => {
  if (!errorMessage && !successMessage) {
    return null;
  }

  return (
    <div
      className={errorMessage ? "notification error" : "notification success"}
    >
      {errorMessage || successMessage}
    </div>
  );
};

export default Notification;
