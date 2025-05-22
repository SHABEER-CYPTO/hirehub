import React, { useState, useEffect } from "react";
import { MessageSquare, SendHorizonal } from "lucide-react";
import { useAuth } from "../components/auth/AuthContext";

const Messages = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);

  // Fetch chat partners (other side)
  useEffect(() => {
    if (!user) return;


    const fetchChatUsers = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/chat-users?user_id=${user.id}`);
        const data = await res.json();
        console.log("Chat users response:", data);  // ✅ DEBUG
        if (Array.isArray(data)) {
            setChatUsers(data);
        } else {
            console.error("Unexpected response format:", data);
            setChatUsers([]);
          }
        } catch (err) {
          console.error("Failed to load chat users", err);
          setChatUsers([]);
        }
      };
    
      if (user) fetchChatUsers();
  }, [user]);
    
  // Fetch messages when a user is selected
  useEffect(() => {
    if (!selectedUser || !user) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/messages?user1=${user.id}&user2=${selectedUser.id}`
        );
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [selectedUser, user]);

  const handleSend = async () => {
    if (!messageInput.trim() || !selectedUser) return;

    const payload = {
      sender_id: user.id,
      receiver_id: selectedUser.id,
      content: messageInput,
    };

    try {
      const res = await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessages((prev) => [...prev, { ...payload, timestamp: new Date().toISOString() }]);
        setMessageInput("");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="ml-[250px] p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare size={28} />
        Messages
      </h1>

      <div className="flex gap-6">
        {/* Chat Users */}
        <div className="w-1/3 bg-white shadow rounded-lg p-4 h-[500px] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3">Conversations</h2>
          {chatUsers.map((userObj) => (
            <div
              key={userObj.id}
              className={`p-3 rounded-lg mb-2 cursor-pointer ${
                selectedUser?.id === userObj.id
                  ? "bg-indigo-100 text-indigo-800 font-medium"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedUser(userObj)}
            >
              {userObj.name}
              <div className="text-xs text-gray-500">{userObj.email}</div>
            </div>
          ))}
        </div>

        {/* Messages */}
        <div className="w-2/3 bg-white shadow rounded-lg p-4 flex flex-col h-[500px]">
          {selectedUser ? (
            <>
              <h2 className="text-lg font-semibold mb-4">Chat with {selectedUser.name}</h2>

              <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 p-2 rounded-md max-w-[75%] ${
                      msg.sender_id === user.id
                        ? "bg-indigo-100 text-right ml-auto"
                        : "bg-gray-100"
                    }`}
                  >
                    {msg.content}
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
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
