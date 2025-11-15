import { AddIcon } from "../../components/icons";
import { NavBar } from "../../components/shared";
import {
  Page,
  Footer,
  Header,
  Button,
  List,
  Text,
  Card,
} from "../../components/ui";
import { useDialogRef } from "../../components/ui/dialog";
import { usePlannerStore } from "../../hooks";
import { AddPlannerDialog } from "./components/add-planner-dialog";

export function PlannerView() {
  const { plans, addPlan } = usePlannerStore();
  const dialogRef = useDialogRef();

  const openPlanDialog = () => {
    dialogRef.showDialog();
  };

  return (
    <Page>
      <Header
        text="Planner"
        rightSide={
          <Button onClick={() => openPlanDialog()}>
            <AddIcon />
          </Button>
        }
      />

      <AddPlannerDialog dialogRef={dialogRef} onAddPlan={addPlan} />

      <List hasFade>
        {!plans.length && <Text>No available routines - go write one</Text>}
        {plans.map((plan) => (
          <Card
            key={plan.timestamp}
            title={plan.title}
            mainContent={<Text pre>{plan.description}</Text>}
          />
        ))}
      </List>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
