/** @type {RichEditorExtension} */
const extension = {
  // TODO(renato): the rendered date needs to be localized to better match the cooked content
  nodeSpec: {
    local_date: {
      attrs: { date: {}, time: {}, timezone: { default: null } },
      content: "text*",
      group: "inline",
      atom: true,
      inline: true,
      parseDOM: [
        {
          tag: "span.discourse-local-date[data-date]",
          getAttrs: (dom) => {
            return {
              date: dom.getAttribute("data-date"),
              time: dom.getAttribute("data-time"),
              timezone: dom.getAttribute("data-timezone"),
            };
          },
        },
      ],
      toDOM: (node) => {
        const optionalTime = node.attrs.time ? ` ${node.attrs.time}` : "";
        return [
          "span",
          {
            class: "discourse-local-date cooked-date",
            "data-date": node.attrs.date,
            "data-time": node.attrs.time,
            "data-timezone": node.attrs.timezone,
          },
          `${node.attrs.date}${optionalTime}`,
        ];
      },
    },
    local_date_range: {
      attrs: { from: {}, to: { default: null }, timezone: { default: null } },
      content: "text*",
      group: "inline",
      atom: true,
      inline: true,
      parseDOM: [
        {
          tag: "span.discourse-local-date[data-from]",
          getAttrs: (dom) => {
            return {
              from: dom.getAttribute("data-from"),
              to: dom.getAttribute("data-to"),
              timezone: dom.getAttribute("data-timezone"),
            };
          },
        },
      ],
      toDOM: (node) => {
        return [
          "span",
          { class: "discourse-local-date-wrapper" },
          [
            "span",
            {
              class: "discourse-local-date cooked-date",
              "data-range": "from",
              "data-date": node.attrs.from,
              "data-timezone": node.attrs.timezone,
            },
            `${node.attrs.from}`,
          ],
          " → ",
          [
            "span",
            {
              class: "discourse-local-date cooked-date",
              "data-range": "to",
              "data-date": node.attrs.to,
              "data-timezone": node.attrs.timezone,
            },
            `${node.attrs.to}`,
          ],
        ];
      },
    },
  },
  parse: {
    span_open(state, token) {
      if (token.attrGet("class") !== "discourse-local-date") {
        return;
      }

      if (token.attrGet("data-range") === "from") {
        state.openNode(state.schema.nodes.local_date_range, {
          from: token.attrGet("data-date"),
          to: token.attrGet("data-date"),
          timezone: token.attrGet("data-timezone"),
        });
        state.__localDateRange = true;
        return true;
      }

      if (token.attrGet("data-range") === "to") {
        // In our markdown-it tokens, a range is a series of span_open/span_close/span_open/span_close
        // We skip opening a node for `to` and set it on the top node
        state.top().attrs.to = token.attrGet("data-date");
        delete state.__localDateRange;
        return true;
      }

      state.openNode(state.schema.nodes.local_date, {
        date: token.attrGet("data-date"),
        time: token.attrGet("data-time"),
        timezone: token.attrGet("data-timezone"),
      });
      return true;
    },
    span_close(state) {
      if (["local_date", "local_date_range"].includes(state.top().type.name)) {
        if (!state.__localDateRange) {
          state.closeNode();
        }
        return true;
      }
    },
  },
  serializeNode: {
    local_date(state, node) {
      // TODO isBoundary
      // if (!isBoundary(state.out, state.out.length - 1)) {
      //   state.write(" ");
      // }

      const optionalTime = node.attrs.time ? ` time=${node.attrs.time}` : "";
      const optionalTimezone = node.attrs.timezone
        ? ` timezone="${node.attrs.timezone}"`
        : "";

      state.write(
        `[date=${node.attrs.date}${optionalTime}${optionalTimezone}]`
      );

      // TODO isBoundary
      // const nextSibling =
      //   parent.childCount > index + 1 ? parent.child(index + 1) : null;
      // if (nextSibling?.isText && !isBoundary(nextSibling.text, 0)) {
      //   state.write(" ");
      // }
    },
    local_date_range(state, node) {
      const optionalTimezone = node.attrs.timezone
        ? ` timezone="${node.attrs.timezone}"`
        : "";
      state.write(
        `[date-range from=${node.attrs.from} to=${node.attrs.to}${optionalTimezone}]`
      );

      // TODO isBoundary
      // const nextSibling =
      //   parent.childCount > index + 1 ? parent.child(index + 1) : null;
      // if (nextSibling?.isText && !isBoundary(nextSibling.text, 0)) {
      //   state.write(" ");
      // }
    },
  },
};

export default extension;
