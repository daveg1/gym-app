import { useState } from "react";
import { NavBar } from "../../components/shared";
import { Page, Footer, Header, Button, List, Text } from "../../components/ui";
import type { IPlan } from "../../models/planner";
import { Dialog, useDialogRef } from "../../components/ui/dialog";

export function PlannerView() {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [dialogRef] = useDialogRef();

  const openPlanDialog = () => {
    dialogRef.current.open = true;
  };

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

    setPlans((v) => [...v, plan]);
    e.currentTarget.reset();
    dialogRef.current.open = false;
  };

  return (
    <Page>
      <Header
        text="Planner"
        rightSide={<Button text="Add plan" onClick={() => openPlanDialog()} />}
      />

      <Dialog title="Add plan" ref={dialogRef}>
        <form className="flex flex-col gap-2" onSubmit={handleSavePlan}>
          <Text size="s">Title</Text>
          <input
            name="plan-title"
            className="h-10 w-full rounded border px-2"
            type="text"
          />

          <Text size="s">Description</Text>
          <textarea
            name="plan-description"
            className="w-full resize-none border p-2"
          ></textarea>
          <Button>Save</Button>
        </form>
      </Dialog>

      <List>
        {plans.map((plan) => (
          <article className="flex flex-col gap-2 rounded-lg bg-gray-100 p-4">
            <h2 className="text-xl">{plan.title}</h2>
            <Text pre>{plan.description}</Text>
          </article>
        ))}
      </List>

      <Footer>
        <NavBar />
      </Footer>
    </Page>
  );
}
