"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function FunctionCard(props: {
  id: number;
  function: string;
  deletefunc: Function;
  editfunc: Function;
}) {
  return (
    <Card className="flex">
      <CardHeader>
        <CardTitle className="flex gap-x-1">
          y =
          <input
            contentEditable
            id={props.id as any}
            className="border-0 text-2xl w-24"
            defaultValue={`${props.function}`}
            onKeyUp={(key) => {
              key.preventDefault();
              if (
                key.key === "Enter" &&
                document.getElementById(`${props.id}`)
              ) {
                const input: HTMLInputElement = document.getElementById(
                  `${props.id}`
                ) as any;

                props.editfunc(input.value);
              }
            }}
          />
        </CardTitle>
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
