import { NavBar } from "../../components/shared";
import { Page, Footer, Header } from "../../components/ui";

export function PlannerView() {
  return (
    <Page>
      <Header text="Planner" />

      <div className="h-full"></div>

      <Footer>
        <NavBar />
      </Footer>
    </Page>
  );
}
