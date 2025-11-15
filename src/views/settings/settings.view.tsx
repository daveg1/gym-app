import { NavBar } from "../../components/shared";
import { Footer, Header, Page } from "../../components/ui";

export function SettingsView() {
  return (
    <Page>
      <Header text="Settings" />

      <div className="h-full"></div>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
