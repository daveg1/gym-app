import { NavLink } from "react-router";
import type { IWorkout } from "../../models/gym";
import { formatDate } from "../../utils";
import { memo, useRef } from "react";
import { Button } from "../ui";

interface Props {
  workout: IWorkout;
  onDelete: (workoutId: string) => void;
}

interface TouchData {
  x: number;
  diff: number;
  anim: Animation | null;
}

export const WorkoutItem = memo(({ workout, onDelete }: Readonly<Props>) => {
  const touchData = useRef<TouchData>({} as TouchData);
  const touchTargetRef = useRef(null);
  const DRAG_MAX = 72;
  touchData.current.diff = 0;

  function handleDragStart(ev: React.TouchEvent<HTMLElement>) {
    touchData.current.x = ev.touches[0].clientX;
    if (touchData.current.anim) {
      touchData.current.anim.cancel();
    }
  }

  function handleDrag(ev: React.TouchEvent<HTMLElement>) {
    const x1 = touchData.current.x;
    const x2 = ev.touches[0].clientX;
    const diff = x2 - x1;

    const target = touchTargetRef.current as unknown as HTMLElement;
    target.style.transform = `translateX(${diff + touchData.current.diff}px)`;
  }

  function handleDragEnd() {
    const target = touchTargetRef.current as unknown as HTMLElement;
    const { right: elemRight } = target.getBoundingClientRect();
    const padding = 24;

    const right = window.innerWidth - elemRight - padding;
    const x = right < DRAG_MAX / 2 ? 0 : -DRAG_MAX;

    touchData.current.anim = target.animate(
      { transform: `translateX(${x}px)` },
      { fill: "forwards", duration: 150, easing: "ease-out" },
    );
    touchData.current.diff = x;
  }

  return (
    <div className="relative flex shrink-0 items-center overflow-hidden rounded-lg">
      <NavLink
        className="z-10 block w-full touch-auto rounded-lg bg-gray-100 p-4 text-lg"
        to={"/details/" + workout.id}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
        ref={touchTargetRef}
      >
        <h2 className="text-xl font-semibold">
          {formatDate(workout.timestamp)}
        </h2>
        <p>
          {workout.exercises.length} exercise
          {workout.exercises.length === 1 ? "" : "s"}
        </p>
      </NavLink>

      <Button
        className="absolute right-0 justify-self-end"
        icon
        mode="danger"
        onClick={() => onDelete(workout.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </Button>
    </div>
  );
});
