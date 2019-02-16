class StringUtil {
    /**
     * 去掉头尾空白字符
     * @param str 
     */
    public static trim(str: string): string {
        if (str == null) return '';

        var startIndex: number = 0;
        while (this.isWhitespace(str.charAt(startIndex)))
            ++startIndex;

        var endIndex: number = str.length - 1;
        while (this.isWhitespace(str.charAt(endIndex)))
            --endIndex;

        if (endIndex >= startIndex)
            return str.slice(startIndex, endIndex + 1);
        else
            return "";
    }

    /**
     * 去头空格
     * @param char 
     */
    public static ltrim(char: string): string {
        if (!char) return char;

        return char.replace(/^\s*/, "");
    }

    /**
     * 去尾空格
     * @param char 
     */
    public static rtrim(char: string): string {
        if (!char) return char;

        return char.replace(/\s*$/, "");
    }

    /**
     * 是否空白字符
     * @param character 
     */
    public static isWhitespace(character: string): Boolean {
        switch (character) {
            case " ":
            case "\t":
            case "\r":
            case "\n":
            case "\f":
                return true;

            default:
                return false;
        }
    }

    /**
     * 字符串替换占位符
     * @param str 
     * @param args 
     */
    public static substitute(str: string, ...args): string {
        if (!str) return str;

        let len = args.length;
        for (let i = 0; i < len; i++) {
            str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
        }
        return str;
    }

    /**
     * 设置带颜色文本
     */
    public static setColorString(str: string, color: any) {
        if (!isNaN(color)) {
            color = egret.toColorString(color);
        }
        return this.substitute("<color='{0}'>{1}</color>", color, str);
    }

    /**
     * 中文
     * @param char 
     */
    public static isChinese(char: string): Boolean {
        if (!char) return false;

        char = this.trim(char);
        var pattern: RegExp = /^[\u0391-\uFFE5]+$/;
        return (pattern.exec(char) != null);
    }

    /**
     * 含有中文字符
     * @param char 
     */
    public static hasChineseChar(char: string): Boolean {
        if (!char) return false;

        char = this.trim(char);
        var pattern: RegExp = /[^\x00-\xff]/;
        return (pattern.exec(char) != null);
    }

    /**
     * URL地址
     * @param char 
     */
    public static isURL(char: string): Boolean {
        if (!char) return false;

        char = this.trim(char).toLowerCase();
        var pattern: RegExp = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        return (pattern.exec(char) != null);
    }

    /**
     * utf16转utf8编码
     * @param char 
     */
    public static utf16to8(char: string): string {
        var out: any[] = [];
        var len: number = char.length;
        for (var i: number = 0; i < len; i++) {
            var c: number = char.charCodeAt(i);
            if (c >= 0x0001 && c <= 0x007F) {
                out[i] = char.charAt(i);
            } else if (c > 0x07FF) {
                out[i] = String.fromCharCode(0xE0 | ((c >> 12) & 0x0F),
                    0x80 | ((c >> 6) & 0x3F),
                    0x80 | ((c >> 0) & 0x3F));
            } else {
                out[i] = String.fromCharCode(0xC0 | ((c >> 6) & 0x1F),
                    0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out.join('');
    }

    /**
     * utf8转utf16编码
     * @param char 
     */
    public static utf8to16(char: string): string {
        var out: any[] = [];
        var len: number = char.length;
        var i: number = 0;
        while (i < len) {
            var c: number = char.charCodeAt(i++);
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out[out.length] = char.charAt(i - 1);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    var char2: number = char.charCodeAt(i++);
                    out[out.length] = String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    var char2: number = char.charCodeAt(i++);
                    var char3: number = char.charCodeAt(i++);
                    out[out.length] = String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out.join('');
    }
}