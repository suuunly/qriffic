"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { GradientPicker } from "~/components/molecules/colour-picker";
import { FileUpload } from "~/components/molecules/file-upload";
import { FormGroup } from "~/components/molecules/form-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import {
  QrStyle,
  qrCodeSchema,
  type QrCodeData,
} from "~/contracts/qr-code.schema";
import { stringToNum } from "~/lib/converters/string-to-num";
import { extractValue } from "~/lib/events/extract-value";

export type QrCodeFormProps = {
  defaultValues: QrCodeData;
  onChanged: (data: QrCodeData) => void;
};

export const QrCodeForm: FC<QrCodeFormProps> = (props) => {
  const form = useForm<QrCodeData>({
    resolver: zodResolver(qrCodeSchema),
    defaultValues: props.defaultValues,
  });

  function onSubmit(values: QrCodeData) {
    props.onChanged(values);
  }

  form.watch((values) => {
    onSubmit(values as QrCodeData);
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
        <FormField
          control={form.control}
          name={"value"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <Input {...field} placeholder={"URL"} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormGroup label={"Image"}>
          <FormField
            control={form.control}
            name={"size"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Input
                  {...field}
                  type={"number"}
                  onChange={extractValue((value) =>
                    field.onChange(stringToNum(value)),
                  )}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>
        <FormGroup label={"Line"}>
          <>
            <FormField
              control={form.control}
              name={"eyeRadius"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eye Radius</FormLabel>
                  <Slider
                    defaultValue={[field.value]}
                    min={0}
                    max={(form.getValues().size / 100) * 23}
                    step={1}
                    onValueChange={(value) => field.onChange(value[0])}
                    value={[field.value]}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qrStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Style</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a QR code style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={QrStyle.Dots}>Dots</SelectItem>
                      <SelectItem value={QrStyle.Squares}>Squares</SelectItem>
                      <SelectItem value={QrStyle.Fluid}>Fluid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        </FormGroup>
        <FormGroup label={"Colour"}>
          <FormField
            control={form.control}
            name={"bgColor"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background</FormLabel>
                <GradientPicker
                  background={field.value}
                  setBackground={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"fgColor"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colour</FormLabel>
                <GradientPicker
                  background={field.value}
                  setBackground={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"eyeColor"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eye Colour</FormLabel>
                <GradientPicker
                  background={field.value}
                  setBackground={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>
        <FormGroup label={"Logo"}>
          <FormField
            control={form.control}
            name={"logoImage"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FileUpload value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"logoHeight"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <Input
                  {...field}
                  type={"number"}
                  onChange={extractValue((value) =>
                    field.onChange(stringToNum(value)),
                  )}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"logoWidth"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width</FormLabel>
                <Input
                  {...field}
                  type={"number"}
                  onChange={extractValue((value) =>
                    field.onChange(stringToNum(value)),
                  )}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"logoOpacity"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opacity</FormLabel>
                <Slider
                  defaultValue={[field.value]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={(value) => field.onChange(value[0])}
                  value={[field.value]}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>
      </form>
    </Form>
  );
};
