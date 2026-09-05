import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controls } from "./controls";

export function Example() {
  return (
    <main>
      <Card data-testid="server-card">Server card</Card>
      <Button>Server boundary button</Button>
      <Tabs defaultValue="server">
        <TabsList>
          <TabsTrigger value="server">Server tab</TabsTrigger>
        </TabsList>
        <TabsContent value="server">Server panel</TabsContent>
      </Tabs>
      <Controls />
    </main>
  );
}
