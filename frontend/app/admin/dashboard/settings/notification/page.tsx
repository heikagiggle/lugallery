"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

// Helper to format the timestamp
function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const initialNotifications = [
  {
    id: "1",
    message: "New user signed up: John Doe",
    timestamp: "2025-10-22T09:30:00",
  },
  {
    id: "2",
    message: "User Jane connected with artisan Michael",
    timestamp: "2025-10-22T10:00:00",
  },
  {
    id: "3",
    message: "User Jane left a review for artisan Michael",
    timestamp: "2025-10-22T10:30:00",
  },
  {
    id: "4",
    message: "New artisan registered: Crafty Hands",
    timestamp: "2025-10-22T11:00:00",
  },
  {
    id: "5",
    message: "Artisan John submitted profile for approval",
    timestamp: "2025-10-22T12:15:00",
  },
];

const Notification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    toast.success("Notification deleted");
  };

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    toast.success(`${selectedIds.length} notification(s) deleted`);
    setSelectedIds([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        {selectedIds.length > 0 && (
          <button
            onClick={deleteSelected}
            className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700"
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="flex items-start justify-between bg-white border rounded-lg p-4 shadow-sm"
            >
              <div className="flex gap-3 items-start">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(n.id)}
                  onChange={() => toggleSelect(n.id)}
                  className="mt-1 accent-green-600"
                />
                <div>
                  <p className="text-sm text-gray-800">{n.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDateTime(n.timestamp)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => deleteNotification(n.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
