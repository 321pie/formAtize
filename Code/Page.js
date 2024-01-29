import {Block} from './Block.js';

export class Page {
    #m_blocks = [];
    #m_isDirty = true;
    #m_header;
    #m_footer;

    constructor() {}

    //Adds a Block to the page
    AddBlock(number) {
        this.#m_isDirty = true;
        this.#m_blocks.splice(number, 0, new Block()); //TODO: +1?

        return this.#m_blocks.length;
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