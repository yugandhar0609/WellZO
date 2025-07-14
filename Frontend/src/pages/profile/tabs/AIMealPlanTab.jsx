import React, { useState } from 'react';

const AIMealPlanTab = ({ currentUser, profileData, setProfileData }) => {
  const [editingPreferences, setEditingPreferences] = useState(false);
  const [goalType, setGoalType] = useState('weight_loss');
  const [dietaryRestrictions, setDietaryRestrictions] = useState(['vegetarian']);

  const mealPlan = {
    breakfast: {
      name: 'Avocado Toast with Eggs',
      calories: 420,
      protein: 18,
      carbs: 28,
      fat: 26,
      time: '08:00',
      ingredients: ['Whole grain bread', 'Avocado', '2 eggs', 'Cherry tomatoes', 'Olive oil'],
      image: 'https://via.placeholder.com/150x100/10b981/ffffff?text=Breakfast'
    },
    lunch: {
      name: 'Quinoa Buddha Bowl',
      calories: 520,
      protein: 22,
      carbs: 65,
      fat: 18,
      time: '13:00',
      ingredients: ['Quinoa', 'Chickpeas', 'Spinach', 'Sweet potato', 'Tahini dressing'],
      image: 'https://via.placeholder.com/150x100/f59e0b/ffffff?text=Lunch'
    },
    dinner: {
      name: 'Grilled Salmon with Vegetables',
      calories: 480,
      protein: 35,
      carbs: 25,
      fat: 28,
      time: '19:00',
      ingredients: ['Salmon fillet', 'Broccoli', 'Asparagus', 'Lemon', 'Herbs'],
      image: 'https://via.placeholder.com/150x100/3b82f6/ffffff?text=Dinner'
    },
    snacks: [
      { name: 'Greek Yogurt with Berries', calories: 150, time: '10:30' },
      { name: 'Handful of Almonds', calories: 160, time: '16:00' }
    ]
  };

  const nutritionSummary = {
    totalCalories: 1730,
    targetCalories: 1800,
    protein: 75,
    carbs: 118,
    fat: 72,
    fiber: 28,
    sugar: 45
  };

  const goalTypes = [
    { id: 'weight_loss', label: 'Weight Loss', icon: '📉' },
    { id: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
    { id: 'maintenance', label: 'Maintenance', icon: '⚖️' },
    { id: 'endurance', label: 'Endurance', icon: '🏃' }
  ];

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'keto', label: 'Keto', icon: '🥑' },
    { id: 'paleo', label: 'Paleo', icon: '🥩' },
    { id: 'gluten_free', label: 'Gluten Free', icon: '🌾' },
    { id: 'dairy_free', label: 'Dairy Free', icon: '🥛' }
  ];

  const upcomingMeals = [
    { name: 'Protein Smoothie Bowl', type: 'breakfast', time: 'Tomorrow 8:00 AM', calories: 380 },
    { name: 'Mediterranean Wrap', type: 'lunch', time: 'Tomorrow 1:00 PM', calories: 450 },
    { name: 'Stir-fry Tofu with Rice', type: 'dinner', time: 'Tomorrow 7:00 PM', calories: 520 }
  ];

  const mealHistory = [
    { date: 'Today', meals: ['Avocado Toast', 'Quinoa Bowl', 'Salmon'], calories: 1420, rating: 4.5 },
    { date: 'Yesterday', meals: ['Oatmeal', 'Chicken Salad', 'Pasta'], calories: 1650, rating: 4.2 },
    { date: '2 days ago', meals: ['Smoothie', 'Wrap', 'Stir-fry'], calories: 1580, rating: 4.8 }
  ];

  const handleDietaryChange = (restriction) => {
    setDietaryRestrictions(prev => 
      prev.includes(restriction) 
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const getMealTypeColor = (type) => {
    const colors = {
      breakfast: 'bg-emerald-100 text-emerald-800',
      lunch: 'bg-orange-100 text-orange-800',
      dinner: 'bg-blue-100 text-blue-800',
      snack: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header with AI Assistant */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-2">
              AI Meal Plan 🤖
            </h2>
            <p className="text-sm sm:text-base text-emerald-600">
              Personalized nutrition plan based on your goals and preferences
            </p>
          </div>
          <button
            onClick={() => setEditingPreferences(!editingPreferences)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            {editingPreferences ? 'Save' : 'Edit Preferences'}
          </button>
        </div>
      </div>

      {/* Preferences Editor */}
      {editingPreferences && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Meal Preferences</h3>
          
          {/* Goal Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Goal Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {goalTypes.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setGoalType(goal.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    goalType === goal.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-2xl block mb-1">{goal.icon}</span>
                    <span className="text-sm font-medium">{goal.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Dietary Restrictions</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {dietaryOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleDietaryChange(option.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    dietaryRestrictions.includes(option.id)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-lg block mb-1">{option.icon}</span>
                    <span className="text-xs font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Nutrition Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Today's Nutrition Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="text-center p-3 sm:p-4 bg-emerald-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-emerald-600">{nutritionSummary.totalCalories}</div>
            <div className="text-xs sm:text-sm text-gray-600">Calories</div>
            <div className="text-xs text-emerald-600">Target: {nutritionSummary.targetCalories}</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">{nutritionSummary.protein}g</div>
            <div className="text-xs sm:text-sm text-gray-600">Protein</div>
            <div className="text-xs text-blue-600">25% of calories</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-orange-600">{nutritionSummary.carbs}g</div>
            <div className="text-xs sm:text-sm text-gray-600">Carbs</div>
            <div className="text-xs text-orange-600">50% of calories</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-purple-600">{nutritionSummary.fat}g</div>
            <div className="text-xs sm:text-sm text-gray-600">Fat</div>
            <div className="text-xs text-purple-600">25% of calories</div>
          </div>
        </div>
      </div>

      {/* Today's Meal Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Today's Meal Plan</h3>
          <button className="text-sm text-emerald-600 hover:text-emerald-700 text-center sm:text-left">
            Regenerate Plan
          </button>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {Object.entries(mealPlan).filter(([key]) => key !== 'snacks').map(([mealType, meal]) => (
            <div key={mealType} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <img 
                src={meal.image} 
                alt={meal.name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMealTypeColor(mealType)} w-fit`}>
                    {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">{meal.time}</span>
                </div>
                <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">{meal.name}</h4>
                <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 mt-1">
                  <span>{meal.calories} cal</span>
                  <span>P: {meal.protein}g</span>
                  <span>C: {meal.carbs}g</span>
                  <span>F: {meal.fat}g</span>
                </div>
              </div>
              <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                <button className="p-1 sm:p-2 text-gray-400 hover:text-emerald-600">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="p-1 sm:p-2 text-gray-400 hover:text-blue-600">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Snacks */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Snacks</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mealPlan.snacks.map((snack, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{snack.name}</div>
                  <div className="text-sm text-gray-600">{snack.time}</div>
                </div>
                <div className="text-sm font-medium text-purple-600">{snack.calories} cal</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Meals & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meals</h3>
          <div className="space-y-3">
            {upcomingMeals.map((meal, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{meal.name}</div>
                  <div className="text-sm text-gray-600">{meal.time}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{meal.calories} cal</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMealTypeColor(meal.type)}`}>
                    {meal.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meal History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Meal History</h3>
          <div className="space-y-3">
            {mealHistory.map((day, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{day.date}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(day.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {day.meals.join(' • ')}
                </div>
                <div className="text-xs text-gray-500">
                  Total: {day.calories} calories
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMealPlanTab; 