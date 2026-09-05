"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

export function Controls() {
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (sectionRef.current) sectionRef.current.dataset.hydrated = "true";
  }, []);
  return (
    <section ref={sectionRef} data-hydrated="false">
      <Button onClick={() => setCount(count + 1)}>Count {count}</Button>
      <Input aria-label="Name" defaultValue="Nuee" />
      <Switch aria-label="Notifications" defaultChecked />
      <Tabs defaultValue="first">
        <TabsList>
          <TabsTrigger value="first">First</TabsTrigger>
          <TabsTrigger value="second">Second</TabsTrigger>
        </TabsList>
        <TabsContent value="first">First panel</TabsContent>
        <TabsContent value="second">Second panel</TabsContent>
      </Tabs>
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Details</DialogTitle>
        </DialogContent>
      </Dialog>
      <Calendar defaultMonth={new Date(2026, 8, 1)} today={new Date(2026, 8, 5)} />
    </section>
  );
}
