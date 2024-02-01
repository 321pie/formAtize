class Words {
    #m_text;
    #m_isDirty = true;
    #m_font;
    #m_fontSize;
    #m_fontColor;
    #m_isBold;
    #m_isItalicized;
    #m_isUnderlined;

    constructor(text='') {
        this.#m_text = text;
    }

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

class Block {
    #m_isDirty = true;
    #m_type;
    #m_priority;
    #m_alignment;
    #m_text = [];

    constructor(template=null, type='defualt', priority=3, alignment='left') {
        this.#m_type = type;
        this.#m_priority = priority;
        this.#m_alignment = alignment;

        if(template != null) {
            for(let textIndex = 0; textIndex < template.length; textIndex++) {
                this.AddText(this.#m_text.length, template[textIndex]);
            }
        }
    }

    //Returns if anything is contined within or if it can be deleted upon save.
    IsEmpty() {
        isEmpty = true;

        for(const textObject in this.#m_text) {
            if(textObject.IsEmpty() == false) {
                isEmpty = false;
            }
        }
        
        return isEmpty;
    }

    AddText(number, textObject = new Words()) {
        this.#m_isDirty = true;
        this.#m_text.splice(number, 0, textObject); //TODO: +1?

        return this.#m_text.length;
    }

    RemoveText(number) {
        this.#m_isDirty = true;
        this.#m_text.splice(number, 1); //TODO: +1?

        return this.#m_text.length;
    }

    GetText() {
        let text = '';

        for(let textIndex = 0; textIndex < this.#m_text.length; textIndex++) {
            text += this.#m_text[textIndex].GetText();
        }

        return text;
    }

    //Removes all empty text objects from the block and returns the number of deleted text objects.
    Clean() {
        this.#m_isDirty = true; //Could check if count > 0, but if run concurrently, then there're problems

        let count = this.#m_text.length;
        this.#m_text = this.#m_text.filter(textObject => textObject.isEmpty() == true);
        count -= this.#m_text.length;

        return count;
    }

    WordCount() {
        let count = 0;

        for(const textObject in this.m_text) {
            count += textObject.GetText().split(" ").length;
        }

        return count;
    }

    GetType() {
        return this.#m_type;
    }

    GetPriority() {
        return this.#m_priority;
    }

    SetPriority(priority) {
        this.#m_isDirty = true;
        this.#m_priority = priority;
    }

    GetAlignment() {
        return this.#m_alignment;
    }

    SetAlignment(alignment) {
        this.#m_isDirty = true;
        this.#m_alignment = alignment;
    }
}

class Page {
    #m_blocks = [];
    #m_isDirty = true;
    #m_header;
    #m_footer;

    constructor() {}

    GetBlockCount() {
        return this.#m_blocks.length;
    }

    //Adds a Block to the page
    AddBlock(number, block = new Block()) {
        this.#m_isDirty = true;
        this.#m_blocks.splice(number, 0, block); //TODO: +1?

        return block;
    }

    //Removes a Block from the page
    RemoveBlock(number) {
        this.#m_isDirty = true;
        this.#m_blocks.splice(number, 1); //TODO: +1?

        return this.#m_blocks.length;
    }

    //Removes all empty blocks from the page and returns the number of deleted blocks.
    Clean() {
        this.#m_isDirty = true; //Could check if count > 0, but if run concurrently, then there're problems

        let count = this.#m_blocks.length;
        this.#m_blocks = this.#m_blocks.filter(block => block.isEmpty() == true);
        count -= this.#m_blocks.length;

        return count;
    }

    //Returns if anything is contined within or if it can be deleted upon save.
    IsEmpty() {
        isEmpty = true;

        for(const block in this.#m_blocks) {
            if(block.IsEmpty() == false) {
                isEmpty = false;
            }
        }
        
        return isEmpty;
    }

    IsDirty() {
        return this.#m_isDirty
    }

    GetBlocks() {
        return this.#m_blocks;
    }

    GetHeader() {
        return this.#m_header;
    }

    SetHeader(header) {
        this.#m_isDirty = true;
        this.#m_header = header;
    }

    GetFooter() {
        return this.#m_footer;
    }

    SetFooter(footer) {
        this.#m_isDirty = true;
        this.#m_footer = footer;
    }
}

class Doc {
    #m_name;
    #m_isDirty = true;
    #m_description = "";
    #m_pages = [];
    #m_blocks = [];

    constructor(name) {
        this.#m_name = name;
    }

    GetPageCount() {
        return this.#m_pages.length;
    }

    AddPage(number, page = new Page()) {
        this.#m_isDirty = true;
        this.#m_pages.push(page); //TODO: +1?

        return page;
    }

    RemovePage(number) {
        this.#m_isDirty = true;
        this.#m_pages.splice(number, 1); //TODO: +1?

        return this.#m_pages.length;
    }

    GetPages() {
        return this.#m_pages;
    }

    //TODO: Call clean and then have IsEmpty() { return this.m_pages.length == 0 }
    IsEmpty() {
        isEmpty = true;

        for(const page in this.#m_pages) {
            if(page.IsEmpty() == false) {
                isEmpty = false;
            }
        }

        return isEmpty;
    }

    IsDirty() {
        return this.#m_isDirty;
    }

    GetText() {
        let text = "";
        console.log(this.#m_pages[0]);
        //console.log(this.#m_pages.length);
        for (let i = 0; i < this.#m_pages.length; i++){
            blocks = this.#m_pages[i].GetBlocks();
            for (let j = 0; j < blocks.length; j++){
                text += blocks[j].GetText();
            }
        }
        // for(const page in this.#m_pages) {
        //     blocks = page.GetBlocks();
        //     for(const block in blocks) {
        //         text += block.GetText();
        //     }
        // }

        return text;
    }

    Clean() {
        this.#m_isDirty = true; //Could check if count > 0, but if run concurrently, then there're problems

        let count = this.#m_pages.length;
        this.#m_pages = this.#m_pages.filter(page => page.isEmpty() == true);
        count -= this.#m_pages.length;

        return count;
    }

    //Max of 5 priority levels
    AllBlocks(types=null) {
        let hierarchy = [];
        let blocks = [];

        //Get all blocks
        for(const page in this.#m_pages) {
            for(const block in page.GetBlocks()) {
                blocks.Append(block);
            }
        }

        //If there are blocks, add tiers to hierarchy in form [priority, [blocks]] (can go from 1 to 2 to 1 again, i.e. headers and paragraphs)
        if(blocks.length != 0) {
            //TODO: delete this comment -> blocks.sort((a, b) => a.priority - b.priority);
            let prevPrio = blocks[0].GetPriority();
            let layerArray = []
            for(const block in blocks) {
                if(block.m_priority != prevPrio) {
                    hierarchy.Append([prevPrio, layerArray]);
                    layerArray = [];
                    prevPrio = block.GetPriority();
                }

                layerArray.Append(block);
            }
        }

        return hierarchy;
    }

    WordCount(limitedMode, types = null) {
        let count = 0;

        if(limitedMode == false) {
            //Add types checking

            for(const page in this.#m_pages) {
                for(const block in page.GetBlocks()) {
                    count += block.WordCount(false);
                }
            }
        }
        else {
            //Add in later
            return -1;
        }

        return count;
    }

    GetBlocks() {
        return this.#m_blocks;
    }

    AddBlocks(block) {
        this.#m_isDirty = true;
        this.#m_blocks.Append(block);
    }

    GetName() {
        return this.#m_name;
    }

    SetName(name) {
        this.#m_isDirty = true;
        this.#m_name = name;
    }

    GetDescription() {
        return this.#m_description;
    }

    SetDescription(description) {
        this.#m_isDirty = true;
        this.#m_description = description;
    }
}