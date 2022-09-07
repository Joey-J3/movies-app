import { useFormik } from "formik";
import * as yup from "yup";
import type { MovieFormInterface } from './MovieForm'

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  release_date: yup
    .date()
    .max(new Date(), "Please select a valid release date")
    .required("Please select a release date!"),
  poster_path: yup
    .string()
    .url("Please input valid url")
    .required("Please input preview image uri"),
  vote_average: yup
    .number()
    .nullable(true)
    .positive("Please input a positive number")
    .max(10, "Cannot bigger than 10"),
  genres: yup.array().min(1, "Please select at least one genre type"),
  runtime: yup
    .number()
    .nullable(true)
    .integer("Please input a integer number")
    .positive("Please input a positive number"),
  overview: yup
    .string()
    .max(500, "Cannot type more than 500 character")
    .required("Please type overview"),
});

export function useMovieFormik({ formData, submitCallback, resetCallback }: MovieFormInterface) {
  return useFormik({
    initialValues: formData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      submitCallback(values);
    },
    onReset: () => {
      resetCallback();
    },
  });
}