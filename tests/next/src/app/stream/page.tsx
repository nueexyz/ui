import { Suspense } from "react";
import { setTimeout } from "node:timers/promises";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";
async function Delayed() {
  await setTimeout(600);
  return (
    <Card>
      Stream complete<Button>Stream button</Button>
    </Card>
  );
}
export default function Page() {
  return (
    <Suspense fallback={<p>Stream pending</p>}>
      <Delayed />
    </Suspense>
  );
}
