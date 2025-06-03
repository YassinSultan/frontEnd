import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "select"
    | "textarea"
    | "checkbox"
    | "date"
    | "file";
  options?: Option[];
  dependsOn?: {
    field: string;
    value: string;
  };
};

type GenericFormProps = {
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
};

export const GenericForm = ({ fields, onSubmit }: GenericFormProps) => {
  const { control, handleSubmit, watch } = useForm();
  const watchedFields = watch();

  const isVisible = (field: FieldConfig) => {
    if (!field.dependsOn) return true;
    return watchedFields[field.dependsOn.field] === field.dependsOn.value;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {fields.map((field) => {
        if (!isVisible(field)) return null;
        return (
          <div key={field.name} className="flex flex-col space-y-1">
            <Label className="pb-2">{field.label}</Label>
            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) => {
                let input: React.ReactElement;

                switch (field.type) {
                  case "text":
                  case "number":
                    input = <Input type={field.type} {...controllerField} />;
                    break;
                  case "textarea":
                    input = <Textarea {...controllerField} />;
                    break;
                  case "checkbox":
                    input = (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={controllerField.value || false}
                          onCheckedChange={controllerField.onChange}
                        />
                        <span>{field.label}</span>
                      </div>
                    );
                    break;
                  case "select":
                    input = (
                      <Select
                        value={controllerField.value}
                        onValueChange={controllerField.onChange}
                      >
                        <SelectTrigger className="w-full" dir="rtl">
                          <SelectValue placeholder="اختر..." />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                    break;
                  case "date":
                    input = (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                          >
                            {controllerField.value ? (
                              format(controllerField.value, "PPP")
                            ) : (
                              <span>اختر التاريخ</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto">
                          <Calendar
                            mode="single"
                            selected={controllerField.value}
                            onSelect={controllerField.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    );
                    break;

                  case "file":
                    input = (
                      <Input
                        type="file"
                        onChange={(e) =>
                          controllerField.onChange(e.target.files?.[0])
                        }
                      />
                    );
                    break;
                  default:
                    input = <Input {...controllerField} />;
                }

                return input;
              }}
            />
          </div>
        );
      })}
      <Button type="submit" className="col-span-full">
        إرسال
      </Button>
    </form>
  );
};
