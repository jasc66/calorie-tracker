import React, { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { exerciseCategories, foodCategories } from "../data/categories";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
  details: ""
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.find(
        (stateActivity) => stateActivity.id === state.activeId
      );
      if (selectedActivity) {
        setActivity(selectedActivity);
      }
    }
  }, [state.activeId, state.activities]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Seleccionar:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg"
          value={activity.category}
          onChange={handleChange}
        >
          <option value={1}>Comida</option>
          <option value={2}>Ejercicio</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          {activity.category === 1 ? "Comida" : "Ejercicio"}:
        </label>
        <select
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          value={activity.name}
          onChange={handleChange}
        >
          {activity.category === 1
            ? foodCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))
            : exerciseCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="details" className="font-bold">Detalles:</label>
          <textarea
            id="details"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Detalles de la actividad"
            value={activity.details}
            onChange={handleChange}
          />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
