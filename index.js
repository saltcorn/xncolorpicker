const {
  input,
  div,
  text,
  script,
  domReady,
  style,
  text_attr,
} = require("@saltcorn/markup/tags");

const headers = [
  {
    script: "/plugins/public/xncolorpicker/xncolorpicker.min.js",
  },
];

const xnColorPicker = {
  type: "Color",
  isEdit: true,
  configFields: [
    { name: "showprecolor", label: "Show pre-color", type: "Bool" },
    { name: "showhistorycolor", label: "Show color history", type: "Bool" },
    { name: "showPalette", label: "Show palette", type: "Bool" },
    { name: "canMove", label: "Movable", type: "Bool" },
    { name: "autoConfirm", label: "Auto confirm", type: "Bool" },
    {
      name: "format",
      label: "Format",
      type: "String",
      required: true,
      attributes: { options: "rgba,hex,hsla" },
    },
  ],
  run: (nm, v, attrs, cls) => {
    const rndid = Math.floor(Math.random() * 16777215).toString(16);
    const opts = {};
    return (
      div({
        id: `colpick${text_attr(nm)}${rndid}`,
        class: "colorpick",
      }) +
      input({
        type: "hidden",
        name: text_attr(nm),
        disabled: attrs.disabled,
        id: `input${text_attr(nm)}${rndid}`,
        ...(typeof v !== "undefined" &&
          v !== null && {
            value: text_attr(v),
          }),
      }) +
      style(`.fcolorpicker-curbox {border: 1px solid #777777;}`) +
      script(
        domReady(`var xncp = new XNColorPicker({
          selector: '#colpick${text(nm)}${rndid}',
          ...${JSON.stringify(attrs || {})},
          lang: 'en',
          colorTypeOption:'single',
          ${typeof v === "undefined" ? "" : `color: "${text_attr(v)}",`}
          onChange: function(color){
            //$('#input${text_attr(nm)}${rndid}').val(color.color.hex);
          },
          onConfirm: function(color){
            $('#input${text_attr(nm)}${rndid}').val(color.color.hex);
          },
          onCancel:function(color){
            console.log("cancel",color)
          },
        });`)
      )
    );
  },
};
/*


          */
module.exports = {
  sc_plugin_api_version: 1,
  plugin_name: "xncolorpicker",
  fieldviews: { xnColorPicker },
  headers,
};
