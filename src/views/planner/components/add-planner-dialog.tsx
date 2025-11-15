import { memo } from "react";
import { Button, LongTextBox, TextBox } from "../../../components/ui";
import { Dialog, type DialogRef } from "../../../components/ui/dialog";
import type { IPlan } from "../../../models/planner";

interface Props {
  dialogRef: DialogRef;
  onAddPlan(plan: IPlan): void;
}

export const AddPlannerDialog = memo(({ dialogRef, onAddPlan }: Props) => {
  const handleSavePlan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // Check empty values
    for (const entry of data.entries()) {
      if (!entry[1]) return;
    }

    const plan: IPlan = {
      title: `${data.get("plan-title")}`,
      description: `${data.get("plan-description")}`,
      timestamp: Date.now(),
    };

    onAddPlan(plan);
    dialogRef.hideDialog();
  };

  return (
    <Dialog ref={dialogRef} title="Add plan">
      <form className="flex flex-col gap-4" onSubmit={handleSavePlan}>
        <TextBox label="Title" name="plan-title" placeholder="E.g. Leg day" />

        <LongTextBox
          label="Description"
          name="plan-description"
          placeholder={"For example:\nSquats\n3 sets of 6 x 100kg"}
        />

        <Button>Save</Button>
      </form>
    </Dialog>
  );
});
