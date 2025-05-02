import os
from supabase import create_client, Client

# Load environment variables for security
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://ihziwxfxkszaxmxkhowr.supabase.co")
SUPABASE_ANON_KEY = os.getenv(
    "SUPABASE_ANON_KEY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imloeml3eGZ4a3N6YXhteGtob3dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzYyODEsImV4cCI6MjA1NjgxMjI4MX0.bpeKGcRE4oAZGI6kLwMDnz8rCQrZ0mYriKTKdkZU93k"
)

class SupabaseCRUD:
    def __init__(self):
        """Initialize Supabase client"""
        self.supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

    def create_record(self, table: str, data: dict):
        """Create a new record in any table"""
        try:
            response = self.supabase.table(table).insert(data).execute()
            return response.data
        except Exception as e:
            return {"error": str(e)}

    def read_records(self, table: str, filters: dict = None):
        """Read records from any table with optional filters"""
        try:
            query = self.supabase.table(table).select("*")
            if filters:
                for key, value in filters.items():
                    query = query.eq(key, value)
            response = query.execute()
            return response.data
        except Exception as e:
            return {"error": str(e)}

    def update_record(self, table: str, record_id: str, data: dict):
        """Update a record in any table"""
        try:
            response = self.supabase.table(table).update(data).eq("id", record_id).execute()
            return response.data
        except Exception as e:
            return {"error": str(e)}

    def delete_record(self, table: str, record_id: str):
        """Delete a record from any table"""
        try:
            response = self.supabase.table(table).delete().eq("id", record_id).execute()
            return response.data
        except Exception as e:
            return {"error": str(e)}

    def list_tables(self):
        """Fetch a list of all tables in the database"""
        try:
            response = self.supabase.rpc("pg_table_definitions", {}).execute()
            return response.data
        except Exception as e:
            return {"error": str(e)}

# Usage Example
if __name__ == "__main__":
    supabase_crud = SupabaseCRUD()

    # 📌 Create a User
    new_user = {
        "full_name": "John Doe",
        "age": 30,
        "date_of_birth": "1994-05-15",
        "gender": "Male",
        "nationality": "USA",
        "state": "California",
        "city": "Los Angeles",
        "preferred_language": "English"
    }

    user_id = "e93f35e7-3441-4632-916f-85cb009e9c7f"

        # Body Metrics Data
    # Body Metrics Data
    # Lifestyle D# Fitness Goal Data
    mental_health_data = {
    "user_id": user_id,  # Foreign key reference to `users` table
    "stress_levels": 7,  # Stress level on a scale of 1-10
    "mood_swings": "Sometimes",  # Mood swings frequency
    "anxiety_or_depression": True,  # Boolean value (True/False)
    "mental_health_practices": "Meditation, journaling, deep breathing"
}

# Insert Mental Health Data into Database
response = supabase_crud.create_record("mental_health", mental_health_data)

print("✅ Mental Health Data Added:", response)
    # print("✅ Create User:", supabase_crud.create_record("users_profile", new_user))

    # # 📌 Read All Users
    # print("📌 Read Users:", supabase_crud.read_records("users_profile"))

    # # 📌 Update a User
    # user_id = "12345"  # Replace with actual ID
    # updated_data = {"age": 31}
    # print("📌 Update User:", supabase_crud.update_record("users_profile", user_id, updated_data))

    # # 📌 Delete a User
    # print("❌ Delete User:", supabase_crud.delete_record("users_profile", user_id))

    # # 📌 List All Tables
    # print("📌 Database Tables:", supabase_crud.list_tables())
