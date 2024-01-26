class Block {
    m_isDirty = true;
    type;
    m_number;
    m_template = Text();
    #m_text;

    //Returns if anything is contined within or if it can be deleted upon save.
    isEmpty() {
        return m_text.length == 0;
    }

    AddText(number) {
        m_text.splice(number, 0, Text()); //TODO: +1?
        m_isDirty = true;

        return m_text.length;
    }

    RemoveText(number) {
        m_text.splice(number, 1); //TODO: +1?
        m_isDirty = true;

        return m_text.length;
    }

    GetText() {
        return this.m_text;
    }

    constructor() {}
}