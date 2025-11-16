import { memo, useEffect, useRef } from "react";
import type { IExercise, ISet, IWorkoutExercise } from "../../../models";
import { Card } from "../../ui";
import { ExerciseBody } from "./exercise-body";
import { ExerciseHeaderOptions } from "./exercise-header-options";
import { ExerciseFooter } from "./exercise-footer";
import { useExerciseStore } from "../../../hooks";

interface Props {
  data: IWorkoutExercise;
  hideSetForm?: boolean;
  isEditing?: boolean;
  defaultOpen?: boolean;
  onAddSet?(set: ISet): void;
  onEditExercise?(exerciseId: string, changes: Partial<IExercise>): void;
  onDeleteExercise?(exerciseId: string): void;
  onEditSet?(exerciseId: string, setNo: number, changes: Partial<ISet>): void;
  onDeleteSet?(exerciseId: string, setNo: number): void;
}

export const Exercise = memo(
  ({
    data,
    hideSetForm,
    isEditing,
    defaultOpen,
    onAddSet,
    onEditExercise,
    onDeleteExercise,
    onEditSet,
    onDeleteSet,
  }: Readonly<Props>) => {
    const ref = useRef<HTMLElement>(null);
    const { exerciseMap } = useExerciseStore();
    const exercise = exerciseMap[data.id];

    useEffect(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, []);

    // TODO: handle changes via exerciseMap
    const handleEditTitle = (
      e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    ) => {
      if (isEditing) {
        e.stopPropagation();
        const name = prompt("Enter a new name", exercise.name)?.trim();
        if (!name) return;
        onEditExercise?.(data.id, { name });
      }
    };

    const handlePropertyEdit = (
      index: number, // todo: change to id?
      prop: keyof ISet,
    ) => {
      if (!isEditing) return;
      const value = prompt(
        `Update the ${prop}`,
        `${data.sets[index][prop]}`,
      )?.trim();
      if (!value) return;
      onEditSet?.(data.id, index, { [prop]: value });
    };

    const handleSetDelete = (setNo: number) => {
      onDeleteSet?.(data.id, setNo);
    };

    return (
      <Card
        isCollapsible
        title={exercise.name}
        defaultOpen={defaultOpen}
        isEditing={isEditing}
        onTitleClick={handleEditTitle}
        titleContent={
          <ExerciseHeaderOptions
            isEditing={isEditing}
            onDeleteExercise={() => onDeleteExercise?.(data.id)}
          />
        }
        mainContent={
          <ExerciseBody
            data={data}
            isEditing={isEditing}
            hideSetForm={hideSetForm}
            onPropertyClick={handlePropertyEdit}
            onSetDelete={handleSetDelete}
          />
        }
        footerContent={
          !isEditing &&
          !hideSetForm && <ExerciseFooter data={data} onAddSet={onAddSet} />
        }
      />
    );
  },
);
