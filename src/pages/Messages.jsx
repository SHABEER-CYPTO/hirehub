import React, { useState } from "react";
import { MessageSquare, SendHorizonal } from "lucide-react";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState({
    "john@example.com": [
      { from: "employer", text: "Hi John, thanks for applying." },
      { from: "john", text: "Thank you! Looking forward to hearing more." },
    ],
  });

  const applicants = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
  ];

  const handleSend = () => {
    if (!selectedUser || !messageInput.trim()) return;

    const updatedMessages = {
      ...messages,
      [selectedUser.email]: [
        ...(messages[selectedUser.email] || []),
        { from: "employer", text: messageInput },
      ],
    };

    setMessages(updatedMessages);
    setMessageInput("");
  };

  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare size={28} />
        Messages
      </h1>

      <div className="flex gap-6">
        {/* Left - User List */}
        <div className="w-1/3 bg-white shadow rounded-lg p-4 h-[500px] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3">Applicants</h2>
          {applicants.map((user) => (
            <div
              key={user.email}
              className={`p-3 rounded-lg mb-2 cursor-pointer ${
                selectedUser?.email === user.email
                  ? "bg-indigo-100 text-indigo-800 font-medium"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          ))}
        </div>

        {/* Right - Chat Box */}
        <div className="w-2/3 bg-white shadow rounded-lg p-4 flex flex-col h-[500px]">
          {selectedUser ? (
            <>
              <h2 className="text-lg font-semibold mb-4">
                Chat with {selectedUser.name}
              </h2>

              <div className="flex-1 overflow-y-auto mb-4">
                {(messages[selectedUser.email] || []).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 p-2 rounded-md max-w-[75%] ${
                      msg.from === "employer"
                        ? "bg-indigo-100 text-right ml-auto"
                        : "bg-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-1"
                >
                  <SendHorizonal size={18} />
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-center mt-20">
              Select an applicant to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
