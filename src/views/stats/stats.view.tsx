import { Page, Footer, Header } from "../../components/ui";
import { NavBar } from "../../components/shared";

export function StatsView() {
  return (
    <Page>
      <Header text="Stats" />

      <div className="h-full px-6">TODO your stats</div>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
