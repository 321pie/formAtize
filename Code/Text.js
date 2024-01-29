export class Text {
    #m_text;
    #m_isDirty = true;
    #m_font;
    #m_fontSize;
    #m_fontColor;
    #m_isBold;
    #m_isItalicized;
    #m_isUnderlined;

    constructor() {}

    IsEmpty() {
        return this.#m_text.length == 0;
    }

    IsDirty() {
        return this.#m_isDirty;
    }

    GetText() {
        return this.#m_text;
    }

    ChangeText(text) {
        this.#m_isDirty = true;
        this.#m_text = text;
    }

    GetFont() {
        return this.#m_font;
    }

    SetFont(font) {
        this.#m_isDirty = true;
        this.#m_font = font;
    }

    GetFontSize() {
        return this.#m_fontSize;
    }

    SetFontSize(fontSize) {
        this.#m_isDirty = true;
        this.#m_fontSize = fontSize;
    }

    GetFontColor() {
        return this.#m_fontColor;
    }

    SetFont(fontColor) {
        this.#m_isDirty = true;
        this.#m_fontColor = fontColor;
    }

    GetBold() {
        return this.#m_isBold;
    }

    SetBold(isBold) {
        this.#m_isDirty = true;
        this.#m_isBold = isBold;
    }

    GetItalicized() {
        return this.#m_isItalicized;
    }

    SetItalicized(isItalicized) {
        this.#m_isDirty = true;
        this.#m_isItalicized = isItalicized;
    }

    GetUnderlined() {
        return this.#m_isUnderlined;
    }

    SetUnderlined(isUnderlined) {
        this.#m_isDirty = true;
        this.#m_isUnderlined = isUnderlined;
    }
}