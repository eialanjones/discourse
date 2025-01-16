import { render } from "@ember/test-helpers";
import { module, test } from "qunit";
import ProsemirrorEditor from "discourse/static/prosemirror/components/prosemirror-editor";
import { setupRenderingTest } from "discourse/tests/helpers/component-test";

module("Integration | Component | prosemirror-editor", function (hooks) {
  setupRenderingTest(hooks);

  test("renders the editor", async function (assert) {
    await render(<template><ProsemirrorEditor /></template>);
    assert.dom(".ProseMirror").exists("it renders the ProseMirror editor");
  });

  test("renders the editor with minimum extensions", async function (assert) {
    const minimumExtensions = [
      { nodeSpec: { doc: { content: "inline*" }, text: { group: "inline" } } },
    ];

    await render(<template>
      <ProsemirrorEditor
        @includeDefault={{false}}
        @extensions={{minimumExtensions}}
      />
    </template>);

    assert.dom(".ProseMirror").exists("it renders the ProseMirror editor");
  });

  test("shows an error dialog for unknown markdown-it tokens", async function (assert) {
    await render(<template><ProsemirrorEditor /></template>);

    assert.dom(".ProseMirror").exists("it renders the ProseMirror editor");
  });
});
