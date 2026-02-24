// packages/ui/src/blocks/TriageForm.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"

const triageSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  urgency: z.enum(["low", "medium", "high"]),
  notes: z.string().optional(),
})

export function TriageForm({ title, description }: { title: string, description: string }) {
  const form = useForm<z.infer<typeof triageSchema>>({
    resolver: zodResolver(triageSchema),
    defaultValues: { fullName: "", urgency: "low" },
  })

  return (
    <div className="max-w-md mx-auto p-6 border rounded-xl shadow-sm bg-card">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(v => console.log(v))} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Name</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgency Level</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" /> <label htmlFor="low">Low</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" /> <label htmlFor="high">Urgent</label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">Submit Triage</Button>
        </form>
      </Form>
    </div>
  )
}