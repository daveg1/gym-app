import { Route, Routes as RRoutes } from "react-router";
import { DetailsView } from "./views/details/details.view";
import { WorkoutView } from "./views/workout/workout.view";
import { DashboardView } from "./views/dashboard/dashboard.view";
import { PlannerView } from "./views/planner/planner.view";

export function Routes() {
  return (
    <RRoutes>
      <Route index element={<DashboardView />} />
      <Route path="planner" element={<PlannerView />} />
      <Route path="workout" element={<WorkoutView />} />
      <Route path="details/:sessionId" element={<DetailsView />} />
    </RRoutes>
  );
}
