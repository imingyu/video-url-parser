var chai = require("chai"),
    assert = chai.assert;

describe("video-provider-youku.com", function() {
    it('不传递参数', function() {
        var f1 = html.find("#f1"),
            value = f1.formValue();
        assert.isObject(value);
    });
});