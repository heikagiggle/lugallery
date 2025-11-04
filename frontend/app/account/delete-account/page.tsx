import DeleteAccountForm from "./DeleteAccountForm";

const Preferences = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold"> Delete Account</h1>
      <p className="py-2">
        We&apos;re really sorry to see you go. Are you sure you want to delete
        your account? Once you confirm, your data will be gone.
      </p>

      {/* reasons  */}
      {/* <div className="px-1 mt-4 space-y-3">
        <div className="flex items-center gap-x-4">
          <input type="checkbox" className="w-4 h-4 scale-125 accent-[#006400]" />
          <p>I no longer use Lugallery</p>
        </div>
        <div className="flex items-center gap-x-4">
          <input type="checkbox" className="w-4 h-4 scale-125 accent-[#006400]" />
          <p>I’m concerned about my privacy or data</p>
        </div>
        <div className="flex items-center gap-x-4">
          <input type="checkbox" className="w-4 h-4 scale-125 accent-[#006400]" />
          <p>I’m getting too many emails or notifications</p>
        </div>
        <div className="flex items-center gap-x-4">
          <input type="checkbox" className="w-4 h-4 scale-125 accent-[#006400]" />
          <p>I had issues using the app or site</p>
        </div>
        <div className="flex items-center gap-x-4">
          <input type="checkbox" className="w-4 h-4 scale-125 accent-[#006400]" />
          <p>Other</p>
        </div>
      </div> */}
      <DeleteAccountForm/>
    </div>
  );
};

export default Preferences;
