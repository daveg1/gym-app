import { NavBar } from "../../components/shared";
import { Page, Footer, Header, Button, List, Text } from "../../components/ui";
import type { IPlan } from "../../models/planner";
import { Dialog, useDialogRef } from "../../components/ui/dialog";
import { usePlannerStore } from "../../hooks";

export function PlannerView() {
  const { plans, addPlan } = usePlannerStore();
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

    addPlan(plan);
    dialogRef.hideDialog();
  };

  return (
    <Page>
      <Header
        text="Planner"
        rightSide={
          <Button onClick={() => openPlanDialog()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </Button>
        }
      />

      {dialogRef.isOpen && (
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
      )}

      <List hasFade>
        {plans.map((plan) => (
          <article
            key={plan.timestamp}
            className="flex flex-col gap-2 rounded-lg bg-gray-100 p-4"
          >
            <h2 className="text-xl">{plan.title}</h2>
            <Text pre>{plan.description}</Text>
          </article>
        ))}
      </List>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
