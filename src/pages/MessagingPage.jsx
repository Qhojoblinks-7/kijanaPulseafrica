// MessagingPage.jsx
import React, { useState, useRef, useEffect } from 'react';

// Mock data for contacts and messages
const MOCK_CONTACTS = [
  {
    id: 'contact-1',
    name: 'Coach John Doe',
    role: 'Coach',
    lastMessage: 'Great practice today, Jane!',
    time: '2 min ago',
    unread: 2,
    avatar: 'https://placehold.co/40x40/FF7F50/FFFFFF?text=JD', // Coral
    isPinned: true,
  },
  {
    id: 'contact-2',
    name: 'Jane Doe',
    role: 'Athlete',
    lastMessage: 'Ready for the game tomorrow!',
    time: 'Yesterday',
    unread: 0,
    avatar: 'https://placehold.co/40x40/6495ED/FFFFFF?text=JD', // Cornflower Blue
    isPinned: true,
  },
  {
    id: 'group-1',
    name: 'Team Managers',
    role: 'Group',
    lastMessage: 'Match schedule confirmed.',
    time: 'Mar 15',
    unread: 5,
    members: 5,
    avatar: 'https://placehold.co/40x40/8A2BE2/FFFFFF?text=TM', // Blue Violet
    isGroup: true,
  },
  {
    id: 'contact-3',
    name: 'Scout Mark',
    role: 'Scout',
    lastMessage: 'Can we discuss Jane\'s performance?',
    time: 'Apr 1',
    unread: 1,
    avatar: 'https://placehold.co/40x40/DE3163/FFFFFF?text=SM', // Cerise
  },
  {
    id: 'contact-4',
    name: 'Parent Sarah',
    role: 'Parent',
    lastMessage: 'Thanks for the update!',
    time: 'Feb 28',
    unread: 0,
    avatar: 'https://placehold.co/40x40/FFD700/FFFFFF?text=PS', // Gold
  },
  {
    id: 'contact-5',
    name: 'Athlete David',
    role: 'Athlete',
    lastMessage: 'New training video posted.',
    time: 'Jan 10',
    unread: 0,
    avatar: 'https://placehold.co/40x40/00CED1/FFFFFF?text=DA', // Dark Turquoise
  },
];

const MOCK_MESSAGES = [
  {
    id: 1,
    senderId: 'contact-1',
    senderName: 'Coach John Doe',
    senderAvatar: 'https://placehold.co/40x40/FF7F50/FFFFFF?text=JD',
    content: 'Great practice today, Jane!',
    type: 'text',
    time: '10:00 AM',
    read: true,
  },
  {
    id: 2,
    senderId: 'current-user',
    senderName: 'You',
    senderAvatar: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=You',
    content: 'Thanks, Coach! Learned a lot.',
    type: 'text',
    time: '10:05 AM',
    read: true,
    isCurrentUser: true,
  },
  {
    id: 3,
    senderId: 'contact-1',
    senderName: 'Coach John Doe',
    senderAvatar: 'https://placehold.co/40x40/FF7F50/FFFFFF?text=JD',
    content: 'Keep up the good work! Don\'t forget to check out the new drills.',
    type: 'text',
    time: '10:15 AM',
    read: true,
  },
  {
    id: 4,
    senderId: 'current-user',
    senderName: 'You',
    senderAvatar: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=You',
    content: 'Will do! Just uploaded a new highlight video from practice. Check it out!',
    type: 'text',
    time: '10:30 AM',
    read: false, // Simulate unread by recipient
    isCurrentUser: true,
  },
  {
    id: 5,
    senderId: 'current-user',
    senderName: 'You',
    senderAvatar: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=You',
    content: 'image message',
    type: 'image',
    images: [
      'https://placehold.co/150x150/A78BFA/FFFFFF?text=Drill+1',
      'https://placehold.co/150x150/6EE7B7/FFFFFF?text=Drill+2',
    ],
    time: '10:31 AM',
    read: false,
    isCurrentUser: true,
  },
  {
    id: 6,
    senderId: 'contact-1',
    senderName: 'Coach John Doe',
    senderAvatar: 'https://placehold.co/40x40/FF7F50/FFFFFF?text=JD',
    content: 'voice message',
    type: 'audio',
    time: '10:45 AM',
    read: true,
  },
  {
    id: 7,
    senderId: 'contact-1',
    senderName: 'Coach John Doe',
    senderAvatar: 'https://placehold.co/40x40/FF7F50/FFFFFF?text=JD',
    content: 'is typing...',
    type: 'typing',
    time: '10:46 AM',
    read: true,
  },
];

