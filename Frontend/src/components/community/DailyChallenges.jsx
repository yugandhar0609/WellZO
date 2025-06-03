import React, { useState } from 'react';

const DailyChallenges = () => {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const challenges = [
    {
      id: 1,
      title: '30-Day Morning Routine',
      description: 'Start your day with intention and energy',
      badge: '🌅',
      participants: 2847,
      duration: '30 days',
      difficulty: 'Beginner',
      tasks: [
        'Wake up at 6:00 AM',
        'Drink 16 oz of water',
        '10 minutes of meditation',
        '15 minutes of journaling',
        'Light exercise or stretching'
      ],
      progress: {
        completed: 12,
        total: 30,
        streak: 5,
        todayCompleted: false
      },
      rewards: ['Morning Warrior Badge', 'Early Bird Achievement', 'Consistency Crown']
    },
    {
      id: 2,
      title: 'Mindful March',
      description: '10 minutes of daily meditation for mental clarity',
      badge: '🧘‍♀️',
      participants: 1534,
      duration: '31 days',
      difficulty: 'Intermediate',
      tasks: [
        '10 minutes morning meditation',
        'Mindful breathing during breaks',
        'Evening gratitude reflection',
        'No phone for first hour after waking'
      ],
      progress: {
        completed: 8,
        total: 31,
        streak: 3,
        todayCompleted: true
      },
      rewards: ['Zen Master Badge', 'Mindfulness Monk', 'Peace Keeper']
    },
    {
      id: 3,
      title: 'Plant-Based Power Week',
      description: 'Explore the benefits of plant-based nutrition',
      badge: '🌱',
      participants: 987,
      duration: '7 days',
      difficulty: 'Advanced',
      tasks: [
        'All meals plant-based',
        'Try 2 new vegetables',
        'Drink green smoothie daily',
        'Read plant-based nutrition article'
      ],
      progress: {
        completed: 3,
        total: 7,
        streak: 3,
        todayCompleted: false
      },
      rewards: ['Plant Power Badge', 'Green Warrior', 'Nutrition Explorer']
    },
    {
      id: 4,
      title: 'Hydration Heroes',
      description: 'Drink 8 glasses of water daily for optimal health',
      badge: '💧',
      participants: 3421,
      duration: '14 days',
      difficulty: 'Beginner',
      tasks: [
        'Drink water upon waking',
        '8 glasses throughout the day',
        'Track water intake',
        'Add lemon or cucumber for variety'
      ],
      progress: null, // Not joined
      rewards: ['Hydration Hero Badge', 'Water Warrior', 'Fluid Master']
    }
  ];

  const handleJoinChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setShowJoinModal(true);
  };

  const handleCompleteChallenge = (challengeId) => {
    // Mark challenge as complete for today
    console.log('Challenge completed for today:', challengeId);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-600';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-600';
      case 'Advanced': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getProgressPercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <i className="fas fa-trophy text-white"></i>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Daily Challenges</h2>
            <p className="text-sm text-gray-500">Join the community and build healthy habits</p>
          </div>
        </div>
      </div>

      {/* Challenge List */}
      <div className="p-6 space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`border-2 rounded-xl p-4 transition-all ${
              challenge.progress 
                ? 'border-emerald-200 bg-emerald-50' 
                : 'border-gray-200 hover:border-emerald-300'
            }`}
          >
            {/* Challenge Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{challenge.badge}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                  <p className="text-sm text-gray-600">{challenge.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
            </div>

            {/* Progress Bar (if joined) */}
            {challenge.progress && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress: {challenge.progress.completed}/{challenge.progress.total} days</span>
                  <span>{getProgressPercentage(challenge.progress.completed, challenge.progress.total)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(challenge.progress.completed, challenge.progress.total)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-orange-600 font-medium">
                      <i className="fas fa-fire mr-1"></i>
                      {challenge.progress.streak} day streak
                    </span>
                    <span className={challenge.progress.todayCompleted ? 'text-green-600' : 'text-gray-500'}>
                      <i className={`fas ${challenge.progress.todayCompleted ? 'fa-check' : 'fa-clock'} mr-1`}></i>
                      {challenge.progress.todayCompleted ? 'Completed today' : 'Pending today'}
                    </span>
                  </div>
                  {!challenge.progress.todayCompleted && (
                    <button
                      onClick={() => handleCompleteChallenge(challenge.id)}
                      className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Challenge Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Daily Tasks:</h4>
                <ul className="space-y-1">
                  {challenge.tasks.slice(0, 3).map((task, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <i className="fas fa-check text-emerald-500 text-xs mr-2"></i>
                      {task}
                    </li>
                  ))}
                  {challenge.tasks.length > 3 && (
                    <li className="text-sm text-gray-500">
                      +{challenge.tasks.length - 3} more tasks
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Rewards:</h4>
                <div className="flex flex-wrap gap-1">
                  {challenge.rewards.slice(0, 2).map((reward, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {reward}
                    </span>
                  ))}
                  {challenge.rewards.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{challenge.rewards.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Challenge Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>
                  <i className="fas fa-users mr-1"></i>
                  {challenge.participants.toLocaleString()} joined
                </span>
                <span>
                  <i className="fas fa-calendar mr-1"></i>
                  {challenge.duration}
                </span>
              </div>
              
              {challenge.progress ? (
                <button className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-medium text-sm">
                  <i className="fas fa-check mr-2"></i>
                  Joined
                </button>
              ) : (
                <button
                  onClick={() => handleJoinChallenge(challenge)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all text-sm"
                >
                  Join Challenge
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Join Challenge Modal */}
      {showJoinModal && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-4xl">{selectedChallenge.badge}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedChallenge.title}</h3>
                  <p className="text-sm text-gray-600">{selectedChallenge.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">What you'll do daily:</h4>
                  <ul className="space-y-2">
                    {selectedChallenge.tasks.map((task, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center">
                        <i className="fas fa-check text-emerald-500 text-xs mr-2"></i>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">You'll earn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedChallenge.rewards.map((reward, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {reward}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <i className="fas fa-info-circle"></i>
                    <span className="text-sm font-medium">Ready to start?</span>
                  </div>
                  <p className="text-sm text-emerald-600 mt-1">
                    Join {selectedChallenge.participants.toLocaleString()} others in this {selectedChallenge.duration} journey!
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setShowJoinModal(false);
                    // Handle joining challenge
                    console.log('Joined challenge:', selectedChallenge.id);
                  }}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Join Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyChallenges; 