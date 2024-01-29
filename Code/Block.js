import {Text} from './Text.js';

export class Block {
    #m_isDirty = true;
    #m_type;
    #m_priority;
    #m_alignment;
    #m_text;

    constructor(type, priority, alignment, template = null) {
        this.#m_type = type;
        this.#m_priority = priority;
        this.#m_alignment = alignment;

        if(template != null) {
            for(const textObject in template) {
                this.AddText(this.#m_text.length, textObject);
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

    IsDirty() {
        return this.#m_isDirty;
    }

    AddText(number, textObject = new Text()) {
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

        for(const textObject in m_text) {
            text += textObject.GetText();
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