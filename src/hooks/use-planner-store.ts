import { useState } from "react";
import { PLANNER_STORE_KEY } from "../constants";
import type { IPlan } from "../models/planner";

const serialise = (data: IPlan[]) => {
  localStorage.setItem(PLANNER_STORE_KEY, JSON.stringify(data));
};

const deserialise = (): IPlan[] => {
  return JSON.parse(localStorage.getItem(PLANNER_STORE_KEY) ?? "[]") as IPlan[];
};

export function usePlannerStore() {
  const [plans, setPlans] = useState<IPlan[]>(deserialise());

  const addPlan = (newPlan: IPlan) => {
    const data = [...plans, newPlan];
    serialise(data);
    setPlans(data);
  };

  return { plans, addPlan };
}
