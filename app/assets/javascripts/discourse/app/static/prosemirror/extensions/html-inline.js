const HTML_INLINE_MARKS = {
  s: "strikethrough",
  strike: "strikethrough",
  strong: "strong",
  b: "strong",
  em: "em",
  i: "em",
  code: "code",
};

const ALLOWED_INLINE = [
  "kbd",
  "sup",
  "sub",
  "small",
  "big",
  "del",
  "ins",
  "mark",
];

export default {
  nodeSpec: {
    // TODO(renato): this node is hard to get past when at the end of a block
    //   and is added to a newline unintentionally, investigate
    html_inline: {
      group: "inline",
      inline: true,
      content: "inline*",
      attrs: { tag: {} },
      parseDOM: ALLOWED_INLINE.map((tag) => ({ tag })),
      toDOM: (node) => [node.attrs.tag, 0],
    },
  },
  parse: {
    // TODO(renato): it breaks if it's missing an end tag
    html_inline: (state, token) => {
      const openMatch = token.content.match(/^<([a-z]+)>$/u);
      const closeMatch = token.content.match(/^<\/([a-z]+)>$/u);

      if (openMatch) {
        const tagName = openMatch[1];
        const markName = HTML_INLINE_MARKS[tagName];
        if (markName) {
          state.openMark(state.schema.marks[markName].create());
          return;
        }

        if (ALLOWED_INLINE.includes(tagName)) {
          state.openNode(state.schema.nodeType("html_inline"), {
            tag: tagName,
          });
        }

        return;
      }

      if (closeMatch) {
        const tagName = closeMatch[1];
        const markName = HTML_INLINE_MARKS[tagName];
        if (markName) {
          state.closeMark(state.schema.marks[markName].create());
          return;
        }

        if (ALLOWED_INLINE.includes(tagName)) {
          state.closeNode();
        }
      }
    },
  },
  serializeNode: {
    html_inline(state, node) {
      state.write(`<${node.attrs.tag}>`);
      state.renderInline(node);
      state.write(`</${node.attrs.tag}>`);
    },
  },
  inputRules: {
    match: new RegExp(`<(${ALLOWED_INLINE.join("|")})>`),
    handler: (state, match, start, end) => {
      const tag = match[1];

      // TODO not finished
      state.tr.replaceWith(
        start,
        end,
        state.schema.nodes.html_inline.create({ tag })
      );
    },
  },
};
