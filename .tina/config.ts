import { defineConfig } from "tinacms";
// import { slugify } from "../src/js/helpers";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

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
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: false,
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
            type: "reference",
            name: "categories",
            label: "Categories",
            collections: ["categories"],
            required: false,
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

      // Categories
      {
        label: "Categories",
        name: "categories",
        path: "src/content/categories",
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
        ],
      },
    ],
  },
});
