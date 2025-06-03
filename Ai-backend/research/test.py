from crewai import Agent, Task, Crew, Process
from typing import Dict, List, Optional
import json
from datetime import datetime

# Helper class to manage user data persistence
class UserDataManager:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.user_data = {
            "goals": {},
            "preferences": {},
            "metrics": {},
            "diet_history": [],
            "calorie_log": [],
            "progress": [],
            "meal_plans": []
        }
        self._load_data()

    def _load_data(self):
        try:
            with open(f"{self.user_id}_data.json", "r") as f:
                self.user_data = json.load(f)
        except FileNotFoundError:
            self._save_data()

    def _save_data(self):
        with open(f"{self.user_id}_data.json", "w") as f:
            json.dump(self.user_data, f)

    def update_data(self, key: str, value: Dict):
        self.user_data[key].update(value)
        self._save_data()

    def append_data(self, key: str, value: Dict):
        self.user_data[key].append(value)
        self._save_data()

# Define Agents
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

# Define Tasks
class WellzoTasks:
    def __init__(self, agents: WellzoAgents, data_manager: UserDataManager):
        self.agents = agents
        self.data_manager = data_manager

    def collect_user_input(self, input_data: Dict):
        return Task(
            description=f"Collect user input: {input_data}",
            agent=self.agents.user_input_agent(),
            expected_output="Validated user input data",
            callback=lambda output: self.data_manager.update_data("goals", input_data.get("goals", {})) or
                                   self.data_manager.update_data("preferences", input_data.get("preferences", {})) or
                                   self.data_manager.update_data("metrics", input_data.get("metrics", {}))
        )

    def update_user_profile(self):
        return Task(
            description="Update user profile with latest data",
            agent=self.agents.user_profile_agent(),
            expected_output="Updated user profile",
            callback=lambda output: None  # Data already updated via data_manager
        )

    def analyze_diet(self, current_meal: Dict):
        return Task(
            description=f"Analyze diet for meal: {current_meal}",
            agent=self.agents.diet_analysis_agent(),
            expected_output="Nutritional breakdown of the meal",
            callback=lambda output: self.data_manager.append_data("diet_history", {
                "timestamp": datetime.now().isoformat(),
                "meal": current_meal,
                "analysis": output
            })
        )

    def recommend_meals(self):
        return Task(
            description="Generate a personalized meal plan",
            agent=self.agents.meal_recommendation_agent(),
            expected_output="A list of recommended meals",
            callback=lambda output: self.data_manager.append_data("meal_plans", {
                "timestamp": datetime.now().isoformat(),
                "meals": output
            })
        )

    def track_calories(self, intake: float, expenditure: float):
        return Task(
            description=f"Track calories: intake={intake}, expenditure={expenditure}",
            agent=self.agents.calorie_tracking_agent(),
            expected_output="Calorie tracking log entry",
            callback=lambda output: self.data_manager.append_data("calorie_log", {
                "timestamp": datetime.now().isoformat(),
                "intake": intake,
                "expenditure": expenditure,
                "net": intake - expenditure
            })
        )

    def monitor_progress(self, new_metrics: Dict):
        return Task(
            description=f"Monitor progress with new metrics: {new_metrics}",
            agent=self.agents.progress_monitoring_agent(),
            expected_output="Progress report",
            callback=lambda output: self.data_manager.append_data("progress", {
                "timestamp": datetime.now().isoformat(),
                "metrics": new_metrics,
                "report": output
            })
        )

    def adapt_recommendations(self, feedback: Dict):
        return Task(
            description=f"Adapt recommendations based on feedback: {feedback}",
            agent=self.agents.feedback_adaptation_agent(),
            expected_output="Adjusted meal plan",
            callback=lambda output: self.data_manager.append_data("meal_plans", {
                "timestamp": datetime.now().isoformat(),
                "meals": output,
                "based_on_feedback": feedback
            })
        )

    def sync_external_data(self, device_data: Dict):
        return Task(
            description=f"Sync external data: {device_data}",
            agent=self.agents.integration_agent(),
            expected_output="Synced data confirmation",
            callback=lambda output: self.data_manager.update_data("metrics", device_data.get("metrics", {})) or
                                   self.data_manager.append_data("calorie_log", {
                                       "timestamp": datetime.now().isoformat(),
                                       "intake": 0,
                                       "expenditure": device_data.get("calories_burned", 0),
                                       "net": -device_data.get("calories_burned", 0)
                                   })
        )

# Main Workflow
def run_wellzo_workflow(user_id: str, input_data: Dict):
    # Initialize agents and tasks
    agents = WellzoAgents(user_id)
    tasks = WellzoTasks(agents, agents.data_manager)

    # Define tasks
    task_list = [
        tasks.collect_user_input(input_data),
        tasks.update_user_profile(),
        tasks.analyze_diet({"calories": 600, "protein": 30}),  # Example meal
        tasks.recommend_meals(),
        tasks.track_calories(600, 200),  # Example calorie tracking
        tasks.monitor_progress({"weight_kg": 74}),
        tasks.adapt_recommendations({"satisfaction": 4}),
        tasks.sync_external_data({"calories_burned": 300})
    ]

    # Create and run the crew
    crew = Crew(
        agents=[
            agents.user_input_agent(),
            agents.user_profile_agent(),
            agents.diet_analysis_agent(),
            agents.meal_recommendation_agent(),
            agents.calorie_tracking_agent(),
            agents.progress_monitoring_agent(),
            agents.feedback_adaptation_agent(),
            agents.integration_agent()
        ],
        tasks=task_list,
        process=Process.sequential,  # Can be changed to parallel if needed
        verbose=True
    )

    result = crew.kickoff()
    return result

# Example Usage
if __name__ == "__main__":
    user_id = "user123"
    input_data = {
        "goals": {"target_weight": 70, "activity_level": 1.5},
        "preferences": {"diet_type": "balanced", "meals_per_day": 3},
        "metrics": {"weight_kg": 75, "height_cm": 175, "age": 30}
    }

    result = run_wellzo_workflow(user_id, input_data)
    print(result)