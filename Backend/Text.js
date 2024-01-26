class Text {
    m_text = "";
    m_isDirty = true;
    m_index;
    m_font;
    m_fontSize;
    m_fontColor;
    m_isBold;
    m_isItalicized;
    m_isUnderlined;

    isEmpty()
    {
        return m_text.length == 0;
    }

    constructor() {}
}