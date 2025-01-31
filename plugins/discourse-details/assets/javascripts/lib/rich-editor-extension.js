export default {
  nodeSpec: {
    details: {
      attrs: { open: { default: true } },
      content: "summary block+",
      group: "block",
      defining: true,
      parseDOM: [{ tag: "details" }],
      toDOM: (node) => ["details", { open: node.attrs.open || undefined }, 0],
    },
    summary: {
      content: "inline*",
      parseDOM: [{ tag: "summary" }],
      toDOM: () => ["summary", 0],
    },
  },
  parse: {
    bbcode(state, token) {
      if (token.tag === "details") {
        state.openNode(state.schema.nodes.details, {
          open: token.attrGet("open") !== null,
        });
        return true;
      }

      if (token.tag === "summary") {
        state.openNode(state.schema.nodes.summary);
        return true;
      }
    },
  },
  serializeNode: {
    details(state, node) {
      state.renderContent(node);
      state.write("[/details]\n\n");
    },
    summary(state, node, parent) {
      state.write('[details="');
      node.content.forEach(
        (child) =>
          child.text &&
          state.text(child.text.replace(/"/g, "“"), state.inAutolink)
      );
      state.write(`"${parent.attrs.open ? " open" : ""}]\n`);
    },
  },
  plugins: {
    props: {
      handleClickOn(view, pos, node, nodePos) {
        if (node.type.name === "summary") {
          const details = view.state.doc.nodeAt(nodePos - 1);
          view.dispatch(
            view.state.tr.setNodeMarkup(nodePos - 1, null, {
              open: !details.attrs.open,
            })
          );
          return true;
        }
      },
    },
  },
};
