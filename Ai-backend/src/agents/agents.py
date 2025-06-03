from crewai import Agent, Task, Crew, Process
from typing import Dict, List, Optional
import json
from datetime import datetime
from data_loader import UserDataManager



class WellzoAgents:
    def __init__(self, user_id: str):
        self.data_manager = UserDataManager(user_id)

    def user_input_agent(self):
        return Agent(
            role="User Input Agent",
            goal="Collect user inputs such as goals, preferences, and body metrics",
            backstory="You are an agent responsible for gathering and validating user inputs for the Wellzo.ai system.",
            verbose=True,
            allow_delegation=False
        )

    def user_profile_agent(self):
        return Agent(
            role="User Profile Agent",
            goal="Store and update user data dynamically",
            backstory="You manage the user's profile, ensuring all data is up-to-date and accessible to other agents.",
            verbose=True,
            allow_delegation=False
        )

    def diet_analysis_agent(self):
        return Agent(
            role="Diet Analysis Agent",
            goal="Analyze the user's current nutritional state",
            backstory="You analyze the user's diet history to provide insights into their nutritional intake.",
            verbose=True,
            allow_delegation=True
        )

    def meal_recommendation_agent(self):
        return Agent(
            role="Meal Recommendation Agent",
            goal="Generate personalized meal plans based on analysis",
            backstory="You create tailored meal plans for the user based on their goals, preferences, and nutritional analysis.",
            verbose=True,
            allow_delegation=True
        )

    def calorie_tracking_agent(self):
        return Agent(
            role="Calorie Tracking Agent",
            goal="Monitor calorie intake and expenditure in real-time",
            backstory="You track the user's calorie intake and expenditure, providing data for progress monitoring and meal planning.",
            verbose=True,
            allow_delegation=True
        )

    def progress_monitoring_agent(self):
        return Agent(
            role="Progress Monitoring Agent",
            goal="Track physical progress and user adherence",
            backstory="You monitor the user's progress towards their goals and assess their adherence to the plan.",
            verbose=True,
            allow_delegation=True
        )

    def feedback_adaptation_agent(self):
        return Agent(
            role="Feedback & Adaptation Agent",
            goal="Adjust recommendations dynamically based on feedback",
            backstory="You adapt the meal plans and recommendations based on user feedback and progress data.",
            verbose=True,
            allow_delegation=True
        )

    def integration_agent(self):
        return Agent(
            role="Integration Agent",
            goal="Sync with smartwatches, health apps, and external databases",
            backstory="You handle integration with external systems to fetch and sync data like metrics and calorie expenditure.",
            verbose=True,
            allow_delegation=False
        )