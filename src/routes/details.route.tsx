import { NavLink, useLocation, useNavigate } from "react-router";
import { useStorage } from "../hooks/use-storage";
import { useEffect } from "react";
import { Exercise } from "../components/exercise";

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
    <section>
      <header className="flex items-center gap-2 p-6">
        <NavLink to="/" end>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
              clipRule="evenodd"
            />
          </svg>
        </NavLink>

        <h2 className="text-3xl font-semibold">Details</h2>
      </header>
      <main className="h-full overflow-y-auto">
        {session.length ? (
          session.map((ex) => <Exercise key={ex.name} data={ex} readonly />)
        ) : (
          <p className="px-6 text-lg">This workout is empty</p>
        )}
      </main>
    </section>
  );
}
