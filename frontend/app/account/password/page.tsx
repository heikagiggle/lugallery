import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword = () => {
  return (
    <div className="flex items-center justify-center  px-4">
      <div className="w-full max-w-full md:max-w-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Change your password
        </h1>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePassword;
