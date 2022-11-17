import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm({ onPasswordChange }) {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredOldPassword = oldPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;

    const passwordData = {
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    };
    console.log(passwordData);

    onPasswordChange(passwordData);
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
