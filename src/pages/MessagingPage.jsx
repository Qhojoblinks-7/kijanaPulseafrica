import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaPhone, FaVideo, FaInfoCircle, FaPaperclip, FaSmile, FaMicrophone, FaPlay, FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Mock Data for Conversations
const mockConversations = [
  {
    id: 'conv1',
    name: 'Coach Mwangi',
    role: 'Football Coach',
    team: 'Nairobi High School',
    profilePic: 'https://randomuser.me/api/portraits/men/30.jpg',
    lastMessage: 'Great performance in today\'s match! Let\'s discuss your development plan. Are you available for a quick call this evening?',
    timestamp: '2m ago',
    unread: true,
    messages: [
      { id: 'msg1', sender: 'other', text: 'Hey! I watched your highlights from yesterday\'s match. Impressive footwork and ball control!', time: '10:30 AM' },
      { id: 'msg2', sender: 'self', text: 'Thank you coach! I\'ve been working hard on my technique.', time: '10:32 AM' },
      { id: 'msg3', sender: 'other', text: 'Great performance in today\'s match! Let\'s discuss your development plan. Are you available for a quick call this evening?', time: '2:15 PM' },
      { id: 'msg4', sender: 'self', text: 'Absolutely! I\'m free after 6 PM. Really excited to discuss my progress.', time: '2:18 PM' },
    ]
  },
  {
    id: 'conv2',
    name: 'David Ochieng',
    role: 'Scout',
    team: 'AFC Leopards',
    profilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
    lastMessage: 'I\'ve been following your highlights. Impressive!',
    timestamp: '1h ago',
    unread: false,
    messages: [
      { id: 'msg5', sender: 'other', text: 'Hello David, I\'ve been following your highlights. Impressive work!', time: 'Yesterday 3:00 PM' },
      { id: 'msg6', sender: 'self', text: 'Thank you for noticing! I\'m always working to improve.', time: 'Yesterday 3:05 PM' },
    ]
  },
  {
    id: 'conv3',
    name: 'Sarah Wanjiku',
    role: 'Midfielder',
    team: 'Same Team',
    profilePic: 'https://randomuser.me/api/portraits/women/67.jpg',
    lastMessage: 'Team practice tomorrow at 4 PM. Don\'t be late!',
    timestamp: 'Yesterday',
    unread: false,
    messages: [
      { id: 'msg7', sender: 'other', text: 'Hey Sarah, just a reminder that team practice is tomorrow at 4 PM. Don\'t be late!', time: 'Yesterday 5:00 PM' },
      { id: 'msg8', sender: 'self', text: 'Got it! See you there.', time: 'Yesterday 5:02 PM' },
    ]
  },
  {
    id: 'conv4',
    name: 'Mr. Kipchoge',
    role: 'Parent',
    profilePic: 'https://randomuser.me/api/portraits/men/80.jpg',
    lastMessage: 'Congratulations on the scholarship offer!',
    timestamp: '2 days ago',
    unread: false,
    messages: [
      { id: 'msg9', sender: 'other', text: 'Congratulations on the scholarship offer, we are so proud of you!', time: '2 days ago 10:00 AM' },
      { id: 'msg10', sender: 'self', text: 'Thank you so much Mr. Kipchoge! I really appreciate your support.', time: '2 days ago 10:05 AM' },
    ]
  },
];

