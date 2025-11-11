import { useNavigate } from "react-router";
import { Button, Footer } from "../../../components/ui";
import { useStorage } from "../../../hooks";
import { useWorkoutContext } from "../workout.context";

export function WorkoutFooter() {
  const navigate = useNavigate();
  const { addOrSaveWorkout } = useStorage();
  const { workout, clearSession, isEditing, ...crud } = useWorkoutContext();

  const onAddExercise = () => {
    const name = prompt("Enter an exercise");
    if (!name) return;
    crud.addExercise({ id: crypto.randomUUID(), name, sets: [] });
  };

  const handlePause = () => {
    crud.updateWorkout(workout);
    navigate("/");
  };

  const onFinish = () => {
    if (isEditing) {
      return alert("Notice: Please finish editing first");
    }

    if (!workout.exercises.length) {
      return alert("Notice: you haven't added any exercises");
    }

    if (workout.exercises.some((ex) => !ex.sets.length)) {
      return alert(
        "Notice: some of your exercises are empty - please add sets or remove them",
      );
    }

    if (confirm("Finish workout? This session will be saved")) {
      clearSession();
      addOrSaveWorkout(workout);
      navigate("/");
    }
  };

  return (
    <Footer>
      <Button text="Add exercise" onClick={() => onAddExercise()} />

      <div className="grid grid-cols-2 gap-[inherit]">
        <Button text="Pause" onClick={() => handlePause()} />
        <Button text="Finish" onClick={() => onFinish()} />
      </div>
    </Footer>
  );
}
