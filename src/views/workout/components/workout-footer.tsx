import { useNavigate } from "react-router";
import { Button, Footer } from "../../../components/ui";
import { useStorage } from "../../../hooks";
import { useWorkoutContext } from "../workout.context";

export function WorkoutFooter() {
  const navigate = useNavigate();
  const { addOrSaveWorkout } = useStorage();
  const { workout, clearSession, isEditing, addExercise, updateWorkout } =
    useWorkoutContext();

  const onAddExercise = () => {
    const name = prompt("Enter an exercise");
    if (!name) return;
    addExercise({ id: crypto.randomUUID(), name, sets: [] });
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
      {/* <div className="grid grid-cols-2 gap-[inherit]"> */}
      <Button text="Add exercise" onClick={() => onAddExercise()} />
      <Button text="Finish" onClick={() => onFinish()} />
      {/* </div> */}
    </Footer>
  );
}