// Main MessagingApp Component
function MessagingPage() {
  // State to manage which view is active: 'inbox', 'chat', 'new-message'
  const [currentView, setCurrentView] = useState('inbox');
  const [selectedContact, setSelectedContact] = useState(null); // Stores the contact object for the active chat

  const messagesEndRef = useRef(null);

  // Scroll to the latest message in chat view
  useEffect(() => {
    if (currentView === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, currentView]);

  // Handle opening a specific chat
  const openChat = (contact) => {
    setSelectedContact(contact);
    setCurrentView('chat');
  };

  // Handle initiating a new message
  const startNewMessage = () => {
    setCurrentView('new-message');
  };

  // Chat message bubble component
  const MessageBubble = ({ message, isGroupChat = false }) => {
    const bubbleClass = message.isCurrentUser
      ? 'bg-[#8B5CF6] text-white self-end rounded-bl-xl rounded-tl-xl' // Purple for sent
      : 'bg-[#2E2E2E] text-white self-start rounded-br-xl rounded-tr-xl'; // Dark gray for received

    return (
      <div className={`flex w-full ${message.isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
        {!message.isCurrentUser && !isGroupChat && ( // Only show avatar for non-current user in 1-on-1 chat
          <img src={message.senderAvatar} alt={message.senderName} className="mr-2 h-8 w-8 rounded-full object-cover" />
        )}
         {!message.isCurrentUser && isGroupChat && ( // Always show avatar for non-current user in group chat
          <img src={message.senderAvatar} alt={message.senderName} className="mr-2 h-8 w-8 rounded-full object-cover" />
        )}
        <div className={`flex flex-col max-w-[80%] md:max-w-[60%] lg:max-w-[50%] p-3 rounded-xl shadow-md ${bubbleClass}`}>
          {!message.isCurrentUser && isGroupChat && ( // Show sender name only in group chat for others' messages
            <span className="text-sm font-semibold text-gray-300 mb-1">
              {message.senderName}
            </span>
          )}
          {message.type === 'text' && <p className="break-words">{message.content}</p>}
          {message.type === 'audio' && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19V6a2 2 0 00-2-2H5a2 2 0 00-2 2v13a2 2 0 002 2h4a2 2 0 002-2zM9 19a2 2 0 002 2h4a2 2 0 002-2M9 19h.01M17 19H7"
                />
              </svg>
              <span>Voice Message</span>
              <div className="ml-2 h-4 w-20 rounded-full bg-gray-600"></div>
            </div>
          )}
          {message.type === 'image' && (
            <div className="grid grid-cols-2 gap-2">
              {message.images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt="Shared media"
                  className="h-24 w-24 rounded-lg object-cover cursor-pointer"
                  onClick={() => alert('Image clicked: ' + imgSrc)} // Placeholder for full-screen view
                />
              ))}
            </div>
          )}
          {message.type === 'typing' && (
            <p className="italic text-gray-400">
              <span className="animate-pulse">. . .</span> {message.content}
            </p>
          )}
          <span className={`mt-1 text-xs ${message.isCurrentUser ? 'text-gray-200' : 'text-gray-400'} text-right`}>
            {message.time}
            {message.isCurrentUser && (
              <span className="ml-1">
                {message.read ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M13.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-.707-.707a1 1 0 111.414-1.414l.707.707 3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
            )}
          </span>
        </div>
      </div>
    );
  };

  // --- View Components ---

  // I. Message List / Inbox View
  const InboxView = () => {
    const pinnedContacts = MOCK_CONTACTS.filter(c => c.isPinned);
    const groupContacts = MOCK_CONTACTS.filter(c => c.isGroup);
    const otherContacts = MOCK_CONTACTS.filter(c => !c.isPinned && !c.isGroup);

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between bg-[#242424] p-4 shadow-sm">
          <h1 className="text-xl font-bold text-white">Messages</h1>
          <button
            onClick={startNewMessage}
            aria-label="New message"
            className="rounded-full bg-[#8B5CF6] p-2 text-white shadow-md hover:bg-[#7c3aed]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </header>

        {/* Search Bar */}
        <div className="relative p-4 bg-[#1A1A1A]">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full rounded-full bg-[#333333] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#1A1A1A]">
          {MOCK_CONTACTS.length === 0 ? (
            <NoConversationsState />
          ) : (
            <div className="space-y-3">
                {pinnedContacts.length > 0 && (
                    <>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 pt-2 pb-1">PINNED</h3>
                        {pinnedContacts.map((contact) => (
                            <ConversationCard key={contact.id} contact={contact} onClick={() => openChat(contact)} />
                        ))}
                    </>
                )}
                {groupContacts.length > 0 && (
                    <>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 pt-2 pb-1">GROUPS & CHANNELS</h3>
                        {groupContacts.map((contact) => (
                            <ConversationCard key={contact.id} contact={contact} onClick={() => openChat(contact)} />
                        ))}
                    </>
                )}
                {otherContacts.length > 0 && (
                    <>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 pt-2 pb-1">ALL MESSAGES</h3>
                        {otherContacts.map((contact) => (
                            <ConversationCard key={contact.id} contact={contact} onClick={() => openChat(contact)} />
                        ))}
                    </>
                )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ConversationCard = ({ contact, onClick }) => (
    <div
      className="flex items-center p-3 rounded-xl bg-[#242424] hover:bg-[#333333] cursor-pointer shadow-sm transition-colors duration-200"
      onClick={onClick}
    >
      <img src={contact.avatar} alt={contact.name} className="h-12 w-12 rounded-full object-cover mr-4" />
      <div className="flex-1">
        <p className={`font-semibold ${contact.unread > 0 ? 'text-white' : 'text-gray-300'}`}>
          {contact.name}
          {contact.role && <span className="ml-2 text-xs font-normal text-gray-400">({contact.role})</span>}
        </p>
        <p className={`text-sm ${contact.unread > 0 ? 'text-white font-medium' : 'text-gray-400'} truncate`}>
          {contact.lastMessage}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-400">{contact.time}</p>
        {contact.unread > 0 && (
          <span className="mt-1 inline-block rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
            {contact.unread}
          </span>
        )}
      </div>
    </div>
  );

  // II. Individual Chat View
  const ChatView = ({ contact }) => {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between bg-[#242424] p-4 shadow-sm">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentView('inbox')}
              aria-label="Back to messages"
              className="rounded-full p-2 text-gray-400 hover:bg-[#333333] mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <img src={contact.avatar} alt={contact.name} className="h-10 w-10 rounded-full object-cover mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-white">{contact.name}</h2>
              {contact.isGroup && (
                <p className="text-sm text-gray-400">{contact.members} Members, <span className="text-[#34D399]">Online</span></p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button aria-label="Call" className="rounded-full p-2 text-gray-400 hover:bg-[#333333]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            </button>
            <button aria-label="Video Call" className="rounded-full p-2 text-gray-400 hover:bg-[#333333]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </button>
            <button aria-label="More options" className="rounded-full p-2 text-gray-400 hover:bg-[#333333]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Message Display Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col" style={{ backgroundColor: '#1A1A1A' }}>
          {MOCK_MESSAGES.map((message) => (
            <MessageBubble key={message.id} message={message} isGroupChat={contact.isGroup} />
          ))}
          <div ref={messagesEndRef} /> {/* For auto-scrolling */}
        </div>

        {/* Message Input Area */}
        <div className="flex items-center bg-[#242424] p-4 shadow-inner">
          <button aria-label="Attach media" className="mr-3 rounded-full p-2 text-gray-400 hover:bg-[#333333]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13.5"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-full bg-[#333333] px-4 py-2 text-white placeholder-gray-400 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
          />
          <button aria-label="Send message" className="ml-3 rounded-full bg-[#8B5CF6] p-3 text-white hover:bg-[#7c3aed]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  // III. New Message / Contact Selection
  const NewMessageView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredContacts = MOCK_CONTACTS.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between bg-[#242424] p-4 shadow-sm">
          <button
            onClick={() => setCurrentView('inbox')}
            aria-label="Back to messages"
            className="rounded-full p-2 text-gray-400 hover:bg-[#333333] mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white flex-1 text-center">New Message</h1>
          <div className="w-10"></div> {/* Spacer to balance header */}
        </header>

        {/* Search Bar */}
        <div className="relative p-4 bg-[#1A1A1A]">
          <input
            type="text"
            placeholder="Search for athletes, coaches, or users..."
            className="w-full rounded-full bg-[#333333] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Suggested Contacts/User List */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#1A1A1A] space-y-3">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center p-3 rounded-xl bg-[#242424] hover:bg-[#333333] cursor-pointer shadow-sm transition-colors duration-200"
                onClick={() => openChat(contact)}
              >
                <img src={contact.avatar} alt={contact.name} className="h-12 w-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="font-semibold text-white">{contact.name}</p>
                  {contact.role && <p className="text-sm text-gray-400">{contact.role}</p>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">No matching users found.</p>
          )}
        </div>
      </div>
    );
  };

  // IV. "No Conversations" State
  const NoConversationsState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className="text-xl font-bold text-white mb-4">No conversations yet!</h2>
      <p className="text-gray-400 mb-6">Start connecting with athletes, coaches, and fans.</p>
      <button
        onClick={startNewMessage}
        className="bg-[#8B5CF6] text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-[#7c3aed] transition-colors duration-200 mb-4"
      >
        Send Your First Message!
      </button>
      <a href="#" className="text-[#34D399] hover:underline text-sm mb-2">
        Discover African Sporting Talent
      </a>
      <a href="#" className="text-gray-400 hover:underline text-sm">
        Learn more about GamePulse Africa's mission
      </a>
    </div>
  );

  // Main render logic based on currentView state
  return (
    <div className="flex min-h-screen bg-[#1A1A1A] font-sans text-gray-100">
      {/* Left Sidebar (always present, but hidden on small screens) */}
      <aside className={`fixed left-0 top-0 z-20 h-full w-full flex-col overflow-y-auto bg-[#242424] shadow-lg md:relative md:flex md:w-64 lg:w-80 ${currentView === 'inbox' ? 'flex' : 'hidden'}`}>
        <InboxView />
      </aside>

      {/* Main Content Area (Chat or New Message) */}
      <main className="flex flex-1 flex-col bg-[#1A1A1A] md:ml-64 lg:ml-80">
        {currentView === 'chat' && selectedContact && <ChatView contact={selectedContact} />}
        {currentView === 'new-message' && <NewMessageView />}
        {currentView === 'inbox' && (
            // This div ensures the main content area is empty when inbox is shown on larger screens,
            // allowing the main inbox view to take over the 'aside'
            <div className="hidden md:block flex-1"></div>
        )}
      </main>

      {/* The outline also includes a right sidebar for group info.
          For mobile-first, this would typically be opened as an overlay
          or a separate screen. For desktop/larger screens, it could be a
          third column. I'm keeping the previous right sidebar structure
          and linking it conceptually to the "Group Info" button in the chat header.
          It will be visible only on larger screens for simplicity,
          and a "More Options" menu in the chat header can trigger it.
      */}
      <aside className={`fixed right-0 top-0 z-20 h-full w-64 flex-col overflow-y-auto bg-[#242424] p-4 shadow-lg lg:relative lg:flex ${currentView === 'chat' ? 'flex' : 'hidden'} md:hidden lg:flex`}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Group info</h2>
          <button aria-label="Close" className="rounded-full p-2 hover:bg-[#3A3A3A] lg:hidden"> {/* Hide close button on large screens if always visible */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Group Avatar and Name */}
        <div className="mb-6 flex flex-col items-center">
          <img
            src="https://placehold.co/100x100/7C3AED/FFFFFF?text=D" // Duxica Team Avatar
            alt="Duxica Team"
            className="mb-3 h-24 w-24 rounded-full object-cover"
          />
          <h3 className="text-xl font-semibold text-white">Duxica Team</h3>
          <p className="text-sm text-gray-400">22 Members</p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="mb-2 text-base font-semibold text-white">Description</h4>
          <p className="text-sm text-gray-400">
            We are a digital design agency based in Vancouver, Canada, with 10+ years of experience designing products.
          </p>
          <p className="mt-2 text-sm text-[#34D399]">@Duxica_team</p>
        </div>

        {/* Notifications */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-base font-semibold text-white">Notifications</span>
          {/* Toggle Switch Placeholder */}
          <div className="h-6 w-10 rounded-full bg-gray-600 p-1 flex items-center">
            <div className="h-4 w-4 rounded-full bg-[#8B5CF6]"></div>
          </div>
        </div>

        {/* Shared Media */}
        <div className="mb-6">
          <h4 className="mb-2 flex items-center justify-between text-base font-semibold text-white">
            Shared Media
            <span className="text-sm text-gray-400">(3475 items)</span>
          </h4>
          <div className="mb-4 flex space-x-2">
            <button className="rounded-full bg-[#3A3A3A] px-3 py-1 text-sm text-white hover:bg-[#4A4A4A]">
              Photos
            </button>
            <button className="rounded-full bg-[#3A3A3A] px-3 py-1 text-sm text-white hover:bg-[#4A4A4A]">
              File
            </button>
            <button className="rounded-full bg-[#3A3A3A] px-3 py-1 text-sm text-white hover:bg-[#4A4A4A]">
              Video
            </button>
            <button className="rounded-full bg-[#3A3A3A] px-3 py-1 text-sm text-white hover:bg-[#4A4A4A]">
              Link
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <img
              src="https://placehold.co/80x80/6EE7B7/FFFFFF?text=Media1"
              alt="Shared media thumbnail"
              className="h-20 w-20 rounded-lg object-cover"
            />
            <img
              src="https://placehold.co/80x80/FACC15/FFFFFF?text=Media2"
              alt="Shared media thumbnail"
              className="h-20 w-20 rounded-lg object-cover"
            />
            <img
              src="https://placehold.co/80x80/818CF8/FFFFFF?text=Media3"
              alt="Shared media thumbnail"
              className="h-20 w-20 rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Members List */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-white">Members</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="https://placehold.co/40x40/FFD700/FFFFFF?text=H"
                  alt="Hooman"
                  className="mr-3 h-10 w-10 rounded-full object-cover"
                />
                <span className="text-white">Hooman</span>
              </div>
              <span className="rounded-full bg-[#8B5CF6] px-2 py-1 text-xs text-white">OWNER</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="https://placehold.co/40x40/8B5CF6/FFFFFF?text=A"
                  alt="Alireza"
                  className="mr-3 h-10 w-10 rounded-full object-cover"
                />
                <span className="text-white">Alireza</span>
              </div>
              <span className="text-sm text-gray-400">UI/UX Designer</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="https://placehold.co/40x40/3B82F6/FFFFFF?text=M"
                  alt="Mohammadreza"
                  className="mr-3 h-10 w-10 rounded-full object-cover"
                />
                <span className="text-white">Mohammadreza</span>
              </div>
              <span className="text-sm text-gray-400">3D Designer</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default MessagingPage;
