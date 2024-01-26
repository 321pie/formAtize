class Page {
    m_blocks = [Block()];
    m_number;
    m_isDirty = true;
    m_header;
    m_footer;

    constructor(number) {
        this.m_number = number;
    }

    //Adds a Block to the page
    AddBlock(number)
    {
        m_blocks.splice(number, 0, Block()); //TODO: +1?
        m_isDirty = true;

        return m_blocks.length;
    }

    //Removes a Block from the page
    RemoveBlock(number)
    {
        m_blocks.splice(number, 1); //TODO: +1?
        m_isDirty = true;

        return m_blocks.length;
    }

    //Removes all empty blocks from the page.
    Clear()
    {
        if (m_blocks.RemoveAll(block => block.isEmpty() == true) > 0)
            m_isDirty = true;
    }

    //Returns if anything is contined within or if it can be deleted upon save.
    isEmpty()
    {
        return m_blocks.length == 0;
    }
}