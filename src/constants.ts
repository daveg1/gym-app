function key(name: string): string {
  return `daveg1-gym-${name}`;
}

export const WORKOUT_STORE_KEY = key("workouts");
export const TEMP_SESSION_KEY = key("temp-session");
export const PLANNER_STORE_KEY = key("planner");
export const EXERCISE_STORE_KEY = key("exercises");
export const STATS_STORE_KEY = key("stats");
export const HOME_STORE_KEY = key("home");

// TODO: make type export of these keys and use them in create session hook
