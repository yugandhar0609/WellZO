import React from 'react';
import { QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, LifebuoyIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const supportTopics = [
  { 
    name: 'Account & Login Issues', 
    description: 'Trouble accessing your account, password resets, or login errors.',
    icon: UserCircleIcon 
  },
  {
    name: 'Managing Your Listings',
    description: 'Help with creating, editing, or updating your PG/Hostel listings.',
    icon: BuildingOffice2Icon 
  },
  {
    name: 'Inquiries & Bookings',
    description: 'Questions about handling tenant inquiries, managing bookings, or communication tools.',
    icon: ChatBubbleLeftEllipsisIcon
  },
  {
    name: 'Payments & Payouts',
    description: 'Information on receiving payments, payout schedules, or transaction issues.',
    icon: CreditCardIcon
  },
  {
    name: 'Platform Guidelines & Policies',
    description: 'Understanding Wellzo\'s terms of service, community guidelines, and best practices.',
    icon: DocumentTextIcon
  },
  {
    name: 'Technical Support',
    description: 'Reporting bugs, experiencing technical difficulties, or needing help with platform features.',
    icon: WrenchScrewdriverIcon 
  },
];

// Need to import these icons if they are used above
import { UserCircleIcon, BuildingOffice2Icon, ChatBubbleLeftEllipsisIcon, CreditCardIcon, DocumentTextIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const PgSupportPage = () => {
  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <LifebuoyIcon className="mx-auto h-16 w-16 text-emerald-500 mb-3" />
        <h1 className="text-4xl font-bold text-gray-800">Support Center</h1>
        <p className="mt-2 text-lg text-gray-600">We're here to help you succeed. Find answers or get in touch.</p>
      </div>

      {/* FAQ / Knowledge Base Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Frequently Asked Questions & Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportTopics.map((topic) => (
            <div key={topic.name} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <topic.icon className="h-8 w-8 text-emerald-500 mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{topic.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                Learn more &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center">Still Need Help? Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-gray-600">
              If you can't find what you're looking for in our FAQs or guides, our dedicated PG Partner Support team is ready to assist you.
            </p>
            <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
                <EnvelopeIcon className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-gray-700">Email Support</h4>
                    <a href="mailto:pgsupport@wellzo.com" className="text-emerald-600 hover:underline">pgsupport@wellzo.com</a>
                    <p className="text-xs text-gray-500">Typical response time: 24-48 hours</p>
                </div>
            </div>
             <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-gray-700">Live Chat (Coming Soon)</h4>
                    <p className="text-gray-500">Get instant help during business hours.</p>
                    <p className="text-xs text-gray-400 italic">This feature is under development.</p>
                </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">Send us a message</h3>
            <form className="space-y-4">
                <div>
                    <label htmlFor="supportSubject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input type="text" name="supportSubject" id="supportSubject" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="supportMessage" className="block text-sm font-medium text-gray-700">Your Message</label>
                    <textarea name="supportMessage" id="supportMessage" rows="4" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"></textarea>
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm shadow hover:shadow-md">
                    Send Message
                </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PgSupportPage; 