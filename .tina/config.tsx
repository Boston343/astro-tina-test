import { defineConfig, wrapFieldsWithMeta } from "tinacms";
import React from "react";
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
// custom length warning react component
// const WarningLength = (props) => {
//   const { value, maxLen } = props;
//   const strLen = value?.length || 0;
//   if (strLen > maxLen) {
//     return <p>This field is too long</p>;
//   } else {
//     return null;
//   }
// };

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
            // if disabled, the editor can not edit the filename
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
              // component: wrapFieldsWithMeta(({field, input, meta}) => {
              //   return (
              //     <>
              //       <WarningLength value={input.value} maxLen={60} />
              //     </>
              //   );
              // })

              // component: (value) => {
              //   <WarningLength value={value} maxLen={60} />;
              // },

              validate: (value) => {
                const titleLength = value?.length || 0;
                if (titleLength > 60) {
                  return "The title must be shorter than 60 characters";
                }
              },
            },
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: false,
            ui: {
              validate: (value) => {
                const descriptionLength = value?.length || 0;
                if (descriptionLength > 160) {
                  return "The description must be shorter than 160 characters";
                }
              },
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
          // {
          //   type: "object",
          //   list: true,
          //   name: "categoryList",
          //   label: "Category List",
          //   ui: {
          //     itemProps: (item) => {
          //       // field values are accessed by title?.<Field name>
          //       // in this case. I need the 'name' field on categories collection
          //       if (item.categories) {
          //         return { label: item.categories.name };
          //       } else {
          //         return { label: "something else" };
          //       }
          //     },
          //   },
          //   fields: [
          //     {
          //       type: "reference",
          //       label: "Categories",
          //       name: "categories",
          //       collections: ["categories"],
          //     },
          //   ],
          // },
          {
            label: "Tags",
            name: "tags",
            type: "string",
            description: "Tags for your post",
            ui: {
              // tags should be lower case only, but this doesn't seem to work
              // format: (val?: string) => (val ? val.toLowerCase() : ""),
              component: "tags",
            },
          },
          // {
          //   type: "reference",
          //   name: "categories",
          //   label: "Categories",
          //   collections: ["categories"],
          //   required: false,
          // },
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

      // Categories
      // {
      //   label: "Categories",
      //   name: "categories",
      //   path: "src/content/categories",
      //   format: "json",
      //   ui: {
      //     filename: {
      //       // if disabled, the editor can not edit the filename
      //       readonly: true,
      //       // values is an object containing all values of the form
      //       slugify: (values) => {
      //         if (values.name) {
      //           return slugify(values.name);
      //         } else {
      //           return "";
      //         }
      //       },
      //     },
      //   },
      //   fields: [
      //     {
      //       label: "Name",
      //       name: "name",
      //       type: "string",
      //       required: true,
      //       ui: {
      //         // categories should be lower case only
      //         format: (val?: string) => (val ? val.toLowerCase() : ""),
      //       },
      //     },
      //   ],
      // },
    ],
  },
});
