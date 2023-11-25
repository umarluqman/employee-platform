"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  Form,
} from "@/components/ui/form";
import { useStore } from "@/store";
import Link from "next/link";

const formSchema = z.object({
  name: z.string(),
  salary: z.number(),
  age: z.number(),
  image: z.string().optional(),
});

export default function EmployeeDetails() {
  const selectedEmployee = useStore((state) => state.selectedEmployee);
  console.log({ selectedEmployee });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: selectedEmployee?.employee_name ?? "",
      salary: selectedEmployee?.employee_salary ?? 0,
      age: selectedEmployee?.employee_age ?? 0,
      image: selectedEmployee?.profile_image ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  let navList = [
    {
      id: "employeeList",
      href: "/",
      isCurrentPage: false,
      title: "Employee List",
    },
    {
      id: "employeeDetails",
      href: "/",
      isCurrentPage: true,
      title: "Employee Details",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
          <CardDescription>Change the employee details here.</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="max-w-sm">
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input {...field} type="file" className="h-[32px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="max-w-sm">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="max-w-[80px]">
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input min="0" step="1" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem className="max-w-xs">
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input
                        min="0"
                        step="1"
                        type="number"
                        {...field}
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.value = Math.max(0, parseInt(target.value))
                            .toString()
                            .replace(/\D/g, "");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="space-x-2">
              <Link href="/">
                <Button variant={"secondary"}>Cancel</Button>
              </Link>
              <Button type="submit">Save</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
