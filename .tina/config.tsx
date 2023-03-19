import { defineConfig, wrapFieldsWithMeta } from "tinacms";
import React from "react";
import InputTextWithWarning from "./components/InputTextWithWarning";
import CustomTags from "./components/CustomTags";
// import { slugify } from "../src/js/helpers";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

// --------------------------------------------------------
// custom slugify function
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// --------------------------------------------------------
export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "", // Get this from tina.io
  token: process.env.TINA_READ_TOKEN || "", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "posts",
        label: "Posts",
        path: "src/content/posts",
        format: "md",
        ui: {
          filename: {
            // if readonly is true, the editor can NOT edit the filename
            readonly: true,
            // values is an object containing all values of the form
            slugify: (values) => {
              if (values.title) {
                return slugify(values.title);
              } else {
                return "";
              }
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            ui: {
              component: wrapFieldsWithMeta(({ field, input, meta }) => {
                // https://final-form.org/docs/react-final-form/types/FieldRenderProps
                return (
                  <>
                    <InputTextWithWarning
                      input={input}
                      maxLen={60}
                      inputClass="shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md"
                      warningClass="block font-sans text-xs font-normal text-red-500 pt-3 animate-slide-in whitespace-normal m-0  undefined"
                    />
                  </>
                );
              }),
            },
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: false,
            ui: {
              component: wrapFieldsWithMeta(({ field, input, meta }) => {
                // https://final-form.org/docs/react-final-form/types/FieldRenderProps
                return (
                  <>
                    <InputTextWithWarning
                      input={input}
                      maxLen={160}
                      inputClass="shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md"
                      warningClass="block font-sans text-xs font-normal text-red-500 pt-3 animate-slide-in whitespace-normal m-0  undefined"
                    />
                  </>
                );
              }),
            },
          },
          {
            type: "reference",
            name: "authors",
            label: "Authors",
            collections: ["authors"],
            required: true,
          },
          {
            type: "image",
            name: "mainImage",
            label: "Main Image",
            required: false,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            description: "Tags for your post",
            ui: {
              component: wrapFieldsWithMeta(
                ({ input, field, form, tinaForm }) => {
                  return (
                    <>
                      <CustomTags
                        input={input}
                        field={field}
                        form={form}
                        tinaForm={tinaForm}
                        format={(val?: string) =>
                          val ? val.toLowerCase() : ""
                        }
                      />
                    </>
                  );
                }
              ),
              placeholder: "Add a tag",
            },
          },
          {
            type: "datetime",
            name: "datetime",
            label: "Date published",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },

      // Authors
      {
        label: "Authors",
        name: "authors",
        path: "src/content/authors",
        format: "json",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // values is an object containing all values of the form
            slugify: (values) => {
              if (values.name) {
                return slugify(values.name);
              } else {
                return "";
              }
            },
          },
        },
        fields: [
          {
            label: "Name",
            name: "name",
            type: "string",
            required: true,
          },
          {
            label: "Avatar",
            name: "avatar",
            type: "image",
          },
        ],
      },
    ],
  },
});