// ConversationList Component
const ConversationList = ({ conversations, onSelectConversation, selectedConversationId, onNewMessage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/3 border-r border-neutral-light-gray flex flex-col bg-white">
      <div className="p-4 border-b border-neutral-light-gray">
        <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Messages</h2>
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search messages or contacts..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-light-gray-bg border border-neutral-light-gray focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-medium-gray" />
        </div>
        <button
          onClick={onNewMessage}
          className="w-full bg-gamepulse-orange-dark hover:bg-gamepulse-orange-light text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          <FaPlus className="mr-2" /> New Message
        </button>
      </div>
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {filteredConversations.map(conv => (
          <div
            key={conv.id}
            className={`flex items-start p-4 border-b border-neutral-light-gray cursor-pointer hover:bg-neutral-light-gray-bg transition-colors ${selectedConversationId === conv.id ? 'bg-neutral-light-gray-bg border-l-4 border-gamepulse-orange-dark' : ''}`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <img src={conv.profilePic} alt={conv.name} className="w-12 h-12 rounded-full object-cover mr-3 flex-shrink-0" />
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <p className={`font-semibold ${conv.unread ? 'text-neutral-dark-gray' : 'text-neutral-medium-gray'}`}>{conv.name}</p>
                <span className="text-xs text-neutral-medium-gray">{conv.timestamp}</span>
              </div>
              <p className="text-sm text-gamepulse-blue">{conv.role} - {conv.team}</p>
              <p className={`text-sm mt-1 truncate ${conv.unread ? 'font-semibold text-neutral-dark-gray' : 'text-neutral-medium-gray'}`}>
                {conv.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ConversationView Component
const ConversationView = ({ conversation, onBackToList }) => {
  if (!conversation) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center bg-white p-6 text-center text-neutral-medium-gray">
        <FaComments className="text-6xl mb-4 text-neutral-light-gray" />
        <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
        <p className="mb-6">Choose a chat from the sidebar to start messaging</p>
        <button className="bg-gamepulse-orange-dark hover:bg-gamepulse-orange-light text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Start New Chat
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col bg-white">
      {/* Conversation Header */}
      <div className="p-4 border-b border-neutral-light-gray flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onBackToList} className="md:hidden mr-3 text-neutral-medium-gray hover:text-neutral-dark-gray">
            <FaChevronLeft className="text-xl" />
          </button>
          <img src={conversation.profilePic} alt={conversation.name} className="w-12 h-12 rounded-full object-cover mr-3" />
          <div>
            <p className="font-semibold text-neutral-dark-gray">{conversation.name}</p>
            <p className="text-sm text-gamepulse-blue">{conversation.role} - {conversation.team}</p>
          </div>
        </div>
        <div className="flex space-x-4 text-neutral-medium-gray">
          <button className="hover:text-gamepulse-blue transition-colors"><FaPhone className="text-xl" /></button>
          <button className="hover:text-gamepulse-blue transition-colors"><FaVideo className="text-xl" /></button>
          <button className="hover:text-gamepulse-blue transition-colors"><FaInfoCircle className="text-xl" /></button>
        </div>
      </div>

      {/* Message Display Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {conversation.messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'self' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
              message.sender === 'self' ? 'bg-gamepulse-orange-dark text-white' : 'bg-neutral-light-gray-bg text-neutral-dark-gray'
            }`}>
              <p className="text-sm">{message.text}</p>
              <span className={`block text-right mt-1 ${message.sender === 'self' ? 'text-neutral-white opacity-80' : 'text-neutral-medium-gray'} text-xs`}>
                {message.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Area */}
      <div className="p-4 border-t border-neutral-light-gray bg-white">
        <div className="flex items-center space-x-3">
          <button className="text-neutral-medium-gray hover:text-gamepulse-blue transition-colors"><FaPaperclip className="text-xl" /></button>
          <button className="text-neutral-medium-gray hover:text-gamepulse-blue transition-colors"><FaSmile className="text-xl" /></button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow px-4 py-2 rounded-lg bg-neutral-light-gray-bg border border-neutral-light-gray focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
          />
          <button className="text-neutral-medium-gray hover:text-gamepulse-blue transition-colors"><FaMicrophone className="text-xl" /></button>
          <button className="bg-gamepulse-orange-dark hover:bg-gamepulse-orange-light text-white p-3 rounded-full transition-colors">
            <FaPlay className="rotate-90" /> {/* Rotate FaPlay for send icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Messaging Page Component
const MessagingPage = () => {
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [showConversationList, setShowConversationList] = useState(true); // For mobile view

  // Find the selected conversation object
  const selectedConversation = mockConversations.find(conv => conv.id === selectedConversationId);

  // Handle conversation selection for mobile
  const handleSelectConversation = (id) => {
    setSelectedConversationId(id);
    if (window.innerWidth < 768) { // Assuming md breakpoint is 768px
      setShowConversationList(false);
    }
  };

  const handleBackToList = () => {
    setShowConversationList(true);
    setSelectedConversationId(null); // Optional: clear selection when going back
  };

  // Dummy function for "New Message" button
  const handleNewMessage = () => {
    alert("Functionality for starting a new message would go here!");
    // In a real app, this might open a modal to select contacts
  };

  // Placeholder for FaComments as it's not directly available in react-icons/fa
  const FaComments = (props) => (
    <svg viewBox="0 0 576 512" fill="currentColor" {...props}>
      <path d="M576 240c0 10.6-2.9 20.7-8.1 29.3L444.8 448H352c-8.8 0-16-7.2-16-16V368c0-4.4-2.2-8.4-5.7-10.7S321.7 352 317.9 352H208.5L78.6 480.9c-7.9 8.6-19.5 13.1-32.1 13.1C20 494 0 473.3 0 448V16C0 7.2 7.2 0 16 0H464c8.8 0 16 7.2 16 16V208c0 4.4 2.2 8.4 5.7 10.7S494.3 224 498.1 224H544c8.8 0 16 7.2 16 16v0zM224 336v64H32c-8.8 0-16-7.2-16-16V16C16 7.2 23.2 0 32 0H224V336zm240 0V16c0-8.8-7.2-16-16-16H240V336h224zM560 256v160H464c-8.8 0-16-7.2-16-16V256c0-8.8 7.2-16 16-16h80c8.8 0 16 7.2 16 16z"/>
    </svg>
  );


  return (
    <div className="min-h-screen bg-neutral-light-gray-bg font-sans flex flex-col">
      {/* Header - Assuming a consistent app header structure */}
      <header className="bg-white py-3 px-6 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50">
        <Link to="/" className="text-2xl font-heading font-extrabold text-gamepulse-blue-light hover:text-gamepulse-yellow transition-colors">
          GamePulse
        </Link>
        {/* Placeholder for user profile icon in header */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-neutral-dark-gray text-sm font-semibold cursor-pointer">
            <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="User Profile" className="w-8 h-8 rounded-full object-cover mr-2" />
          </div>
        </div>
      </header>

      {/* Main Messaging Layout */}
      <div className="flex-grow flex mt-16 overflow-hidden"> {/* mt-16 to account for fixed header */}
        {/* Conversation List Sidebar */}
        <div className={`
          ${showConversationList ? 'block' : 'hidden'}
          md:block md:flex-shrink-0 md:w-1/3
          h-[calc(100vh-64px)] overflow-hidden
        `}>
          <ConversationList
            conversations={mockConversations}
            onSelectConversation={handleSelectConversation}
            selectedConversationId={selectedConversationId}
            onNewMessage={handleNewMessage}
          />
        </div>

        {/* Conversation View / Empty State */}
        <div className={`
          ${showConversationList ? 'hidden' : 'block'}
          md:block md:flex-grow
          h-[calc(100vh-64px)] overflow-hidden
        `}>
          <ConversationView
            conversation={selectedConversation}
            onBackToList={handleBackToList}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;