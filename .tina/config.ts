import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

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
        path: "content/posts",
        format: "md",
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
        path: "content/authors",
        format: "json",
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
        path: "content/categories",
        format: "json",
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
