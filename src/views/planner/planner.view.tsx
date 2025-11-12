import { useState } from "react";
import { NavBar } from "../../components/shared";
import { Page, Footer, Header, Button, List, Text } from "../../components/ui";
import type { IPlan } from "../../models/planner";

export function PlannerView() {
  const [plans, setPlans] = useState<IPlan[]>([]);

  const addPlan = () => {
    const text = prompt("Write your plan");
    if (!text) return;

    const newPlan: IPlan = {
      text,
      timestamp: Date.now(),
    };
    setPlans((current) => [...current, newPlan]);
  };

  return (
    <Page>
      <Header
        text="Planner"
        rightSide={<Button text="Add plan" onClick={() => addPlan()} />}
      />

      <List>
        {plans.map((plan) => (
          <Text>{plan.text}</Text>
        ))}
      </List>

      <Footer>
        <NavBar />
      </Footer>
    </Page>
  );
}
