import { memo } from "react";
import { Button, Text } from "../../../components/ui";
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
        <div className="flex flex-col gap-2">
          <Text>Title</Text>
          <input
            name="plan-title"
            className="h-10 rounded bg-gray-50 px-2 outline outline-gray-400 placeholder:text-gray-400 focus:outline-4 focus:outline-amber-400"
            type="text"
            placeholder="E.g. Leg day"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Text>Description</Text>
          <textarea
            name="plan-description"
            className="h-[calc(1lh*10)] rounded bg-gray-50 p-2 outline outline-gray-400 placeholder:text-gray-400 focus:outline-4 focus:outline-amber-400"
            placeholder={"For example:\nSquats\n3 sets of 6 x 100kg"}
          ></textarea>
        </div>
        <Button>Save</Button>
      </form>
    </Dialog>
  );
});
