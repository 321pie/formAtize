import {Page} from './Page.js';

export class Document {
    #m_name;
    #m_isDirty = true;
    #m_description = "";
    #m_pages = [];
    #m_blocks = [];

    constructor(name) {
        this.#m_name = name;
        this.AddPage(1);
    }

    GetPageCount() {
        return this.#m_pages.length;
    }

    AddPage(number) {
        this.#m_isDirty = true;
        this.#m_pages.splice(number, 0, new Page()); //TODO: +1?

        return this.#m_pages.length;
    }

    RemovePage(number) {
        this.#m_isDirty = true;
        this.#m_pages.splice(number, 1); //TODO: +1?

        return this.#m_pages.length;
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

        for(const page in this.#m_pages) {
            for(const block in page.GetBlocks()) {
                text += block.GetText();
            }
        }

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