import { useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form";

// interface ImagePath {
//   image_path?: string;
// }

interface UploadBtnProps<T extends FieldValues> {
  className?: string;
  title?: string;
  form: UseFormReturn<T>;
  name: Path<T>;
  disabled?: boolean;
}

export const UploadBtn = <T extends FieldValues>({
  className,
  title,
  form,
  name,
  disabled,
}: UploadBtnProps<T>) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        form.setValue(name, result as PathValue<T, Path<T>>);
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        id="upload"
        onChange={handleFileChange}
        hidden
        disabled={disabled}
      />
      <label
        htmlFor="upload"
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-btn2 text-text hover:bg-btn2/85 h-10 px-4 py-2",
          className
        )}
      >
        {title} <Upload />
      </label>
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="h-10 w-10 rounded-md object-cover"
          />
          <button
            type="button"
            className="absolute -top-2.5 -right-2 bg-tst-error-foreground text-white rounded-full p-1 opacity-70 hover:opacity-100"
            onClick={handleRemoveImage}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
