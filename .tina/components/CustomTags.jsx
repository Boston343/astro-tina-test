import React from "react";
import {
  wrapFieldsWithMeta,
  BaseTextField,
  IconButton,
  AddIcon,
} from "tinacms";
import { TiDelete } from "react-icons/ti";

// --------------------------------------------------------
// custom tags field component
// copied most of the below from "TagsField" in @tinacms/toolkit/dist/index.es.js
const CustomTags = (props) => {
  const { input, field, form, tinaForm, format, parse } = props;

  const [value, setValue] = React.useState("");

  // I added this function so the user can pass in a "format" prop
  const handleChange = React.useCallback((event) => {
    let val = event.target.value;
    if (format) {
      val = format(val);
    }
    setValue(val);
  });

  const addTag = React.useCallback(
    (tag) => {
      var _a, _b;
      if (
        (_b =
          (_a = form.getFieldState(field.name)) == null ? void 0 : _a.value) ==
        null
          ? void 0
          : _b.includes(tag)
      ) {
        return;
      }
      if (!tag.length) {
        return;
      }
      form.mutators.insert(field.name, 0, tag);
      setValue("");
    },
    [form, field.name]
  );

  const items = input.value || [];
  return /* @__PURE__ */ React.createElement(
    React.Fragment,
    null,
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "flex items-center gap-3",
      },
      /* @__PURE__ */ React.createElement(BaseTextField, {
        value,
        onChange: (event) => handleChange(event),
        placeholder: field.placeholder ? field.placeholder : "Add a tag",
        onKeyPress: (event) => {
          if (event.key === "," || event.key === "Enter") {
            event.preventDefault();
            addTag(value);
          }
        },
        className: "flex-1",
      }),
      /* @__PURE__ */ React.createElement(
        IconButton,
        {
          onClick: () => {
            addTag(value);
          },
          variant: "primary",
          size: "small",
          className: "flex-shrink-0",
        },
        /* @__PURE__ */ React.createElement(AddIcon, {
          className: "w-5/6 h-auto",
        })
      )
    ),
    /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "flex gap-2 flex-wrap mt-2 mb-0",
      },
      items.length === 0 &&
        /* @__PURE__ */ React.createElement(
          "span",
          {
            className: "text-gray-300 text-sm italic",
          },
          "No tags"
        ),
      items.map((tag, index) =>
        /* @__PURE__ */ React.createElement(
          Tag,
          {
            key: tag,
            tinaForm,
            field,
            index,
          },
          tag
        )
      )
    )
  );
};
const Tag = ({ tinaForm, field, index, children, ...styleProps }) => {
  const removeItem = React.useCallback(() => {
    tinaForm.mutators.remove(field.name, index);
  }, [tinaForm, field, index]);
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      className:
        "rounded-full shadow bg-white border border-gray-150 flex items-center tracking-[0.01em] leading-none text-gray-700",
      ...styleProps,
    },
    /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { maxHeight: "calc(var(--tina-sidebar-width) - 50px)" },
        className: "text-sm flex-1 pl-3 pr-1 py-1 truncate",
      },
      children
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        className:
          "group text-center flex-shrink-0 border-0 bg-transparent pl-1 pr-2 py-1 text-gray-300 hover:text-blue-500 flex items-center justify-center cursor-pointer",
        onClick: removeItem,
      },
      // /* @__PURE__ */ React.createElement(BiX, {
      //   className:
      //     "w-4 h-auto transition ease-out duration-100 group-hover:scale-110 origin-center",
      // })
      // /* @__PURE__ */ React.createElement(
      //   "p",
      //   {
      //     className:
      //       "w-4 h-auto transition ease-out duration-100 group-hover:scale-110 origin-center",
      //   },
      //   "x"
      // )
      /* @__PURE__ */ React.createElement(TiDelete, {
        className:
          "w-4 h-auto transition ease-out duration-100 group-hover:scale-110 origin-center",
      })
    )
  );
};

export default CustomTags;
