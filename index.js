(function(factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    } else if (typeof window === "object") {
        factory(window);
    } else {
        throw new Error("未知宿主环境，无法运行！");
    }
})(function(root) {
    var providerName = "YoukuVideoProvider";

    function createProvider(util, videoParser) {
        return {
            toJSON: function() {
                return {
                    host: this.host,
                    home: this.home,
                    params: this.params,
                    defaultFormat: this.defaultFormat,
                    formats: util.keys(this.formats)
                };
            },
            rexId: "[A-Za-z0-9]{15}[=]{2}",
            name: providerName,
            home: "http://www.youku.com/",
            host: "youku.com",
            params: {},
            defaultFormat: "iframe",
            formats: {
                html: function(info) {
                    return "http://v.youku.com/v_show/id_" + info.id + ".html";
                },
                swf: function(info) {
                    return "http://player.youku.com/player.php/sid/" + info.id + "/v.swf";
                },
                iframe: function(info) {
                    return "http://player.youku.com/embed/" + info.id;
                },
                embed: function(info) {
                    return "http://player.youku.com/player.php/sid/" + info.id + "/v.swf";
                }
            },
            hostMatch: function(source) {
                if (/player.youku.com\/embed\//.test(source) ||
                    /v.youku.com\/v_show\/id_/gi.test(source) ||
                    /player.youku.com\/player.php\/sid\//gi.test(source) ||
                    /player.youku.com\/player.php\/([a-zA-Z\/]{0,}?)sid\//gi.test(source)
                ) {
                    return this.host;
                }
            },
            parser: function(source) {
                source = source + "";
                var rexId = this.rexId,
                    regId = new RegExp(rexId, "gi"),
                    regs = [
                        new RegExp("v.youku.com/v_show/id_" + rexId + ".html", "gi"),
                        new RegExp("player\.youku\.com/player\.php/([a-zA-Z/]{0,}?)sid/" + rexId + "/", "gi"),
                        new RegExp("player.youku.com/embed/" + rexId, "gi"),
                    ],
                    ids = {},
                    match = [],
                    i, len = regs.length,
                    info,
                    self = this,
                    provider,
                    result = [];
                util.each(regs, function(item) {
                    match = match.concat.apply(match, source.match(item));
                });
                if (match && match.length > 0) {
                    provider = self.toJSON ? self.toJSON() : JSON.parse(JSON.stringify(self));
                    util.each(match, function(item) {
                        info = item.match(regId);
                        if (!ids[info[0]]) {
                            result.push({
                                provider: provider,
                                id: info[0]
                            });
                            ids[info[0]] = true;
                        }
                    });
                    if (result.length > 0) return result;
                }
            },
            create: function(videoInfo) {
                if (videoInfo && videoInfo.provider.host === this.host) {
                    var formater = this.formats[videoInfo.format || this.defaultFormat];
                    if (formater) {
                        var url = formater.call(this, videoInfo),
                            ps = this.linkParams(this.concatParams(videoInfo.params));
                        if (ps && url) {
                            url += "?" + ps;
                        }
                        return url;
                    }
                }
            },
            concatParams: function(params) {
                return util.extend(true, {}, this.params, params);
            },
            linkParams: function(params) {
                var str = [];
                util.each(params, function(value, key) {
                    str.push(key + "=" + value);
                });
                return str.join("&");
            }
        };
    };
    if (root) {
        root[providerName] = createProvider;
    }
    return createProvider;
});