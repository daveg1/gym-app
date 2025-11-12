import { useState } from "react";
import { NavBar } from "../../components/shared";
import { Page, Footer, Header, Button, List, Text } from "../../components/ui";
import type { IPlan } from "../../models/planner";
import { Dialog, useDialogRef } from "../../components/ui/dialog";

export function PlannerView() {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const dialogRef = useDialogRef();

  const openPlanDialog = () => {
    dialogRef.showDialog();
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
    dialogRef.hideDialog();
  };

  return (
    <Page>
      <Header
        text="Planner"
        rightSide={<Button text="Add plan" onClick={() => openPlanDialog()} />}
      />

      {dialogRef.isOpen && (
        <Dialog ref={dialogRef} title="Add plan">
          <form className="flex flex-col gap-4" onSubmit={handleSavePlan}>
            <div className="flex flex-col gap-2">
              <Text size="s">Title</Text>
              <input
                name="plan-title"
                className="h-10 rounded bg-gray-50 px-2 outline outline-gray-600 focus:outline-4 focus:outline-amber-400"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Text size="s">Description</Text>
              <textarea
                name="plan-description"
                className="h-[calc(1lh*10)] rounded bg-gray-50 p-2 outline outline-gray-600 focus:outline-4 focus:outline-amber-400"
              ></textarea>
            </div>
            <Button>Save</Button>
          </form>
        </Dialog>
      )}

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
