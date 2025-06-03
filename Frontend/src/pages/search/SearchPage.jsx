import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Enhanced Mock Data for different categories including people
const mockData = {
  pgs: [
    { 
      id: 'pg1', 
      name: 'Sunshine Residency', 
      type: 'PG', 
      category: 'accommodation',
      address: 'Anna Nagar, Chennai', 
      rating: 4.7, 
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=250&fit=crop',
      amenities: ['WiFi', 'Food', 'Laundry', 'AC', 'Security'], 
      price: '₹12,000/month',
      description: 'Premium PG accommodation with modern amenities',
      reviews: 142,
      distance: '1.2 km',
      available: true
    },
    { 
      id: 'pg2', 
      name: 'Elite Stay', 
      type: 'PG', 
      category: 'accommodation',
      address: 'T. Nagar, Chennai', 
      rating: 4.5, 
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop',
      amenities: ['WiFi', 'Food', 'Gym', 'Parking'], 
      price: '₹10,500/month',
      description: 'Comfortable living with excellent facilities',
      reviews: 89,
      distance: '2.1 km',
      available: true
    },
    { 
      id: 'pg3', 
      name: 'Budget Stay', 
      type: 'PG', 
      category: 'accommodation',
      address: 'Anna Nagar, Chennai', 
      rating: 4.2, 
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop',
      amenities: ['WiFi', 'Food', 'Security'], 
      price: '₹8,500/month',
      description: 'Affordable accommodation for students',
      reviews: 67,
      distance: '0.9 km',
      available: true
    }
  ],
  gyms: [
    { 
      id: 'gym1', 
      name: 'FitZone Premium', 
      type: 'Gym', 
      category: 'fitness',
      address: 'Anna Nagar, Chennai', 
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      facilities: ['Cardio', 'Weights', 'Personal Training', 'Steam Bath'], 
      price: '₹3,500/month',
      description: 'State-of-the-art fitness center with expert trainers',
      reviews: 256,
      distance: '0.8 km',
      available: true
    },
    { 
      id: 'gym2', 
      name: 'Iron Paradise', 
      type: 'Gym', 
      category: 'fitness',
      address: 'Adyar, Chennai', 
      rating: 4.6, 
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop',
      facilities: ['CrossFit', 'Powerlifting', 'Nutrition Counseling'], 
      price: '₹4,200/month',
      description: 'Professional gym for serious fitness enthusiasts',
      reviews: 178,
      distance: '3.2 km',
      available: true
    }
  ],
  doctors: [
    { 
      id: 'doc1', 
      name: 'Dr. Priya Sharma', 
      type: 'Doctor', 
      category: 'healthcare',
      specialty: 'General Physician',
      address: 'Anna Nagar, Chennai', 
      rating: 4.9, 
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=250&fit=crop',
      experience: '12 years',
      price: '₹500/consultation',
      description: 'Experienced physician specializing in preventive healthcare',
      reviews: 324,
      distance: '1.5 km',
      available: true
    },
    { 
      id: 'doc2', 
      name: 'Dr. Rajesh Kumar', 
      type: 'Doctor', 
      category: 'healthcare',
      specialty: 'Cardiologist',
      address: 'T. Nagar, Chennai', 
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=250&fit=crop',
      experience: '15 years',
      price: '₹800/consultation',
      description: 'Leading cardiologist with expertise in heart diseases',
      reviews: 289,
      distance: '2.3 km',
      available: true
    }
  ],
  nutrition: [
    { 
      id: 'nut1', 
      name: 'NutriWell Center', 
      type: 'Nutrition Center', 
      category: 'nutrition',
      address: 'Anna Nagar, Chennai', 
      rating: 4.7, 
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop',
      services: ['Diet Planning', 'Weight Management', 'Sports Nutrition'], 
      price: '₹2,000/month',
      description: 'Comprehensive nutrition counseling and meal planning',
      reviews: 167,
      distance: '0.9 km',
      available: true
    }
  ],
  people: [
    {
      id: 'user1',
      name: 'Arjun Patel',
      type: 'Community Member',
      category: 'people',
      username: '@arjun_fitness',
      bio: 'Fitness enthusiast and yoga instructor. Love helping others achieve their wellness goals! 🧘‍♂️💪',
      location: 'Anna Nagar, Chennai',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      badges: ['Fitness Expert', 'Yoga Instructor', 'Nutrition Enthusiast'],
      rating: 4.8,
      followers: 245,
      following: 189,
      posts: 67,
      interests: ['Yoga', 'Strength Training', 'Meditation', 'Nutrition'],
      joinDate: 'Jan 2023',
      isOnline: true,
      level: 'Gold',
      achievements: ['30-Day Streak', 'Community Helper', 'Fitness Mentor'],
      isConnected: false,
      mutualConnections: 12
    },
    {
      id: 'user2', 
      name: 'Priya Sharma',
      type: 'Community Member',
      category: 'people',
      username: '@priya_wellness',
      bio: 'Nutritionist & wellness coach. Sharing healthy recipes and lifestyle tips. Let\'s grow together! 🌱✨',
      location: 'T. Nagar, Chennai',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b412b92b?w=300&h=300&fit=crop&crop=face',
      badges: ['Nutrition Expert', 'Wellness Coach', 'Recipe Creator'],
      rating: 4.9,
      followers: 312,
      following: 156,
      posts: 89,
      interests: ['Nutrition', 'Cooking', 'Wellness', 'Mental Health'],
      joinDate: 'Mar 2023',
      isOnline: false,
      level: 'Platinum',
      achievements: ['Top Contributor', 'Recipe Master', 'Wellness Advocate'],
      isConnected: true,
      mutualConnections: 8
    },
    {
      id: 'user3',
      name: 'Rahul Kumar',
      type: 'Community Member', 
      category: 'people',
      username: '@rahul_runner',
      bio: 'Marathon runner and cycling enthusiast. Always up for outdoor adventures and fitness challenges! 🏃‍♂️🚴‍♂️',
      location: 'Adyar, Chennai',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      badges: ['Marathon Runner', 'Cycling Pro', 'Adventure Seeker'],
      rating: 4.7,
      followers: 198,
      following: 223,
      posts: 54,
      interests: ['Running', 'Cycling', 'Adventure Sports', 'Endurance Training'],
      joinDate: 'Feb 2023',
      isOnline: true,
      level: 'Silver',
      achievements: ['Marathon Finisher', 'Distance Champion', 'Outdoor Explorer'],
      isConnected: false,
      mutualConnections: 15
    },
    {
      id: 'user4',
      name: 'Sneha Reddy',
      type: 'Community Member',
      category: 'people', 
      username: '@sneha_mindful',
      bio: 'Mental health advocate and meditation practitioner. Creating a supportive community for wellness journeys 🧠💜',
      location: 'Anna Nagar, Chennai',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      badges: ['Mental Health Advocate', 'Meditation Guide', 'Community Builder'],
      rating: 4.9,
      followers: 267,
      following: 134,
      posts: 78,
      interests: ['Mental Health', 'Meditation', 'Mindfulness', 'Community Building'],
      joinDate: 'Dec 2022',
      isOnline: false,
      level: 'Platinum',
      achievements: ['Mindfulness Master', 'Support Champion', 'Wellness Leader'],
      isConnected: false,
      mutualConnections: 9
    },
    {
      id: 'user5',
      name: 'Vikram Singh',
      type: 'Community Member',
      category: 'people',
      username: '@vikram_strength',
      bio: 'Powerlifting coach and strength trainer. Helping people build physical and mental strength 💪🔥',
      location: 'T. Nagar, Chennai', 
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      badges: ['Powerlifting Coach', 'Strength Trainer', 'Motivational Speaker'],
      rating: 4.8,
      followers: 189,
      following: 98,
      posts: 43,
      interests: ['Powerlifting', 'Strength Training', 'Motivation', 'Coaching'],
      joinDate: 'Apr 2023',
      isOnline: true,
      level: 'Gold',
      achievements: ['Strength Master', 'Coaching Excellence', 'Transformation Guide'],
      isConnected: false,
      mutualConnections: 7
    },
    {
      id: 'user6',
      name: 'Anjali Nair',
      type: 'Community Member',
      category: 'people',
      username: '@anjali_dance',
      bio: 'Dance fitness instructor spreading joy through movement. Life is better when you dance! 💃✨',
      location: 'Adyar, Chennai',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
      badges: ['Dance Instructor', 'Fitness Choreographer', 'Joy Spreader'],
      rating: 4.6,
      followers: 156,
      following: 201,
      posts: 62,
      interests: ['Dance', 'Choreography', 'Fitness', 'Music'],
      joinDate: 'May 2023',
      isOnline: false,
      level: 'Silver',
      achievements: ['Dance Master', 'Choreography Expert', 'Fitness Innovator'],
      isConnected: true,
      mutualConnections: 11
    }
  ]
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResponse, setSearchResponse] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [connections, setConnections] = useState(new Set());
  const searchInputRef = useRef(null);

  // Enhanced search suggestions including people
  const suggestions = [
    "PGs in Anna Nagar",
    "Best gyms near T. Nagar", 
    "Doctors in Adyar",
    "Nutrition centers in Chennai",
    "Fitness enthusiasts in Anna Nagar",
    "Yoga instructors near me",
    "Running partners in Chennai",
    "Wellness coaches in T. Nagar",
    "Dance fitness instructors",
    "Mental health advocates"
  ];

  // Search tabs
  const searchTabs = [
    { id: 'all', label: 'All', icon: 'fas fa-globe', count: 0 },
    { id: 'people', label: 'People', icon: 'fas fa-users', count: 0 },
    { id: 'places', label: 'Places', icon: 'fas fa-map-marker-alt', count: 0 },
    { id: 'services', label: 'Services', icon: 'fas fa-concierge-bell', count: 0 }
  ];

  // Generate AI response based on search results including people
  const generateAIResponse = (query, results) => {
    const lowerQuery = query.toLowerCase();
    
    // Determine search intent
    let searchType = 'general';
    let location = '';
    
    if (lowerQuery.includes('people') || lowerQuery.includes('user') || lowerQuery.includes('member') || 
        lowerQuery.includes('coach') || lowerQuery.includes('instructor') || lowerQuery.includes('trainer') ||
        lowerQuery.includes('enthusiast') || lowerQuery.includes('partner')) searchType = 'people';
    else if (lowerQuery.includes('pg') || lowerQuery.includes('accommodation')) searchType = 'accommodation';
    else if (lowerQuery.includes('gym') || lowerQuery.includes('fitness')) searchType = 'fitness';
    else if (lowerQuery.includes('doctor') || lowerQuery.includes('medical')) searchType = 'healthcare';
    else if (lowerQuery.includes('nutrition') || lowerQuery.includes('diet')) searchType = 'nutrition';
    
    if (lowerQuery.includes('anna nagar')) location = 'Anna Nagar';
    else if (lowerQuery.includes('t. nagar') || lowerQuery.includes('t nagar')) location = 'T. Nagar';
    else if (lowerQuery.includes('adyar')) location = 'Adyar';

    // Generate contextual response
    let response = {
      query: query,
      analysis: '',
      recommendations: [],
      summary: '',
      results: results
    };

    if (results.length === 0) {
      response.analysis = `I couldn't find any specific results for "${query}" in our current database. This might be because the search terms are too specific or the services aren't available in the mentioned area.`;
      response.summary = "Try broadening your search or check nearby areas for similar services.";
      return response;
    }

    // Generate analysis based on search type
    switch (searchType) {
      case 'people':
        const topRatedPerson = results.sort((a, b) => b.rating - a.rating)[0];
        const mostConnected = results.sort((a, b) => b.followers - a.followers)[0];
        const nearbyPeople = results.filter(person => location && person.location?.includes(location));
        
        response.analysis = `I found ${results.length} community members matching your search ${location ? `in ${location}` : 'in Chennai'}. ${topRatedPerson.name} (${topRatedPerson.username}) has the highest community rating at ${topRatedPerson.rating}/5, while ${mostConnected.name} has the largest following with ${mostConnected.followers} followers. ${nearbyPeople.length > 0 ? `${nearbyPeople.length} members are located in ${location}.` : ''}`;
        
        response.recommendations = results.slice(0, 3).map((person, index) => {
          const connectionStatus = person.isConnected ? 'Already connected' : 'Available to connect';
          return `**${person.name}** (${person.username}) - ${person.badges.join(', ')}, ${person.rating}/5 rating, ${person.followers} followers, ${connectionStatus}`;
        });
        
        response.summary = `For your wellness journey, I recommend connecting with ${topRatedPerson.name} for their expertise in ${topRatedPerson.interests.slice(0, 2).join(' & ')}.`;
        break;

      case 'accommodation':
        const avgPrice = results.reduce((sum, item) => sum + parseInt(item.price.replace(/[₹,]/g, '').split('/')[0]), 0) / results.length;
        const topRated = results.sort((a, b) => b.rating - a.rating)[0];
        const mostAffordable = results.sort((a, b) => parseInt(a.price.replace(/[₹,]/g, '').split('/')[0]) - parseInt(b.price.replace(/[₹,]/g, '').split('/')[0]))[0];
        
        response.analysis = `I found ${results.length} PG accommodations ${location ? `in ${location}` : 'in Chennai'}. The average price range is around ₹${Math.round(avgPrice).toLocaleString()}/month. ${topRated.name} has the highest rating at ${topRated.rating}/5, while ${mostAffordable.name} offers the most budget-friendly option at ${mostAffordable.price}.`;
        
        response.recommendations = [
          `**Best Overall**: ${topRated.name} - Excellent rating of ${topRated.rating}/5 with amenities like ${topRated.amenities.slice(0, 3).join(', ')}`,
          `**Most Affordable**: ${mostAffordable.name} - Great value at ${mostAffordable.price}`,
          results.length > 2 ? `**Good Alternative**: ${results[2]?.name} - Balanced option with ${results[2]?.amenities?.length || 0} amenities` : null
        ].filter(Boolean);
        
        response.summary = `Based on your search, I recommend ${topRated.name} for the best overall experience, or ${mostAffordable.name} if budget is your primary concern.`;
        break;

      case 'fitness':
        const topGym = results.sort((a, b) => b.rating - a.rating)[0];
        
        response.analysis = `I found ${results.length} fitness centers ${location ? `in ${location}` : 'in Chennai'}. Membership fees range from ${results.sort((a, b) => parseInt(a.price.replace(/[₹,]/g, '').split('/')[0]) - parseInt(b.price.replace(/[₹,]/g, '').split('/')[0]))[0].price} to ${results.sort((a, b) => parseInt(b.price.replace(/[₹,]/g, '').split('/')[0]) - parseInt(a.price.replace(/[₹,]/g, '').split('/')[0]))[0].price}. ${topGym.name} stands out with a ${topGym.rating}/5 rating and offers ${topGym.facilities.join(', ')}.`;
        
        response.recommendations = results.map((gym, index) => 
          `**${index === 0 ? 'Top Choice' : `Option ${index + 1}`}**: ${gym.name} - ${gym.rating}/5 rating, ${gym.price}, specializes in ${gym.facilities.slice(0, 2).join(' & ')}`
        );
        
        response.summary = `For serious fitness goals, I'd recommend ${topGym.name} due to its excellent rating and comprehensive facilities.`;
        break;

      case 'healthcare':
        const topDoc = results.sort((a, b) => b.rating - a.rating)[0];
        
        response.analysis = `I found ${results.length} healthcare professional(s) ${location ? `in ${location}` : 'in Chennai'}. Dr. ${topDoc.name.replace('Dr. ', '')} has the highest rating at ${topDoc.rating}/5 and specializes in ${topDoc.specialty}. Consultation fees range from ${results.sort((a, b) => parseInt(a.price.replace(/[₹]/g, '').split('/')[0]) - parseInt(b.price.replace(/[₹]/g, '').split('/')[0]))[0].price} to ${results.sort((a, b) => parseInt(b.price.replace(/[₹]/g, '').split('/')[0]) - parseInt(a.price.replace(/[₹]/g, '').split('/')[0]))[0].price}.`;
        
        response.recommendations = results.map((doc, index) => 
          `**${doc.name}** - ${doc.specialty}, ${doc.experience} experience, ${doc.rating}/5 rating (${doc.reviews} reviews)`
        );
        
        response.summary = `Based on ratings and experience, I recommend ${topDoc.name} for their expertise in ${topDoc.specialty}.`;
        break;

      case 'nutrition':
        const topNutrition = results[0];
        
        response.analysis = `I found ${results.length} nutrition center(s) in Chennai. ${topNutrition.name} offers comprehensive services including ${topNutrition.services.join(', ')} at ${topNutrition.price}.`;
        
        response.recommendations = results.map(center => 
          `**${center.name}** - ${center.rating}/5 rating, offers ${center.services.join(', ')}, ${center.price}`
        );
        
        response.summary = `For comprehensive nutrition guidance, ${topNutrition.name} appears to be your best option with a ${topNutrition.rating}/5 rating.`;
        break;

      default:
        response.analysis = `I found ${results.length} results matching your search criteria. Here's what I discovered:`;
        response.summary = "Review the options below and choose based on your specific needs and preferences.";
    }

    return response;
  };

  // Typing effect for AI response
  useEffect(() => {
    if (searchResponse && searchResponse.analysis) {
      const fullText = searchResponse.analysis;
      if (typingIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setTypingText(prev => prev + fullText[typingIndex]);
          setTypingIndex(prev => prev + 1);
        }, 30);
        return () => clearTimeout(timeout);
      }
    }
  }, [searchResponse, typingIndex]);

  // Handle search
  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setShowSuggestions(false);
    setSearchResponse(null);
    setTypingText('');
    setTypingIndex(0);

    // Add to search history
    if (!searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
    }

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Intelligent search logic
    let searchResults = [];
    const lowerQuery = query.toLowerCase();

    // Search across all categories
    Object.keys(mockData).forEach(category => {
      mockData[category].forEach(item => {
        const matchScore = calculateMatchScore(item, lowerQuery);
        if (matchScore > 0) {
          searchResults.push({ ...item, matchScore, searchQuery: query });
        }
      });
    });

    // Sort by relevance
    searchResults.sort((a, b) => b.matchScore - a.matchScore);

    // Generate AI response
    const aiResponse = generateAIResponse(query, searchResults);
    setSearchResponse(aiResponse);
    setIsSearching(false);
  };

  // Calculate match score for intelligent search including people
  const calculateMatchScore = (item, query) => {
    let score = 0;
    const searchTerms = query.split(' ');

    searchTerms.forEach(term => {
      if (item.name.toLowerCase().includes(term)) score += 3;
      if (item.address?.toLowerCase().includes(term) || item.location?.toLowerCase().includes(term)) score += 2;
      if (item.type.toLowerCase().includes(term)) score += 2;
      if (item.description?.toLowerCase().includes(term) || item.bio?.toLowerCase().includes(term)) score += 1;
      if (item.specialty?.toLowerCase().includes(term)) score += 2;
      if (item.username?.toLowerCase().includes(term)) score += 2;
      if (item.amenities?.some(amenity => amenity.toLowerCase().includes(term))) score += 1;
      if (item.facilities?.some(facility => facility.toLowerCase().includes(term))) score += 1;
      if (item.services?.some(service => service.toLowerCase().includes(term))) score += 1;
      if (item.interests?.some(interest => interest.toLowerCase().includes(term))) score += 2;
      if (item.badges?.some(badge => badge.toLowerCase().includes(term))) score += 2;
    });

    return score;
  };

  // Filter results by active tab
  const getFilteredResults = (results) => {
    if (!results) return [];
    
    switch (activeTab) {
      case 'people':
        return results.filter(item => item.category === 'people');
      case 'places':
        return results.filter(item => ['accommodation', 'fitness'].includes(item.category));
      case 'services':
        return results.filter(item => ['healthcare', 'nutrition'].includes(item.category));
      default:
        return results;
    }
  };

  // Handle connection
  const handleConnect = (personId) => {
    setConnections(prev => new Set([...prev, personId]));
    // Update the person's connection status in search results
    if (searchResponse) {
      const updatedResults = searchResponse.results.map(person => 
        person.id === personId ? { ...person, isConnected: true } : person
      );
      setSearchResponse({ ...searchResponse, results: updatedResults });
    }
  };

  // Handle chat
  const handleStartChat = (person) => {
    setSelectedPerson(person);
    setShowChatModal(true);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // In a real app, this would send the message to the backend
    console.log(`Sending message to ${selectedPerson.name}: ${chatMessage}`);
    setChatMessage('');
    setShowChatModal(false);
    
    // Show success notification (you could use a toast library)
    alert(`Message sent to ${selectedPerson.name}!`);
  };

  // Enhanced result card component for people
  const PersonCard = ({ person, index }) => (
    <div className="group bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 hover:border-purple-200 hover:-translate-y-1">
      <div className="relative p-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img 
              src={person.image} 
              alt={person.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            {person.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
            )}
            <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">#{index + 1}</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">
                  {person.name}
                </h4>
                <p className="text-purple-600 text-sm font-medium">{person.username}</p>
              </div>
              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                <i className="fas fa-star text-xs"></i>
                <span>{person.rating}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">{person.bio}</p>

            <div className="flex items-center text-gray-500 text-xs mb-3">
              <i className="fas fa-map-marker-alt mr-1 text-purple-500"></i>
              <span className="mr-4">{person.location}</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                person.level === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                person.level === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {person.level}
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {person.badges.slice(0, 2).map((badge, idx) => (
                <span key={idx} className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                  {badge}
                </span>
              ))}
              {person.badges.length > 2 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                  +{person.badges.length - 2} more
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div>
                <p className="text-sm font-bold text-gray-900">{person.followers}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{person.following}</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{person.posts}</p>
                <p className="text-xs text-gray-500">Posts</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {person.isConnected || connections.has(person.id) ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleStartChat(person)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <i className="fas fa-comment text-xs"></i>
                    <span>Message</span>
                  </button>
                  <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    <i className="fas fa-check text-xs"></i>
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2 w-full">
                  <button 
                    onClick={() => handleConnect(person.id)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <i className="fas fa-user-plus text-xs"></i>
                    <span>Connect</span>
                  </button>
                  <button 
                    onClick={() => handleStartChat(person)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-comment text-xs"></i>
                  </button>
                </div>
              )}
            </div>

            {person.mutualConnections > 0 && (
              <div className="mt-3 flex items-center text-xs text-gray-500">
                <div className="flex -space-x-1 mr-2">
                  {[...Array(Math.min(3, person.mutualConnections))].map((_, idx) => (
                    <div key={idx} className="w-5 h-5 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full border border-white"></div>
                  ))}
                </div>
                <span>{person.mutualConnections} mutual connections</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced result card component for places/services
  const ResultCard = ({ item, index }) => (
    <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 hover:border-purple-200 hover:-translate-y-1">
      <div className="relative overflow-hidden h-40">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            #{index + 1}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
            {item.distance}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-bold text-gray-900 text-sm group-hover:text-purple-600 transition-colors">
            {item.name}
          </h4>
          <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            <i className="fas fa-star text-xs"></i>
            <span>{item.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-xs mb-2 leading-relaxed">{item.description}</p>

        <div className="flex items-center text-gray-500 text-xs mb-2">
          <i className="fas fa-map-marker-alt mr-1 text-purple-500"></i>
          <span>{item.address}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {item.price}
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-search text-white"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  WellZO Discovery
                </h1>
                <p className="text-xs text-gray-600">Find people, places & services</p>
              </div>
            </Link>
            <Link 
              to="/dashboard"
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
            >
              <i className="fas fa-arrow-left"></i>
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Search Section */}
        {!searchResponse && (
          <div className="py-16 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What are you looking for?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Discover people, places, and services in the WellZO community. Find fitness partners, coaches, gyms, and more.
              </p>
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="relative mb-8 max-w-4xl mx-auto">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Try: 'fitness coaches in Anna Nagar' or 'yoga instructors near me'"
              className="w-full bg-white/90 backdrop-blur-xl border-2 border-gray-200 rounded-2xl px-6 py-4 text-base focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 shadow-lg"
            />
            <button
              onClick={() => handleSearch()}
              disabled={isSearching}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <i className="fas fa-search"></i>
              )}
            </button>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && !isSearching && !searchResponse && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4 z-40">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 mb-3">Try searching for:</h4>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                      handleSearch(suggestion);
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-purple-50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-search text-purple-400 group-hover:text-purple-600"></i>
                      <span className="text-gray-700 group-hover:text-gray-900 text-sm">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>

              {searchHistory.length > 0 && (
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">Recent searches:</h4>
                  {searchHistory.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(query);
                        setShowSuggestions(false);
                        handleSearch(query);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600 flex items-center space-x-2"
                    >
                      <i className="fas fa-history text-gray-400"></i>
                      <span>{query}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Tabs */}
        {searchResponse && (
          <div className="mb-8">
            <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-xl rounded-2xl p-1 border border-gray-200/50 shadow-lg max-w-lg">
              {searchTabs.map((tab) => {
                const filteredResults = getFilteredResults(searchResponse.results);
                const count = tab.id === 'all' ? searchResponse.results.length : 
                             tab.id === 'people' ? searchResponse.results.filter(r => r.category === 'people').length :
                             tab.id === 'places' ? searchResponse.results.filter(r => ['accommodation', 'fitness'].includes(r.category)).length :
                             searchResponse.results.filter(r => ['healthcare', 'nutrition'].includes(r.category)).length;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                  >
                    <i className={`${tab.icon} text-xs`}></i>
                    <span>{tab.label}</span>
                    {count > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        activeTab === tab.id ? 'bg-white/20' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* AI Response Section */}
        {isSearching && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-200/50">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">WellZO AI is analyzing...</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span>Searching through community...</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <span>Analyzing matching criteria...</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <span>Generating recommendations...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Response */}
        {searchResponse && (
          <div className="max-w-6xl mx-auto space-y-6 pb-8">
            {/* AI Response */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-200/50">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-robot text-white"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="font-semibold text-gray-900">WellZO Discovery AI</h3>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Assistant</span>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <div className="text-gray-700 leading-relaxed mb-4">
                      {typingText}
                      {typingIndex < searchResponse.analysis.length && (
                        <span className="inline-block w-2 h-5 bg-purple-500 animate-pulse ml-1"></span>
                      )}
                    </div>
                    
                    {typingIndex >= searchResponse.analysis.length && searchResponse.recommendations.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 mb-3">My Recommendations:</h4>
                        <div className="space-y-2">
                          {searchResponse.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">{index + 1}</span>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: rec }}></p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {typingIndex >= searchResponse.analysis.length && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                        <p className="text-gray-700 font-medium text-sm">{searchResponse.summary}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {searchResponse.results.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activeTab === 'all' ? 'All Results' : 
                     activeTab === 'people' ? 'Community Members' :
                     activeTab === 'places' ? 'Places' : 'Services'} 
                    ({getFilteredResults(searchResponse.results).length} found)
                  </h3>
                  <span className="text-sm text-gray-600">Sorted by relevance</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredResults(searchResponse.results).map((item, index) => (
                    item.category === 'people' ? (
                      <PersonCard key={item.id} person={item} index={index} />
                    ) : (
                      <ResultCard key={item.id} item={item} index={index} />
                    )
                  ))}
                </div>
              </div>
            )}

            {/* No Results for Active Tab */}
            {searchResponse.results.length > 0 && getFilteredResults(searchResponse.results).length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No {activeTab} found</h3>
                <p className="text-gray-600 mb-4">Try switching to a different tab or modify your search terms.</p>
                <button 
                  onClick={() => setActiveTab('all')}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  View All Results
                </button>
              </div>
            )}

            {/* Follow-up Questions */}
            <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-6 border border-gray-200/50">
              <h4 className="font-semibold text-gray-900 mb-3">Ask me more:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Find more people with similar interests",
                  "Show me coaches in nearby areas", 
                  "Connect me with wellness experts",
                  "Find fitness partners for group workouts"
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(question);
                      handleSearch(question);
                    }}
                    className="text-left p-3 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-colors text-sm text-gray-700 hover:text-purple-600"
                  >
                    <i className="fas fa-question-circle mr-2 text-purple-400"></i>
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Click outside to close suggestions */}
        {showSuggestions && (
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setShowSuggestions(false)}
          ></div>
        )}
      </div>

      {/* Chat Modal */}
      {showChatModal && selectedPerson && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 rounded-t-3xl">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={selectedPerson.image} 
                    alt={selectedPerson.name} 
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-lg"
                  />
                  {selectedPerson.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedPerson.name}</h3>
                  <p className="text-sm text-purple-600 font-medium">{selectedPerson.username}</p>
                  <p className="text-xs text-gray-500">{selectedPerson.isOnline ? 'Online now' : 'Last seen recently'}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChatModal(false)}
                className="p-2 rounded-xl hover:bg-red-50 transition-colors border border-gray-200 hover:border-red-200"
              >
                <i className="fas fa-times text-gray-500 hover:text-red-600"></i>
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-6">
              <div className="mb-6">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex flex-wrap gap-1">
                      {selectedPerson.badges.slice(0, 2).map((badge, idx) => (
                        <span key={idx} className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedPerson.bio}</p>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{selectedPerson.followers}</p>
                      <p className="text-xs text-gray-500">Followers</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{selectedPerson.rating}</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{selectedPerson.posts}</p>
                      <p className="text-xs text-gray-500">Posts</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Send a message</label>
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder={`Hi ${selectedPerson.name.split(' ')[0]}, I'd love to connect and learn more about your wellness journey...`}
                    className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    rows="4"
                  />
                </div>

                {/* Quick Message Templates */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">Quick messages:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Hi! I'd love to connect and learn from your experience.",
                      "Would you like to be workout partners?",
                      "I'm interested in your wellness coaching. Can we chat?",
                      "Great profile! Let's connect and motivate each other."
                    ].map((template, idx) => (
                      <button
                        key={idx}
                        onClick={() => setChatMessage(template)}
                        className="text-left p-2 bg-gray-50 hover:bg-purple-50 rounded-lg text-xs text-gray-700 hover:text-purple-600 transition-colors border border-gray-100 hover:border-purple-200"
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowChatModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <i className="fas fa-paper-plane text-sm"></i>
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage; 