"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";

export default function FunctionCard(props: {
  id: number;
  function: string;
  deletefunc: Function;
}) {
  return (
    <Card className="flex">
      <CardHeader>
        <CardTitle>y = {props.function}</CardTitle>
        <CardDescription>Description COS</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Button
          onClick={() => {
            props.deletefunc();
          }}
          variant="destructive"
        >
          <X />
        </Button>
      </CardContent>
    </Card>
  );
}
