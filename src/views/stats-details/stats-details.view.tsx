import { useLocation } from "react-router";
import { NavBar } from "../../components/shared";
import { Page, Header, Footer } from "../../components/ui";
import { useMemo } from "react";

export function StatsDetailsView() {
  const location = useLocation();
  const exerciseName = useMemo(
    () => decodeURI(location.pathname.split("/stats/")[1]),
    [location.pathname],
  );

  return (
    <Page>
      <Header text="Stats" />

      <div className="h-full px-6">Show details for {exerciseName}</div>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
