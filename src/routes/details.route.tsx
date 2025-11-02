import { NavLink, useLocation, useNavigate } from "react-router";
import { useStorage } from "../hooks/use-storage";
import { useEffect } from "react";
import { Exercise } from "../components/exercise";
import { Header } from "../components/header";

export function DetailsRoute() {
  const { getSessionById } = useStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = location.pathname.split("/details/")[1];
  const session = getSessionById(sessionId);

  console.log(session);

  // ! FIXME: redirect not working
  useEffect(() => {
    if (!session) navigate("/");
  }, [session]);

  return (
    <section className="flex h-full flex-col gap-4 py-6">
      <Header text="Details" />

      <main className="h-full overflow-y-auto">
        {session.length ? (
          session.map((ex) => <Exercise key={ex.name} data={ex} readonly />)
        ) : (
          <p className="px-6 text-lg">This workout is empty</p>
        )}
      </main>

      <footer className="flex flex-col px-6">
        <NavLink
          to="/"
          className="rounded-lg bg-gray-200/50 p-4 text-center text-lg font-semibold text-cyan-600"
        >
          Close
        </NavLink>
      </footer>
    </section>
  );
}
