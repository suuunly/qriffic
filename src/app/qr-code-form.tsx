"use client"

import {type FC} from "react";
import {useForm} from "react-hook-form";
import {type QrCodeData, qrCodeSchema, QrStyle} from "~/contracts/qr-code.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {Button} from "~/components/ui/button";
import {extractValue} from "~/lib/events/extract-value";
import {stringToNum} from "~/lib/converters/string-to-num";

export type QrCodeFormProps = {
  defaultValues: QrCodeData,
  onChanged: (data: QrCodeData) => void
};

export const QrCodeForm: FC<QrCodeFormProps> = (props) => {

  const form = useForm<QrCodeData>({
    resolver: zodResolver(qrCodeSchema),
    defaultValues: props.defaultValues,
  })

  function onSubmit(values: QrCodeData) {
    props.onChanged(values);
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
      <FormField
        control={form.control}
        name={"value"}
        render={({field}) => (
          <FormItem>
            <Input
              {...field}
              placeholder={"URL"}/>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"eyeRadius"}
        render={({field}) => (
          <FormItem>
            <Input
              {...field}
              placeholder={"Radius of the eyes (such as 10)"}
              onChange={extractValue((value) => field.onChange(stringToNum(value)))}
            />
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="style"
        render={({field}) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a QR code style"/>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={QrStyle.Dots}>Dots</SelectItem>
                <SelectItem value={QrStyle.Squares}>Squares</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage/>
          </FormItem>
        )}
      />
      <Button type={"submit"}>Generate</Button>
    </form>
  </Form>
}