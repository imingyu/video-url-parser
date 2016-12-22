# video-url-parser
解析Youtube，Youku，Tudou，iQiyi，Souhu，QQ，Sina，LeTV等视频网站的url，得到视频的id等源信息；同时可以根据得到的源信息创建不同格式的播放链接。

[![Build Status](https://travis-ci.org/imingyu/video-url-parser.svg?branch=master)](https://travis-ci.org/imingyu/video-url-parser)

目前解析服务对视频网站的支持情况：
<table style="font-family:Microsoft Yahei;">
    <thead>
        <tr>
            <th colspan="5">中国（CN）</th>
        </tr>
        <tr>
            <th>网站</th>
            <th>网址</th>
            <th>支持状态</th>
            <th>解析器</th>
            <th>更新日期</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>优酷（Youku）</td>
            <td>www.youku.com</td>
            <td>已支持</td>
            <td>
                <p>video-provider-youku.com</p>
                <a href="https://www.npmjs.com/package/video-provider-youku.com" title="NPM Version">
                    <img src="https://img.shields.io/npm/v/video-provider-youku.com.svg" alt="NPM Version">
                </a>
                <a href="https://www.npmjs.com/package/video-provider-youku.com" title="NPM Downloads">
                    <img src="https://img.shields.io/npm/dt/video-provider-youku.com.svg" alt="NPM Downloads">
                </a>
            </td>
            <td>2016/12/22</td>
        </tr>
    </tbody>
</table>