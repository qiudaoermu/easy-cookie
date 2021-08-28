
QUnit.module("cookie");
QUnit.test("set", function (assert) {
  Cookies.set("c", "v");
  assert.strictEqual(Cookies.get("c"), "v", "should write value");
});
QUnit.test("remove", function (assert) {
  Cookies.set("c", "v");
  Cookies.remove("c");
  assert.strictEqual(document.cookie, "", "should delete the cookie");
});