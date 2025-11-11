import { useNavigate } from "react-router";
import { Button, Footer } from "../../../components/ui";
import { useStorage } from "../../../hooks";
import { useWorkoutContext } from "../workout.context";

export function WorkoutFooter() {
  const navigate = useNavigate();
  const { saveWorkout } = useStorage();
  const { sessionId, title, date, exercises, isEditing, ...crud } =
    useWorkoutContext();

  const onAddExercise = () => {
    const name = prompt("Enter an exercise");
    if (!name) return;
    crud.addExercise({ id: crypto.randomUUID(), name, sets: [] });
  };

  const onCancel = () => {
    if (
      exercises.length &&
      !confirm("Cancel workout? Your session will be discarded")
    ) {
      return;
    }

    navigate("/");
  };

  const onFinish = () => {
    if (isEditing) {
      return alert("Notice: Please finish editing first");
    }

    if (!exercises.length) {
      return alert("Notice: you haven't added any exercises");
    }

    if (exercises.some((ex) => !ex.sets.length)) {
      return alert(
        "Notice: some of your exercises are empty - please add sets or remove them",
      );
    }

    if (confirm("Finish workout? This session will be saved")) {
      saveWorkout({
        id: sessionId,
        exercises,
        timestamp: +date,
        name: title,
      });
      navigate("/");
    }
  };

  return (
    <Footer>
      <Button text="Add exercise" onClick={() => onAddExercise()} />

      <div className="grid grid-cols-2 gap-[inherit]">
        <Button mode="danger" text="Cancel" onClick={() => onCancel()} />
        <Button mode="primary" text="Finish" onClick={() => onFinish()} />
      </div>
    </Footer>
  );
}
