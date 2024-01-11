const sanitizeHtml = require('sanitize-html')
function html(strings, ...values) {

    const escaped = values.map(v => {
        if (v instanceof Array) {
            return v.map(i => {
                if (i instanceof HTML) {
                    return i.text;
                } else {

                    return sanitizeHtml(i, {
                        allowedTags: [],
                        allowedAttributes: {},
                        disallowedTagsMode: 'recursiveEscape'
                    });
                }

            }).join('')
        } if (v instanceof HTML) {
            return v.text
        } else {
            return sanitizeHtml(v, {
                allowedTags: [],
                allowedAttributes: {},
                disallowedTagsMode: 'recursiveEscape'
            });
        }
    })
    return new HTML(String.raw({ raw: strings }, ...escaped))
}

function HTML(text) {
    this.text = text
}

HTML.prototype.toString = function htmlToString() {
    return this.text
}

module.exports = html;
