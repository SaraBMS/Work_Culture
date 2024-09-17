import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/DashboardAPI";
import { useEmail } from './EmailProvider';
import useAxiosFetch from "./useAxiosFetch";
import { useStateContext } from "./ContextProvider";

const GoalContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [goals, setGoals] = useState([]);
    const [goalDescrip, setGoalDescrip] = useState('');
    const [selectedGoal, setSelectedGoal] = useState(null);
    const { email } = useEmail();
    const { data } = useAxiosFetch('http://localhost:3400/DashboardAPI');
    const { percentage, updatePercentage } = useStateContext();

    const calculatePercentage = (goals) => {
        const totalGoals = goals.length;
        const completedGoals = goals.filter(goal => goal.completed).length;
        return totalGoals ? Math.round((completedGoals / totalGoals) * 100) : 0;
    };

    const updatePercentageInDatabase = async (percentage) => {
        // Simulate updating the percentage in the backend
        console.log(`Updating percentage in database to ${percentage}`);
        // Actual API call to update the percentage
        // await api.put('/DashboardAPI/percentage', { percentage });
    };

    const handleSaveGoal = async (selectedValue) => {
        if (selectedGoal) {
            await handleEditGoal(selectedGoal.id, goalDescrip, selectedGoal.completed, selectedValue, percentage);
        } else {
            const newId = (goals.length ? Math.max(...goals.map(g => parseInt(g.id, 10))) + 1 : 1).toString();
            const newGoal = { id: newId, email, completed: false, description: goalDescrip, type: selectedValue, percentage };

            try {
                const response = await api.post('/DashboardAPI', newGoal);
                const addedGoal = response.data;
                const updatedGoals = [...goals, addedGoal];
                const newPercentage = calculatePercentage(updatedGoals);

                // Update the new goal with the calculated percentage
                const updatedGoalWithPercentage = { ...addedGoal, percentage: newPercentage };
                const updatedGoalsWithPercentage = updatedGoals.map(goal =>
                    goal.id === newId ? updatedGoalWithPercentage : goal
                );

                setGoals(updatedGoalsWithPercentage);
                setGoalDescrip('');

                updatePercentage(newPercentage);
                await updatePercentageInDatabase(newPercentage);
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
    };

    const toggleGoalCompletion = async (goalId) => {
        const id = goalId.toString();
        const goal = goals.find(goal => goal.id === id);
        if (goal) {
            const updatedGoal = { ...goal, completed: !goal.completed, percentage };
            try {
                const response = await api.put(`/DashboardAPI/${id}`, updatedGoal);
                const updatedGoals = goals.map(g =>
                    g.id === id ? response.data : g
                );
                const newPercentage = calculatePercentage(updatedGoals);

                // Update the goal with the new percentage
                const updatedGoalsWithPercentage = updatedGoals.map(goal =>
                    goal.id === id ? { ...goal, percentage: newPercentage } : goal
                );

                setGoals(updatedGoalsWithPercentage);
                updatePercentage(newPercentage);
                await updatePercentageInDatabase(newPercentage);
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
    };

    const handleEditGoal = async (goalId, newDescription, newCompleted, selectedValue) => {
        try {
            const id = goalId.toString();
            const updatedGoalData = { type: selectedValue, description: newDescription, completed: newCompleted, email, percentage };
            const response = await api.put(`/DashboardAPI/${id}`, updatedGoalData);
            const updatedGoals = goals.map(goal =>
                goal.id === id ? response.data : goal
            );
            const newPercentage = calculatePercentage(updatedGoals);

            // Update the goal with the new percentage
            const updatedGoalsWithPercentage = updatedGoals.map(goal =>
                goal.id === id ? { ...goal, percentage: newPercentage } : goal
            );

            setGoals(updatedGoalsWithPercentage);
            setGoalDescrip('');
            setSelectedGoal(null);
            updatePercentage(newPercentage);
            await updatePercentageInDatabase(newPercentage);
        } catch (error) {
            console.log(`Error editing goal: ${error.message}`);
        }
    };

    const openGoal = (goalId) => {
        if (goalId == null) {
            setSelectedGoal(null);
            setGoalDescrip('');
        } else {
            const id = goalId.toString();
            const goal = goals.find(goal => goal.id === id);
            setSelectedGoal(goal);
            setGoalDescrip(goal ? goal.description : '');
        }
    };

    useEffect(() => {
        const normalizedData = data.map(goal => ({
            ...goal,
            id: goal.id.toString(),
            percentage: calculatePercentage(data) // Ensure percentage is calculated on initial load
        }));
        setGoals(normalizedData);
        const newPercentage = calculatePercentage(normalizedData);
        updatePercentage(newPercentage);
    }, [data]);

    return (
        <GoalContext.Provider value={{
            goals, goalDescrip, setGoalDescrip, handleSaveGoal,
            toggleGoalCompletion, selectedGoal, openGoal, handleEditGoal, percentage
        }}>
            {children}
        </GoalContext.Provider>
    );
};

export const useGoals = () => useContext(GoalContext);
