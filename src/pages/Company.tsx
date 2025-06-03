import { GenericForm, type FieldConfig } from "@/components/common/GenericForm";
import { toFormData } from "@/utils/formData";

const fields: FieldConfig[] = [
  { name: "company_name", label: "اسم الشركة", type: "text" },
  { name: "company_location", label: "موقع الشركة", type: "text" },
  { name: "engineer_name", label: "اسم المهندس", type: "text" },
  { name: "engineer_phone", label: "رقم المهندس", type: "text" },
  {
    name: "company_category",
    label: "تخصص الشركة",
    type: "select",
    options: [
      {
        label: "Test",
        value: "test",
      },
    ],
  },
  { name: "allowed_limit", label: "الجد المسموح", type: "number" },
  { name: "specialization", label: "التخصص", type: "number" },
  { name: "company_file", label: "ملف الشركة", type: "file" },
];
export default function Company() {
  const handleSubmit = (data: any) => {
    const formData = toFormData(data);
    // Print all key-value pairs in FormData
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  };
  return (
    <>
      <GenericForm fields={fields} onSubmit={handleSubmit} />
    </>
  );
}
