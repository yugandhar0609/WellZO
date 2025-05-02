from crewai import Agent, Task, Crew, Process
from typing import Dict, List, Optional
import json
from datetime import datetime


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
