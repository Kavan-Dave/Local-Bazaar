import { Spinner as FlowbiteSpinner } from "flowbite-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[100px]">
      <FlowbiteSpinner size="lg" aria-label="Loading" color="blue" />
    </div>
  );
}
