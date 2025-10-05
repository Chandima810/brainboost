import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserForm from "./UserForm";
import UserList from "./UserList";

const steps = [
  { word: "Misfit", description: "Identify the burden, gap, or friction.", brain: "Anterior Cingulate Cortex (ACC) + Prefrontal Cortex (PFC)" },
  { word: "Recall", description: "Retrieve past experiences and knowledge.", brain: "Hippocampus + Temporal Lobes" },
  { word: "Flow", description: "Open mental space for free associations.", brain: "Default Mode Network (DMN)" },
  { word: "Wide Path", description: "Expand connections and explore possibilities.", brain: "DMN + Temporal Lobes" },
  { word: "Spark", description: "New idea emerges through novel association.", brain: "Temporal Lobes + Hippocampus" },
  { word: "Strategic Flow", description: "Shape and prototype ideas with forward momentum.", brain: "Parietal Lobes" },
  { word: "Narrow Path", description: "Evaluate and focus ideas toward practical outcomes.", brain: "Executive Control Network (ECN) + PFC" },
  { word: "Bright Spark", description: "Refined, strong, innovative idea.", brain: "PFC + Temporal Cross-links" },
  { word: "Ahh!", description: "Insight, dopamine reward, and emotional reinforcement.", brain: "Dopamine System (VTA + Nucleus Accumbens)" }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [users, setUsers] = useState([]);

  const nextStep = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add new user
  const addUser = async (user) => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 flex flex-col items-center space-y-6 font-sans text-gray-900">
      {/* Splash Screen */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center mb-6"
      >
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-4 text-3xl">
          🧠
        </div>
        <h1 className="text-3xl font-bold text-indigo-800">BrainBoost</h1>
        <p className="text-gray-600 mt-2 text-sm text-center">Boost your creativity through brain-inspired flow</p>
      </motion.div>

      {/* Welcome Card */}
      <div className="max-w-lg w-full bg-white rounded-xl shadow-xl p-6 text-center space-y-4">
        <h2 className="text-xl font-bold">Welcome to BrainBoost</h2>
        <p className="text-gray-600">Train your creativity and discipline by aligning with your brain’s natural pathways.</p>
        <button className="w-full rounded-lg bg-indigo-600 text-white py-2 px-4 font-medium hover:bg-indigo-500 transition">Start New Journey</button>
      </div>

      {/* Interactive Pathway Cycle */}
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-center">Current Cycle</h3>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-xl shadow text-center bg-indigo-50"
        >
          <h4 className="text-indigo-700 font-bold text-lg">{steps[currentStep].word}</h4>
          <p className="text-gray-700 mt-2 text-sm">{steps[currentStep].description}</p>
          <p className="text-gray-500 mt-1 italic text-xs">{steps[currentStep].brain}</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-500 h-2"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-gray-500 text-sm">Step {currentStep + 1} of {steps.length}</p>

        {/* Navigation Buttons */}
        <div className="flex justify-between space-x-2">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex-1 rounded-lg border border-gray-300 py-2 font-medium hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex-1 rounded-lg bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-500 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Discipline Training */}
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 text-center space-y-4">
        <h3 className="text-lg font-semibold">Discipline Training</h3>
        <p className="text-gray-600">Select the discipline you want to focus your creativity on.</p>
        <div className="grid grid-cols-2 gap-3">
          {["Art", "Engineering", "Medicine", "Business"].map((discipline) => (
            <button
              key={discipline}
              className="rounded-lg border border-gray-300 py-2 font-medium hover:bg-gray-100"
            >
              {discipline}
            </button>
          ))}
        </div>
      </div>

      {/* User Form */}
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 text-center space-y-4">
        <h3 className="text-lg font-semibold">Add New User</h3>
        <UserForm onAddUser={addUser} />
      </div>

      {/* User List */}
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 text-center space-y-4">
        <h3 className="text-lg font-semibold">User List</h3>
        <UserList users={users} />
      </div>
    </div>
  );
}
