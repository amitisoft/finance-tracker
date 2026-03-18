import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { Card } from "components/common/Card";
import { PageHeader } from "components/common/PageHeader";
import { InputField } from "components/forms/InputField";
import { authService } from "services/authService";
import { useAuthStore } from "store/authStore";
import { getApiErrorMessage } from "utils/apiError";

export const UserProfilePage = () => {
  const logout = useAuthStore((s) => s.logout);
  const setFullName = useAuthStore((s) => s.setFullName);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const profileQuery = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => (await authService.me()).data.data
  });

  useEffect(() => {
    if (profileQuery.data) {
      setFirstName(profileQuery.data.firstName);
      setLastName(profileQuery.data.lastName);
      setFullName(profileQuery.data.fullName);
    }
  }, [profileQuery.data, setFullName]);

  const updateProfile = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (response) => {
      const fullName = response.data.data.fullName;
      setFullName(fullName);
      toast.success("Profile updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Unable to update profile"))
  });

  const changePassword = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password changed");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Unable to change password"))
  });

  return (
    <div className="page-grid">
      <PageHeader title="User Profile" subtitle="Manage your account details and security settings" />

      <Card title="Profile Information">
        {profileQuery.isLoading ? <p>Loading profile...</p> : null}
        {profileQuery.isError ? <p>Unable to load profile right now.</p> : null}

        {profileQuery.data ? (
          <form
            className="form-stack"
            onSubmit={(event) => {
              event.preventDefault();
              updateProfile.mutate({ firstName, lastName });
            }}
          >
            <InputField label="Email" value={profileQuery.data.email} disabled />
            <InputField label="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
            <InputField label="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
            <button className="primary-btn" type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? "Saving..." : "Save Profile"}
            </button>
          </form>
        ) : null}
      </Card>

      <Card title="Security">
        <form
          className="form-stack"
          onSubmit={(event) => {
            event.preventDefault();
            changePassword.mutate({ currentPassword, newPassword });
          }}
        >
          <InputField
            label="Current password"
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
            endAdornment={
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowCurrentPassword((value) => !value)}
                aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
              >
                {showCurrentPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            }
          />
          <InputField
            label="New password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            endAdornment={
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowNewPassword((value) => !value)}
                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
              >
                {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            }
          />
          <button className="primary-btn" type="submit" disabled={changePassword.isPending}>
            {changePassword.isPending ? "Updating..." : "Change Password"}
          </button>
        </form>
      </Card>

      <Card title="Session">
        <p>Sign out from this device at any time.</p>
        <button className="danger-btn" onClick={logout}>Log out</button>
      </Card>
    </div>
  );
};
