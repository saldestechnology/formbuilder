import { useEffect, useState } from "react";
import { createNumberValidator } from "./Validation";

export default function useValidation(
  validations: Validation[],
  input: string | number
) {
  console.log({ validations, input });
  const [result, setResult] = useState<Validation[]>(validations);
  useEffect(() => {
    validations.forEach((validation) => {
      switch (validation.schema.type) {
        case "string":
          if (
            typeof input === "string" &&
            validation.schema.type === "string"
          ) {
            let valid = false;
            if (input[validation.schema.condition](validation.schema.value)) {
              valid = true;
            }
            setResult((prev) =>
              prev.map((v) => {
                if (
                  v.schema.type === "string" &&
                  validation.schema.type === "string"
                ) {
                  if (v.schema.condition === validation.schema.condition) {
                    return {
                      ...v,
                      valid,
                    };
                  }
                }
                return v;
              })
            );
          }
        case "number":
          if (
            typeof input === "number" &&
            validation.schema.type === "number"
          ) {
            const { operator, value } = validation.schema;
            setResult((prev) => [
              ...prev,
              {
                ...validation,
                valid: createNumberValidator(operator, input)(value),
              },
            ]);
          }
      }
    });
  }, [input, validations]);
  console.log({ result });
  return result;
}
