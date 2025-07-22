import { ZodError, ZodIssueCode, ZodIssue } from "zod";
import { HttpResponce } from "../constants/response-message.constant";

interface FormattedError {
  [key: string]: string;
}

const FormatZodErrors = (error: ZodError): FormattedError => {
  const formattedErrors: FormattedError = {};

  error.issues.forEach((err: ZodIssue) => {
    const field = err.path[0] as string;
    const message = err.message;

    if (err.code === ZodIssueCode.unrecognized_keys && "keys" in err) {
      err.keys.forEach((key: string) => {
        formattedErrors[key] = HttpResponce.UNEXPECTED_KEY_FOUND;
      });
    } else {
      formattedErrors[field] = message;
    }
  });

  return formattedErrors;
};

export default FormatZodErrors;
