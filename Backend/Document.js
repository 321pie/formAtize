class Document {
    m_name;
    m_isDirty = true;
    m_description = "";
    m_pages = [];
    m_blocks = [];

    constructor(name) {
        this.m_name = name;
        this.m_pages.AddPage();
    }

    GetPageCount() {
        return m_pages.length;
    }

    AddPage(number) {
        //Make new page with next available number
        let page = Page(m_pages.length + 1);

        this.m_pages.Append(page);
        this.m_isDirty = true;

        return m_pages.length;
    }

    AddDescription(description) {
        this.m_description = description;
        this.m_isDirty = true;
    }

    isEmpty() {
        return this.m_pages.length == 0;
    }

    RemovePage(number) {
        return true;
    }

    GetText() {
        return "";
    }

    Clean() {
        count = m_pages.RemoveAll(page => page.isEmpty() == true);

        if(count > 0)
        {
            m_isDirty = true;
        }

        return count;
    }

    WordCount(limitedMode, List<string> types = null)
    {
        return 0;
    }
}