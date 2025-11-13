import { memo, useEffect, useRef } from "react";
import type { IExercise, ISet } from "../../../models/gym";
import { Card } from "../../ui";
import { ExerciseBody } from "./exercise-body";
import { ExerciseHeaderOptions } from "./exercise-header-options";
import { ExerciseFooter } from "./exercise-footer";

interface Props {
  data: IExercise;
  hideSetForm?: boolean;
  isEditing?: boolean;
  defaultOpen?: boolean;
  onAddSet?(set: ISet): void;
  onEditExercise?(id: IExercise["id"], changes: Partial<IExercise>): void;
  onDeleteExercise?(id: IExercise["id"]): void;
  onEditSet?(id: IExercise["id"], setNo: number, changes: Partial<ISet>): void;
  onDeleteSet?(id: IExercise["id"], setNo: number): void;
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

    useEffect(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, []);

    const handleEditTitle = (
      e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    ) => {
      if (isEditing) {
        e.stopPropagation();
        const name = prompt("Enter a new name", data.name);
        if (!name) return;
        onEditExercise?.(data.id, { name });
      }
    };

    const handlePropertyEdit = (
      index: number, // todo: change to id?
      prop: keyof ISet,
    ) => {
      const value = prompt(`Update the ${prop}`, `${data.sets[index][prop]}`);
      if (!value) return;
      onEditSet?.(data.id, index, { [prop]: value });
    };

    const handleSetDelete = (setNo: number) => {
      onDeleteSet?.(data.id, setNo);
    };

    return (
      <Card
        isCollapsible
        title={data.name}
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
