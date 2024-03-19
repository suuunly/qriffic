import {type FC, type PropsWithChildren} from "react";
import {Card, CardContent, CardTitle} from "~/components/ui/card";


export type FormGroupProps = {
  label: string;
}

export const FormGroup: FC<PropsWithChildren<FormGroupProps>> = (props) => {
  return (
    <Card>
      <CardTitle className={"ml-3 mt-4 mb-2"}>{props.label}</CardTitle>
      <CardContent className={"space-y-2"}>
        {props.children}
      </CardContent>
    </Card>
  )

}