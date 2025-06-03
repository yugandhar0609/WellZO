import React, { useState } from 'react';
import { ChatBubbleLeftEllipsisIcon, EnvelopeIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// Mock data for inquiries
const mockInquiries = [
  {
    id: 'inq001',
    userName: 'Priya Sharma',
    userImage: 'https://via.placeholder.com/100/E0F2FE/3B82F6?text=PS', // Light blue, dark blue text
    pgName: 'Sunshine Happy Homes',
    messagePreview: 'Hi, I am interested in a single occupancy room. Is one available from next month? Also, could you please share more details about the food menu? Thanks!',
    date: '2024-07-28T10:30:00Z',
    status: 'New',
    contact: 'priya.s@example.com'
  },
  {
    id: 'inq002',
    userName: 'Rohan Mehta',
    userImage: 'https://via.placeholder.com/100/D1FAE5/059669?text=RM', // Light green, dark green text
    pgName: 'Comfort Stay PG',
    messagePreview: 'Looking for a shared room for two people. We are students. Do you have any student discounts?',
    date: '2024-07-27T15:45:00Z',
    status: 'Read',
    contact: '9876500001'
  },
  {
    id: 'inq003',
    userName: 'Aisha Khan',
    userImage: 'https://via.placeholder.com/100/FCE7F3/DB2777?text=AK', // Light pink, dark pink text
    pgName: 'Sunshine Happy Homes',
    messagePreview: 'What are the gate timings? And is there a curfew? I work late shifts sometimes.',
    date: '2024-07-27T09:12:00Z',
    status: 'Replied',
    contact: 'aisha.k@example.com'
  },
];

const PgInquiriesPage = () => {
  const [selectedInquiry, setSelectedInquiry] = useState(mockInquiries[0] || null);

  const getStatusColor = (status) => {
    if (status === 'New') return 'bg-blue-100 text-blue-800';
    if (status === 'Read') return 'bg-yellow-100 text-yellow-800';
    if (status === 'Replied') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inquiries & Messages</h1>
      
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Inquiry List Pane */}
        <div className="md:col-span-1 border-r border-gray-200 h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <input 
                type="text" 
                placeholder="Search inquiries..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>
          <ul className="divide-y divide-gray-200 overflow-y-auto flex-grow">
            {mockInquiries.map((inquiry) => (
              <li 
                key={inquiry.id} 
                className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedInquiry?.id === inquiry.id ? 'bg-emerald-50' : ''}`}
                onClick={() => setSelectedInquiry(inquiry)}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{inquiry.userName}</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>{inquiry.status}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">For: {inquiry.pgName}</p>
                <p className="text-xs text-gray-600 truncate mt-0.5">{inquiry.messagePreview}</p>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {new Date(inquiry.date).toLocaleDateString()} {new Date(inquiry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Message Detail Pane */}
        <div className="md:col-span-2 p-6 h-full flex flex-col">
          {selectedInquiry ? (
            <>
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center mb-2">
                  <img src={selectedInquiry.userImage} alt={selectedInquiry.userName} className="h-12 w-12 rounded-full mr-3" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedInquiry.userName}</h2>
                    <p className="text-sm text-gray-500">Inquiry for: <span className="font-medium text-gray-700">{selectedInquiry.pgName}</span></p>
                  </div>
                  <span className={`ml-auto px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedInquiry.status)}`}>{selectedInquiry.status}</span>
                </div>
                <p className="text-sm text-gray-500">
                    Received: {new Date(selectedInquiry.date).toLocaleString()} <br/>
                    Contact: 
                    {selectedInquiry.contact.includes('@') ? 
                        <a href={`mailto:${selectedInquiry.contact}`} className="text-emerald-600 hover:underline ml-1"><EnvelopeIcon className="h-4 w-4 inline mr-1"/>{selectedInquiry.contact}</a> : 
                        <a href={`tel:${selectedInquiry.contact}`} className="text-emerald-600 hover:underline ml-1"><PhoneIcon className="h-4 w-4 inline mr-1"/>{selectedInquiry.contact}</a>}
                </p>
              </div>
              
              <div className="flex-grow space-y-4 overflow-y-auto pr-2 text-sm text-gray-700 leading-relaxed">
                <p>{selectedInquiry.messagePreview}</p>
                {/* More detailed message content could go here, or a chat history */}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <textarea 
                    placeholder={`Reply to ${selectedInquiry.userName}...`} 
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
                <div className="mt-3 flex justify-end space-x-3">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                        Mark as Read
                    </button>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                        Send Reply
                    </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <ChatBubbleLeftEllipsisIcon className="h-20 w-20 mb-4 text-gray-300" />
              <p className="text-lg">Select an inquiry to view details.</p>
              <p className="text-sm">You have {mockInquiries.length} total inquiries.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PgInquiriesPage; 